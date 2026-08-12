const mongoose = require('mongoose');

const MachinerySchema = new mongoose.Schema({
  id:           { type: String, required: true, unique: true },  // M01, M02...
  name:         { type: String, required: true },
  category:     { type: String, enum: ['Tractor', 'Harvester', 'Drone', 'Pump', 'Other'] },
  hp:           { type: String },
  ratePerHour:  { type: Number },
  ratePerAcre:  { type: Number },
  owner:        { type: String },
  village:      { type: String },
  rating:       { type: Number, default: 4.8 },
  trustScore:   { type: Number, default: 95 },
  reviewsCount: { type: Number, default: 0 },
  available:    { type: Boolean, default: true },
  image:        { type: String },
  specs:        [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Machinery', MachinerySchema);
