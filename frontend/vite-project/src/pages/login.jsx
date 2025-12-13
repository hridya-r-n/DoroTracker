import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/home");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="page-container">
    <div className="card">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-submit">Login</button>
        <p>Don't have an account?<Link to="/register">Sign In</Link></p>
      </form>

    </div>
  </div>
  );
}
