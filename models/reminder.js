const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

module.exports = mongoose.model('User', reminderSchema);

