const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./Task");
const User = require("./user"); 

const app = express();

app.use(cors({
    origin: "https://todo-theta-topaz-38.vercel.app",
    credentials: true
}));
app.use(express.json());

mongoose.connect("mongodb+srv://user1:task1234@task.v7fw9db.mongodb.net/todo?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, userId: user._id });
  } else {
    res.status(401).json({ success: false, message: "User not found" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: "User already exists" });
  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ success: true });
});


app.get("/tasks", async (req, res) => {
  const { userId } = req.query;
  const tasks = await Task.find({ userId });
  res.json(tasks);
});



app.post("/tasks", async (req, res) => {
  const { title, date, completed, userId } = req.body;
  const task = new Task({ title, date, completed, userId });
  await task.save();
  res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.title = req.body.title ?? task.title;
  task.date = req.body.date ?? task.date;
  task.completed = req.body.completed ?? task.completed;
  await task.save();
  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  await task.deleteOne();
  res.json(task);
});


app.get("/", (req, res) => {
    res.send("API is running");
  });
  
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
