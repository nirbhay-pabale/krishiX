const mongoose = require('mongoose');

const PastWorkSchema = new mongoose.Schema({
  year:   { type: String },
  title:  { type: String },
  client: { type: String },
  detail: { type: String }
});

const ReviewSchema = new mongoose.Schema({
  farmer: { type: String, required: true },
  stars:  { type: Number, min: 1, max: 5, default: 5 },
  text:   { type: String, required: true },
  date:   { type: Date, default: Date.now }
});

const WorkerSchema = new mongoose.Schema({
  id:              { type: String, required: true, unique: true },  // W01, W02 ...
  name:            { type: String, required: true },
  age:             { type: Number },
  gender:          { type: String, enum: ['Male', 'Female', 'Other'] },
  role:            { type: String },
  village:         { type: String },
  mobile:          { type: String },
  whatsapp:        { type: String },
  experience:      { type: Number },
  dailyRate:       { type: Number },
  workersInSquad:  { type: Number },
  skill:           { type: String },
  bio:             { type: String },
  aadhaar:         { type: String, default: '✓ Aadhaar Verified' },
  available:       { type: Boolean, default: true },
  photo:           { type: String },
  rating:          { type: Number, default: 5.0 },
  trustScore:      { type: Number, default: 90 },
  jobsCount:       { type: Number, default: 0 },
  punctuality:     { type: String, default: '98%' },
  pastWorkExperience: [PastWorkSchema],
  reviews:         [ReviewSchema]
}, {
  timestamps: true
});

// Auto-update rating from reviews
WorkerSchema.methods.recalcRating = function() {
  if (this.reviews.length === 0) return;
  const avg = this.reviews.reduce((sum, r) => sum + r.stars, 0) / this.reviews.length;
  this.rating = Math.round(avg * 10) / 10;
};

module.exports = mongoose.model('Worker', WorkerSchema);
