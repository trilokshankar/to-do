import React, { useState, useEffect } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./task.js";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    const formatted = res.map(task => ({
      ...task,
      date: task.date?.slice(0, 10)
    }));
    setTasks(formatted);
  };

  const handleAdd = async () => {
    if (!title.trim() || !date) return;
    await addTask({ title, date, completed: false });
    setTitle("");
    setDate("");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, {
      ...task,
      completed: !task.completed,
    });
    loadTasks();
  };

  const handleEdit = async (task, newTitle) => {
    await updateTask(task._id, { ...task, title: newTitle });
    loadTasks();
  };

  const filteredTasks = filterDate
    ? tasks.filter((task) => task.date === filterDate)
    : tasks;

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filter-area">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={() => setFilterDate("")}>Clear Filter</button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div className="task-box" key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
            />
            <EditableTitle task={task} onEdit={handleEdit} />
            <span className="task-date">{task.date}</span>
            <button onClick={() => handleDelete(task._id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditableTitle({ task, onEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const saveEdit = () => {
    onEdit(task, newTitle);
    setEditing(false);
  };

  return isEditing ? (
    <>
      <input
        className="edit-input"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={saveEdit}>save</button>
    </>
  ) : (
    <>
      <span className={task.completed ? "done" : ""}>{task.title}</span>
      <button onClick={() => setEditing(true)}>edit</button>
    </>
  );
}

export default App;
