import { useEffect, useState } from "react";

import { getGoals } from "../../services/goalService";

import {
  getLearningSessions,
  saveLearningSessions,
} from "../../services/sessionService";

import { formatSecondsToHHMMSS, getTodayDate } from "../../utils/timerUtils";

function Stopwatch({ onSessionSaved }) {
  const [goals, setGoals] = useState([]);

  const [selectedGoal, setSelectedGoal] = useState("");

  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((previousSeconds) => previousSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  function handleStart() {
    if (!selectedGoal) {
      alert("Bitte zuerst ein Ziel auswählen.");

      return;
    }

    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleStop() {
    if (seconds === 0) {
      alert("Keine Lernzeit erfasst.");

      return;
    }

    if (!selectedGoal) {
      alert("Bitte ein Ziel auswählen.");

      return;
    }

    const roundedMinutes = Math.floor(seconds / 60);

    if (roundedMinutes === 0) {
      alert("Die Lernsession ist kürzer als eine Minute und wird nicht gespeichert.");

      setSeconds(0);

      setIsRunning(false);

      return;
    }

    const newSession = {
      id: Date.now(),

      date: getTodayDate(),

      goal: selectedGoal,

      durationMinutes: roundedMinutes,

      source: "stopwatch",

      emoji: "⏱️",
    };

    const existingSessions = getLearningSessions();

    const updatedSessions = [...existingSessions, newSession];

    saveLearningSessions(updatedSessions);

    setSeconds(0);

    setIsRunning(false);

    setSelectedGoal("");

    if (onSessionSaved) {
      onSessionSaved(updatedSessions);
    }
  }

  function handleReset() {
    setSeconds(0);

    setIsRunning(false);
  }

  return (
    <div className="stopwatch-card">
      <div className="stopwatch-header">
        <h2>Stoppuhr</h2>

        <p>Lernzeit direkt erfassen</p>
      </div>

      <div className="stopwatch-time">{formatSecondsToHHMMSS(seconds)}</div>

      <select
        className="timer-select"
        value={selectedGoal}
        onChange={(event) => setSelectedGoal(event.target.value)}
        disabled={isRunning}
      >
        <option value="">Ziel auswählen</option>

        {goals.map((goal) => (
          <option key={goal.id} value={goal.title}>
            {goal.title}
          </option>
        ))}
      </select>

      <div className="timer-actions">
        {!isRunning ? (
          <button className="primary-btn" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className="pause-btn" onClick={handlePause}>
            Pause
          </button>
        )}

        <button className="logout-btn" onClick={handleStop}>
          Stop
        </button>

        <button className="delete-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;