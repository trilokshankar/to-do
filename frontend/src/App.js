import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Login from "./login";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import PendingTasks from "./pages/PendingTasks";
import CreateTask from "./pages/CreateTask";
import DeleteTask from "./pages/DeleteTask";
import FilterByDate from "./pages/FilterbyDate"; 
import "./styles/App.css";

function AppWrapper() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (!storedUser) setUserId(null);
  }, []);

  if (!userId) {
    return <Login onLogin={(id) => setUserId(id)} />;
  }

  return <MainApp userId={userId} onLogout={() => setUserId(null)} />;
}

function MainApp({ userId, onLogout }) {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar handleLogout={onLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/all" />} />
            <Route path="/all" element={<AllTasks userId={userId} />} />
            <Route path="/completed" element={<CompletedTasks userId={userId} />} />
            <Route path="/pending" element={<PendingTasks userId={userId} />} />
            <Route path="/create" element={<CreateTask userId={userId} />} />
            <Route path="/delete" element={<DeleteTask userId={userId} />} />
            <Route path="/filter" element={<FilterByDate userId={userId} />} />
            <Route path="*" element={<Navigate to="/all" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AppWrapper;
