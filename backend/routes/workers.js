const express = require('express');
const router  = express.Router();
const Worker  = require('../models/Worker');

/* ── GET /api/workers ──────────────────────────────────────
   Returns all worker profiles with optional search/filter
   Query params: ?search=name&skill=ALL&available=true        */
router.get('/', async (req, res) => {
  try {
    const { search, skill, available } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name:    { $regex: search, $options: 'i' } },
        { village: { $regex: search, $options: 'i' } },
        { skill:   { $regex: search, $options: 'i' } },
        { role:    { $regex: search, $options: 'i' } }
      ];
    }
    if (skill && skill !== 'ALL') {
      query.skill = skill;
    }
    if (available !== undefined) {
      query.available = available === 'true';
    }

    const workers = await Worker.find(query).sort({ trustScore: -1, rating: -1 });
    res.json({ success: true, count: workers.length, workers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── GET /api/workers/:id ──────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findOne({ id: req.params.id });
    if (!worker) return res.status(404).json({ success: false, error: 'Worker not found' });
    res.json({ success: true, worker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── POST /api/workers ─────────────────────────────────────
   Register a new worker (self-registration)                 */
router.post('/', async (req, res) => {
  try {
    // Auto-generate next worker ID
    const count = await Worker.countDocuments();
    const newId = `W${String(count + 1).padStart(2, '0')}`;
    const worker = new Worker({ ...req.body, id: newId });
    await worker.save();
    res.status(201).json({ success: true, message: 'Worker registered successfully!', worker });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Worker with this ID already exists' });
    }
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ── PATCH /api/workers/:id/availability ───────────────── */
router.patch('/:id/availability', async (req, res) => {
  try {
    const { available } = req.body;
    const worker = await Worker.findOneAndUpdate(
      { id: req.params.id },
      { available },
      { new: true }
    );
    if (!worker) return res.status(404).json({ success: false, error: 'Worker not found' });
    res.json({ success: true, message: `Availability updated to: ${available}`, worker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── POST /api/workers/:id/reviews ────────────────────────
   Add a review to a worker                                  */
router.post('/:id/reviews', async (req, res) => {
  try {
    const { farmer, stars, text } = req.body;
    if (!farmer || !text) {
      return res.status(400).json({ success: false, error: 'farmer and text are required' });
    }

    const worker = await Worker.findOne({ id: req.params.id });
    if (!worker) return res.status(404).json({ success: false, error: 'Worker not found' });

    worker.reviews.unshift({ farmer, stars: stars || 5, text });
    worker.recalcRating();
    await worker.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      newRating: worker.rating,
      review: worker.reviews[0]
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
