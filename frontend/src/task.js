const BASE = "http://localhost:5000";


export const getTasks = (userId) =>
  fetch(`${BASE}/tasks?userId=${userId}`).then((res) => res.json());

export const addTask = (task) =>
  fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

export const updateTask = (id, task) =>
  fetch(`${BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

export const deleteTask = (id) =>
  fetch(`${BASE}/tasks/${id}`, {
    method: "DELETE",
  });

