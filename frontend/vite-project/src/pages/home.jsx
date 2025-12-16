import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div className="page-container">
  <div className="card">
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