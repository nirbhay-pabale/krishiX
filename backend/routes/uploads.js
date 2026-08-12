const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');

// Configure disk storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../assets'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `upload_${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* ── POST /api/upload ─────────────────────────────────────
   Upload worker profile photo, Aadhaar image, or damage proof */
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  const fileUrl = `./assets/${req.file.filename}`;
  console.log(`📸 File uploaded: ${fileUrl}`);

  res.json({
    success: true,
    message: 'File uploaded successfully!',
    fileUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

module.exports = router;
