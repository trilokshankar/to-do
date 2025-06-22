import React, { useState, useEffect } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./taskService";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title, date: new Date(), completed: false });
    setTitle("");
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

  return (
    <div className="container">
      <h1>📋 To-Do List</h1>
      <div className="input-area">
        <input
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-box" key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
            />
            <EditableTitle task={task} onEdit={handleEdit} />
            <button onClick={() => handleDelete(task._id)}>🗑️</button>
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
      <button onClick={saveEdit}>💾</button>
    </>
  ) : (
    <>
      <span className={task.completed ? "done" : ""}>{task.title}</span>
      <button onClick={() => setEditing(true)}>✏️</button>
    </>
  );
}

export default App;
