import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings({ user }) {
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/settings/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFocusMin(data.focus_min || 25);
        setBreakMin(data.break_min || 5);
      })
      .catch((err) => console.error("Failed to fetch settings:", err));
  }, [user]);

  const handleSave = async () => {
    if (!user) return alert("User not logged in");

    const res = await fetch(`http://localhost:5000/settings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, focus_min: focusMin, break_min: breakMin }),
    });

    const data = await res.json();
    if (res.ok) alert(data.message || "Settings updated!");
    else alert(data.error || "Failed to update settings");
  };

  return (
   <div className="page-container">
  <div className="card">
    
    <h2>Settings</h2>

    <form>
      <label>Focus Minutes:</label>
      <input
        type="number"
        value={focusMin}
        onChange={(e) => setFocusMin(Number(e.target.value))}
      />

      <label>Break Minutes:</label>
      <input
        type="number"
        value={breakMin}
        onChange={(e) => setBreakMin(Number(e.target.value))}
      />

      <button type="button" className="btn btn-submit" onClick={handleSave}>
        Save
      </button>
      
    </form>
    <br/>
    <button className="btn btn-back" onClick={() => navigate(-1)}>Back</button>
  </div>
</div>
  );
}
