import { Link } from "react-router-dom";
import logo from '../assets/logo_doro.png'
export default function Home() {
    return (
        <div className="page-container">
  <div className="card">
     <img src={logo} alt="App Logo" className="app-logo" />
    <div className="app-name">DoroTracker</div>

    <div className="navbar">
      <Link to="/" className="btn">LogOut</Link>  
      <Link to="/timer" className="btn">Start Timer</Link>
      <Link to="/settings" className="btn">Settings</Link>
      <Link to="/history" className="btn">Focus History</Link>
    </div>
  </div>
</div>
    );
}