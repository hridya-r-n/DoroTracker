import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function History({ user }) {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/focus/${user.id}`)
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Failed to fetch history:", err));
  }, [user]);
  const getTimeInterval = (startDate, durationMinutes) => {
  const start = new Date(startDate);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const format = d =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return `${format(start)} – ${format(end)}`;
};


  return (
  <div className="page-container">
  <h2>Focus History</h2>
  {logs.length === 0 ? (
    <p>No focus sessions yet.</p>
  ) : (
<div className="session-container">
  {/* Today's session */}
  {(() => {
    const today = new Date().toDateString();
    const todayLog = logs.find(
      log => new Date(log.date).toDateString() === today
    );

    if (todayLog) {
      const startTime = new Date(todayLog.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

                return (
                  <div className="session-card">
                    <h3>Today's Focus</h3>
                    <div className="today-session">
                    <p>
                      <strong>Session Time:</strong>{" "}
                      {getTimeInterval(todayLog.date, todayLog.focus_time)}
                    </p>
                    <p><strong>Focused Minutes:</strong> {todayLog.focus_time}</p>
                    <p><strong>Break Minutes:</strong> {todayLog.break_time || 0}</p>
                    </div>
                  </div>
                  
                );
              }
              return null;
  })()}

  {/* Previous days */}
  <div className="session-card">
     <h3>Previous Sessions</h3>
    {logs
      .filter(
        log => new Date(log.date).toDateString() !== new Date().toDateString()
      )
      .map(log => {
        const dateObj = new Date(log.date);

        return (
          <div key={log.id} className="session-card prev-session">
           
            <p>
              <strong>Date:</strong>{" "}
              {dateObj.toLocaleDateString()}
            </p>
            <p>
              <strong>Session Time:</strong>{" "}
              {getTimeInterval(log.date, log.focus_time)}
            </p>
            <p><strong>Focused Minutes:</strong> {log.focus_time}</p>
            <p><strong>Break Minutes:</strong> {log.break_time || 0}</p>
          </div>
        );
      })}
  </div>
</div>

  )}
  <br />
  <button className="btn btn-back" onClick={() => navigate(-1)}>Back</button>
</div>


  );
}
