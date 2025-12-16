import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import logo from '../assets/logo_doro.png'

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful! Please login.");
      navigate("/");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
     <div className="page-container">
    <div className="card">
       <img src={logo} alt="App Logo" className="app-logo" />
      <div className="app-name">DoroTracker</div>
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="btn btn-submit">Register</button>
         <p>Already have an account?<Link to="/">Log In</Link></p>
      </form>
    </div>
  </div>
  );
}
