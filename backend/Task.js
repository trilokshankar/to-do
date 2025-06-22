const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  date: Date,
  completed: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
