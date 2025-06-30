import React, { useEffect, useState } from "react";
import { getTasks, updateTask } from "../task";

function PendingTasks({ userId }) {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await getTasks(userId);
    const filtered = res.filter((t) => !t.completed);
    setTasks(filtered.map((t) => ({ ...t, date: t.date?.slice(0, 10) })));
  };

  useEffect(() => {
    load();
  }, [userId]);

  const handleToggle = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    load();
  };

  return (
    <>
      <h2>Pending Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id} className="task-box">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggle(task)}
          />
          <span className={task.completed ? "done" : ""}>{task.title}</span>
          <span style={{ marginLeft: "10px" }}>{task.date}</span>
        </div>
      ))}
    </>
  );
}

export default PendingTasks;
