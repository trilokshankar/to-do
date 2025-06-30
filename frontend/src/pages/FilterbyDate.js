import React, { useEffect, useState } from "react";
import { getTasks, updateTask } from "../task";

function FilterByDate({ userId }) {
  const [filterDate, setFilterDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleFilter = async () => {
    const res = await getTasks(userId);
    const filtered = res.filter((t) => t.date?.slice(0, 10) === filterDate);
    setTasks(filtered.map((t) => ({ ...t, date: t.date?.slice(0, 10) })));
  };

  const handleToggle = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
    handleFilter();
  };

  return (
    <>
      <h2>Filter Tasks by Date</h2>
      <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>

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

export default FilterByDate;
