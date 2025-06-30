import React from "react";
import { Link } from "react-router-dom";
import "./styles/Sidebar.css";

function Sidebar({ handleLogout }) {
  return (
    <div className="sidebar">
      <h2>To-Do App</h2>
      <nav>
        <Link to="/all">All Tasks</Link>
        <Link to="/completed">Completed</Link>
        <Link to="/pending">Pending</Link>
        <Link to="/create">Create Task</Link>
        <Link to="/delete">Delete Task</Link>
        <Link to="/filter">Filter by Date</Link>
      </nav>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Sidebar;
