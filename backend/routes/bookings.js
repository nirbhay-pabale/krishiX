const express = require('express');
const router  = express.Router();
const Booking = require('../models/Booking');
const Worker  = require('../models/Worker');

/* ── GET /api/bookings ─────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const { status, type, farmerMobile } = req.query;
    let query = {};
    if (status) query.status = status;
    if (type)   query.type = type;
    if (farmerMobile) query.farmerMobile = farmerMobile;

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── POST /api/bookings ────────────────────────────────────
   Create a new booking (individual worker, squad, or machine) */
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Mark worker as booked if individual booking
    if (booking.workerId && booking.type === 'Individual') {
      await Worker.findOneAndUpdate(
        { id: booking.workerId },
        { available: false }
      );
    }

    res.status(201).json({
      success: true,
      message: '🎉 Booking confirmed! Escrow protection active.',
      bookingId: booking.bookingId,
      booking
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ── GET /api/bookings/:bookingId ──────────────────────── */
router.get('/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── PATCH /api/bookings/:bookingId/status ─────────────── */
router.patch('/:bookingId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    // If cancelled, free up worker
    if (status === 'CANCELLED' && booking.workerId) {
      await Worker.findOneAndUpdate({ id: booking.workerId }, { available: true });
    }
    // If completed, increment jobsCount on worker
    if (status === 'COMPLETED' && booking.workerId) {
      await Worker.findOneAndUpdate(
        { id: booking.workerId },
        { $inc: { jobsCount: 1 }, available: true }
      );
    }

    res.json({ success: true, message: `Booking status updated to: ${status}`, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
