const BASE = "http://localhost:5000/tasks";

export const getTasks = () => fetch(BASE).then((res) => res.json());

export const addTask = (task) =>
  fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

export const updateTask = (id, task) =>
  fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

export const deleteTask = (id) =>
  fetch(`${BASE}/${id}`, { method: "DELETE" });
