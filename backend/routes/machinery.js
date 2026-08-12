const express   = require('express');
const router    = express.Router();
const Machinery = require('../models/Machinery');

/* ── GET /api/machinery ─────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    let query = {};
    if (category)  query.category = category;
    if (available !== undefined) query.available = available === 'true';

    const machinery = await Machinery.find(query).sort({ trustScore: -1 });
    res.json({ success: true, count: machinery.length, machinery });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── GET /api/machinery/:id ─────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const machine = await Machinery.findOne({ id: req.params.id });
    if (!machine) return res.status(404).json({ success: false, error: 'Machine not found' });
    res.json({ success: true, machine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── PATCH /api/machinery/:id/availability ──────────────── */
router.patch('/:id/availability', async (req, res) => {
  try {
    const { available } = req.body;
    const machine = await Machinery.findOneAndUpdate(
      { id: req.params.id },
      { available },
      { new: true }
    );
    if (!machine) return res.status(404).json({ success: false, error: 'Machine not found' });
    res.json({ success: true, message: `Availability updated to: ${available}`, machine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
