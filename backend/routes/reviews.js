const express = require('express');
const router  = express.Router();
const Worker  = require('../models/Worker');

/* ── POST /api/reviews/:workerId ───────────────────────────
   Add a farmer review to a specific worker                   */
router.post('/:workerId', async (req, res) => {
  try {
    const { farmer, stars, text } = req.body;

    if (!farmer || !text) {
      return res.status(400).json({ success: false, error: 'farmer name and review text are required' });
    }
    if (stars < 1 || stars > 5) {
      return res.status(400).json({ success: false, error: 'stars must be between 1 and 5' });
    }

    const worker = await Worker.findOne({ id: req.params.workerId });
    if (!worker) {
      return res.status(404).json({ success: false, error: 'Worker not found' });
    }

    // Add review at beginning (newest first)
    worker.reviews.unshift({ farmer, stars: Number(stars) || 5, text });

    // Recalculate average rating
    const totalStars = worker.reviews.reduce((sum, r) => sum + r.stars, 0);
    worker.rating = Math.round((totalStars / worker.reviews.length) * 10) / 10;

    await worker.save();

    res.status(201).json({
      success: true,
      message: `✅ Review added for ${worker.name}!`,
      newRating: worker.rating,
      totalReviews: worker.reviews.length,
      review: worker.reviews[0]
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
