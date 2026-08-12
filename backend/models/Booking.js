const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId:     { type: String, unique: true },
  type:          { type: String, enum: ['Individual', 'Team Labour Squad', 'Machinery'], default: 'Individual' },
  title:         { type: String, required: true },  // worker name or squad name or machine name
  workerId:      { type: String },                   // W01..W15 for individual
  squadId:       { type: String },                   // squad ID for team
  machineryId:   { type: String },                   // M01..M04 for machine

  // Booking details
  farmerName:    { type: String },
  farmerMobile:  { type: String },
  location:      { type: String },
  workDetails:   { type: String },
  date:          { type: String, required: true },
  duration:      { type: String },
  numWorkers:    { type: Number, default: 1 },

  // Financials
  amount:        { type: Number, required: true },
  paymentMethod: { type: String, default: 'UPI Paid' },
  escrowHeld:    { type: Boolean, default: true },

  // Status
  status:        { type: String, enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'CONFIRMED' }
}, {
  timestamps: true
});

// Auto-generate bookingId before save
BookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = `KX-KPG-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
