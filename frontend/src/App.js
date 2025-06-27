import React, { useState, useEffect } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./task";
import Login from "./login.js";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    if (userId) loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    const res = await getTasks(userId);
    const formatted = res.map((task) => ({
      ...task,
      date: task.date?.slice(0, 10),
    }));
    setTasks(formatted);
  };

  const handleAdd = async () => {
    if (!title.trim() || !date) return;
    try{
      await addTask({ title, date, completed: false, userId });
      setTitle("");
      setDate("");
      loadTasks();
      alert("Task created successfully");
    }catch{
      alert("Failed to create Task")
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    loadTasks();
  };

  const handleEdit = async (task, newTitle) => {
    await updateTask(task._id, { ...task, title: newTitle });
    loadTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesDate = filterDate ? task.date === filterDate : true;

    if (showCompleted) return matchesDate && task.completed;
    if (showPending) return matchesDate && !task.completed;

    return matchesDate;
  });

  if (!userId) return <Login onLogin={(id) => setUserId(id)} />;

  return (
    <div className="container">
      <div className="header">
  <h1>To-Do List</h1>
  <button className="logout-button" onClick={handleLogout}>Logout</button>
</div>
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

      <div className="filter-area">
        <button
          onClick={() => {
            setShowCompleted(!showCompleted);
            setShowPending(false);
          }}
        >
          Show Completed Tasks
        </button>

        <button
          onClick={() => {
            setShowPending(!showPending);
            setShowCompleted(false);
          }}
        >
          Show Pending Tasks
        </button>

        <button
          onClick={() => {
            setShowPending(false);
            setShowCompleted(false);
          }}
        >
          Show All Tasks
        </button>

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
