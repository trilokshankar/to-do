const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  date: Date,
  completed: Boolean,
  userId:String,
  
});

module.exports = mongoose.model("Task", taskSchema);
