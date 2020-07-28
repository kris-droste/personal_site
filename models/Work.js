const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  displayedText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('work', WorkSchema);
