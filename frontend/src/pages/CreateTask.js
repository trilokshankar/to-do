import React, { useState } from "react";
import { addTask } from "../bill";

function CreateTask({ userId }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = async () => {
    if (!title.trim() || !date) return alert("Enter title and date");
    await addTask({ title, date, completed: false, userId });
    setTitle("");
    setDate("");
    alert("Task Created Successfully");
  };

  return (
    <>
      <h2>Create Task</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleAdd}>Add Task</button>
    </>
  );
}

export default CreateTask;
