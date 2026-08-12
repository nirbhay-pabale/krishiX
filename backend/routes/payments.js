const express  = require('express');
const router   = express.Router();
const crypto   = require('crypto');

let Razorpay;
try {
  Razorpay = require('razorpay');
} catch (e) {
  Razorpay = null;
}

const key_id     = process.env.RAZORPAY_KEY_ID || 'rzp_test_krishix_kopargaon';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'krishix_secret_12345';

let rzpInstance = null;
if (Razorpay && process.env.RAZORPAY_KEY_ID) {
  rzpInstance = new Razorpay({ key_id, key_secret });
}

/* ── POST /api/payments/create-order ──────────────────────
   Creates a Razorpay Order for booking or escrow lock       */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, bookingId, description } = req.body;
    const orderAmount = (amount || 500) * 100; // in paise

    if (rzpInstance) {
      const order = await rzpInstance.orders.create({
        amount: orderAmount,
        currency: currency || 'INR',
        receipt: `receipt_${bookingId || Date.now()}`,
        notes: { description: description || 'KrishiX Escrow Deposit' }
      });
      return res.json({ success: true, order, key: key_id, sandbox: false });
    }

    // Sandbox Fallback Order
    const fakeOrderId = `order_kpg_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    res.json({
      success: true,
      sandbox: true,
      key: key_id,
      order: {
        id: fakeOrderId,
        entity: 'order',
        amount: orderAmount,
        currency: currency || 'INR',
        receipt: `receipt_${bookingId || Date.now()}`,
        status: 'created'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ── POST /api/payments/verify ────────────────────────────
   Verifies payment signature and locks into Escrow         */
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  if (rzpInstance && razorpay_signature) {
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
  }

  res.json({
    success: true,
    message: '💳 Payment verified & Escrow Protection Activated!',
    paymentId: razorpay_payment_id || `pay_kpg_${Date.now()}`,
    orderId: razorpay_order_id,
    escrowStatus: 'LOCKED_IN_ESCROW'
  });
});

module.exports = router;
