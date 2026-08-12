const express   = require('express');
const router    = express.Router();
const FineClaim = require('../models/FineClaim');

/* ── GET /api/fines ─────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;

    const fines = await FineClaim.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: fines.length, fines });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── POST /api/fines ────────────────────────────────────────
   File a new fine claim                                      */
router.post('/', async (req, res) => {
  try {
    const { category, filedBy, againstTarget, reason, amount, details } = req.body;

    if (!filedBy || !againstTarget || !amount) {
      return res.status(400).json({
        success: false,
        error: 'filedBy, againstTarget, and amount are required'
      });
    }

    const fine = new FineClaim({
      category: category || reason,
      reason:   reason || category,
      filedBy,
      againstTarget,
      amount,
      details,
      status: 'PENDING'
    });

    await fine.save();
    res.status(201).json({
      success: true,
      message: '⚖️ Fine claim submitted! KrishiX Escrow will review within 24 hours.',
      claimId: fine.claimId,
      fine
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ── GET /api/fines/:claimId ────────────────────────────── */
router.get('/:claimId', async (req, res) => {
  try {
    const fine = await FineClaim.findOne({ claimId: req.params.claimId });
    if (!fine) return res.status(404).json({ success: false, error: 'Fine claim not found' });
    res.json({ success: true, fine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── PATCH /api/fines/:claimId ─────────────────────────────
   Update fine claim status (admin / escrow action)          */
router.patch('/:claimId', async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const validStatuses = ['PENDING', 'UNDER INSPECTION', 'APPROVED & PAID', 'REJECTED'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const colorMap = {
      'PENDING':          '#f59e0b',
      'UNDER INSPECTION': '#d97706',
      'APPROVED & PAID':  '#16a34a',
      'REJECTED':         '#dc2626'
    };

    const updateData = {
      status,
      statusColor: colorMap[status],
      adminNote: adminNote || ''
    };
    if (['APPROVED & PAID', 'REJECTED'].includes(status)) {
      updateData.resolvedAt = new Date();
    }

    const fine = await FineClaim.findOneAndUpdate(
      { claimId: req.params.claimId },
      updateData,
      { new: true }
    );
    if (!fine) return res.status(404).json({ success: false, error: 'Fine claim not found' });

    res.json({ success: true, message: `Fine claim status updated to: ${status}`, fine });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
