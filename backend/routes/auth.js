const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');

// In-memory store for OTPs in sandbox mode
const otpStore = new Map();
const JWT_SECRET = process.env.JWT_SECRET || 'krishix_kopargaon_secret_key_2026';

/* ── POST /api/auth/send-otp ──────────────────────────────
   Generates a 6-digit OTP for mobile login                  */
router.post('/send-otp', (req, res) => {
  const { mobile, role } = req.body;
  if (!mobile || mobile.length < 10) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number required' });
  }

  // Generate 6-digit OTP (for testing/demo: default to 123456 or random)
  const otp = process.env.NODE_ENV === 'production' ? Math.floor(100000 + Math.random() * 900000).toString() : '123456';
  
  otpStore.set(mobile, {
    otp,
    role: role || 'farmer',
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  });

  console.log(`📱 [SMS OTP] Sent to ${mobile}: ${otp}`);

  res.json({
    success: true,
    message: `OTP sent to ${mobile} via SMS`,
    demoOtp: otp, // Returned for easy testing in demo mode
    expiresInSeconds: 300
  });
});

/* ── POST /api/auth/verify-otp ────────────────────────────
   Verifies OTP & issues JWT Session Token                   */
router.post('/verify-otp', (req, res) => {
  const { mobile, otp, name } = req.body;
  
  if (!mobile || !otp) {
    return res.status(400).json({ success: false, error: 'Mobile and OTP required' });
  }

  const record = otpStore.get(mobile);
  
  // Accept demo OTP '123456' or stored OTP
  if (otp !== '123456' && (!record || record.otp !== otp || Date.now() > record.expiresAt)) {
    return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
  }

  otpStore.delete(mobile);

  const user = {
    mobile,
    name: name || `Farmer (${mobile.slice(-4)})`,
    role: record ? record.role : 'farmer',
    village: 'Kopargaon Taluka'
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

  res.json({
    success: true,
    message: '🎉 Authentication successful!',
    token,
    user
  });
});

/* ── GET /api/auth/me ─────────────────────────────────────
   Verifies JWT session token                                */
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

module.exports = router;
