import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://todo-production-c449.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        onLogin(data.userId); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const handleSignup = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    try {
      const res = await fetch("https://todo-production-c449.up.railway.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok && data.userId) {
        localStorage.setItem("userId", data.userId);
        onLogin(data.userId); 
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  };

  return (
    <div className="login-box">
      <h2>Login / Signup</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Login;
