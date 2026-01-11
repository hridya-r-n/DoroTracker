import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Timer({ user }) {
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isFocus, setIsFocus] = useState(true);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const playAlert=()=>{
    const audio=new Audio("/alert.mp3");
    audio.volume=0.4;
    audio.play().catch(()=>{});
  }

  // Fetch user's settings
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/settings/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFocusMin(data.focus_min || 25);
        setBreakMin(data.break_min || 5);
        setSecondsLeft((data.focus_min || 25) * 60);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playAlert();
            saveFocusSession();
            setIsFocus(!isFocus);
            setSecondsLeft((!isFocus ? focusMin : breakMin) * 60);
            setIsRunning(false);
            return (!isFocus ? focusMin : breakMin) * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSecondsLeft((isFocus ? focusMin : breakMin) * 60);
  };

  const saveFocusSession = async () => {
    if (!user || !isFocus) return; 

    await fetch("http://localhost:5000/focus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, focus_time: focusMin }),
    });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
      <div className="page-container">
  <div className="card">
   
    {/* Timer section */}
    <div className="timer-display">
                  <h2 style={{fontSize: "3rem",
                  fontWeight: 700,
                  color: "#A18CD1",textAlign:"center"}} >Pomodoro Timer</h2>
      <h2>{isFocus ? "Focus Time" : "Break Time"}</h2>
      <h1>{formatTime(secondsLeft)}</h1>

      {/* Button row */}
      <div className="button-row">
        <button className="btn btn-start" onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button className="btn btn-pause" onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button className="btn btn-reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
       <button className="btn btn-back" onClick={() => navigate(-1)}>Back</button>

    </div>
  </div>
</div>

  );
}
