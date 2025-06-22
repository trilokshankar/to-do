const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const Task=require("./Task");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo')
.then(()=>console.log("Database is connected"))
.catch(err=>console.error(err));

app.get("/tasks",async(req,res)=>{
    const task=await Task.find();
    res.json(task);
});

app.post("/tasks",async(req,res)=>{
    const task=new Task(req.body);
    await task.save();
    res.json(task);
})

app.put("/tasks/:id",async(req,res)=>{
    const task=await Task.findById(req.params.id);
    task.title=req.body.title ?? task.title;
    task.date=req.body.date ?? task.date;
    task.completed=req.body.completed ?? task.completed;
    await task.save();
    res.json(task);
})

app.delete("/tasks/:id",async(req,res)=>{
    const task=await Task.findById(req.params.id);
    await task.deleteOne();
    res.json(task);
})

app.listen(5000,()=>{
    console.log("Server started on port on 5000");
})