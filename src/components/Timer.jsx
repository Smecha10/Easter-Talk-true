import { useState, useEffect } from 'react';

export default function Timer() {
  const TOTAL_TIME = 15 * 60; // 15 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };
  
  const addMinute = () => setTimeLeft(prev => prev + 60);
  const subMinute = () => setTimeLeft(prev => Math.max(0, prev - 60));

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Determine timer color based on time left
  let timerClass = 'timer-safe';
  if (timeLeft <= 60) {
    timerClass = 'timer-danger'; // <= 1 minute
  } else if (timeLeft <= 5 * 60) {
    timerClass = 'timer-warning'; // <= 5 minutes
  }

  return (
    <div className={`timer-widget ${timerClass}`}>
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="timer-controls">
        <button onClick={subMinute} title="Subtract 1 Minute">-1m</button>
        <button className="primary-btn" onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={addMinute} title="Add 1 Minute">+1m</button>
      </div>
    </div>
  );
}
