import React,{useState}from "react";

function Login({onLogin}){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const handleLogin = async () => {
        const res = await fetch("https://todo-production-c449.up.railway.app/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
    if (res.ok){
        const data =await res.json;
        onLogin(data.username)
    }else{
        res.json({message:"Login failed"});
    }
    }

return (
    <div className="container">
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}