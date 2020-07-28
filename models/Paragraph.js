const mongoose = require('mongoose');

const ParagraphSchema = new mongoose.Schema({
  priority: {
    type: Number,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('paragraph', ParagraphSchema);
