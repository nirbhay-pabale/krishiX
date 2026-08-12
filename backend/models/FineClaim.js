const mongoose = require('mongoose');

const FineClaimSchema = new mongoose.Schema({
  claimId:       { type: String, unique: true },
  category:      { type: String, required: true },
  filedBy:       { type: String, required: true },
  againstTarget: { type: String, required: true },
  reason:        { type: String, required: true },
  amount:        { type: Number, required: true, min: 100, max: 5000 },
  details:       { type: String },
  date:          { type: String },

  // Status flow: PENDING → UNDER INSPECTION → APPROVED & PAID / REJECTED
  status:        {
    type: String,
    enum: ['PENDING', 'UNDER INSPECTION', 'APPROVED & PAID', 'REJECTED'],
    default: 'PENDING'
  },
  statusColor:   { type: String, default: '#f59e0b' },

  // Resolution
  resolvedAt:    { type: Date },
  adminNote:     { type: String }
}, {
  timestamps: true
});

// Auto-generate claimId before save
FineClaimSchema.pre('save', function(next) {
  if (!this.claimId) {
    this.claimId = `CLM-KPG-${Math.floor(100 + Math.random() * 900)}`;
  }
  if (!this.date) {
    this.date = new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }
  // Set statusColor based on status
  const colorMap = {
    'PENDING':          '#f59e0b',
    'UNDER INSPECTION': '#d97706',
    'APPROVED & PAID':  '#16a34a',
    'REJECTED':         '#dc2626'
  };
  this.statusColor = colorMap[this.status] || '#f59e0b';
  next();
});

module.exports = mongoose.model('FineClaim', FineClaimSchema);
