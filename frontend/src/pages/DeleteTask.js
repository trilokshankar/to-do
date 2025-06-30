import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../task";

function DeleteTask({ userId }) {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await getTasks(userId);
    setTasks(res.map((t) => ({ ...t, date: t.date?.slice(0, 10) })));
  };

  useEffect(() => {
    load();
  }, [userId]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    alert("Task deleted successfully");
    load();
  };

  return (
    <>
      <h2>Delete Task</h2>
      {tasks.map((task) => (
        <div key={task._id} className="task-box">
          <div className="task-title">{task.title}</div>
          {task.date && <div className="task-date">{task.date}</div>}
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default DeleteTask;
