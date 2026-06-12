import { useEffect, useState } from "react";

import { getGoals } from "../../services/goalService";

import {
  getLearningSessions,
  saveLearningSessions,
} from "../../services/sessionService";

import {
  clearActiveStopwatch,
  getActiveStopwatch,
  saveActiveStopwatch,
} from "../../services/stopwatchService";

import {
  formatSecondsToHHMMSS,
  getCurrentTime,
  getTodayDate,
} from "../../utils/timerUtils";
import { hasOverlappingLearningSession } from "../../utils/sessionUtils";

function Stopwatch({ onSessionSaved }) {
  const [goals] = useState(() => getGoals());

  const [selectedGoal, setSelectedGoal] = useState(
    () => getActiveStopwatch()?.goal || ""
  );

  const [seconds, setSeconds] = useState(() => {
    const activeStopwatch = getActiveStopwatch();

    return activeStopwatch ? getElapsedSeconds(activeStopwatch) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const activeStopwatch = getActiveStopwatch();

    return Boolean(activeStopwatch?.isRunning);
  });

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const activeStopwatch = getActiveStopwatch();

        if (activeStopwatch) {
          setSeconds(getElapsedSeconds(activeStopwatch));
        }
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

    const activeStopwatch = getActiveStopwatch();

    if (activeStopwatch?.isRunning) {
      setSelectedGoal(activeStopwatch.goal || "");

      setSeconds(getElapsedSeconds(activeStopwatch));

      setIsRunning(true);

      alert("Es läuft bereits eine Stoppuhr. Bitte stoppe oder pausiere sie zuerst.");

      return;
    }

    setIsRunning(true);

    const stopwatchState = {
      goal: selectedGoal,

      startTimestamp: Date.now(),

      accumulatedSeconds: activeStopwatch?.accumulatedSeconds || seconds,

      isRunning: true,

      startDate: activeStopwatch?.startDate || getTodayDate(),

      startTime: activeStopwatch?.startTime || getCurrentTime(),
    };

    saveActiveStopwatch(stopwatchState);
  }

  function handlePause() {
    const activeStopwatch = getActiveStopwatch();

    const elapsedSeconds = activeStopwatch
      ? getElapsedSeconds(activeStopwatch)
      : seconds;

    saveActiveStopwatch({
      ...activeStopwatch,

      goal: selectedGoal,

      startTimestamp: null,

      accumulatedSeconds: elapsedSeconds,

      isRunning: false,
    });

    setSeconds(elapsedSeconds);

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

    const activeStopwatch = getActiveStopwatch();

    const totalSeconds = activeStopwatch
      ? getElapsedSeconds(activeStopwatch)
      : seconds;

    const roundedMinutes = Math.floor(totalSeconds / 60);

    if (roundedMinutes === 0) {
      alert("Die Lernsession ist kürzer als eine Minute und wird nicht gespeichert.");

      setSeconds(0);

      setIsRunning(false);

      clearActiveStopwatch();

      return;
    }

    const newSession = {
      id: Date.now(),

      date: activeStopwatch?.startDate || getTodayDate(),

      goal: selectedGoal,

      startTime: activeStopwatch?.startTime || "",

      endTime: getCurrentTime(),

      durationMinutes: roundedMinutes,

      source: "stopwatch",

      emoji: "⏱️",
    };

    const existingSessions = getLearningSessions();

    if (hasOverlappingLearningSession(newSession, existingSessions)) {
      alert(
        "Diese Lernsession überschneidet sich mit einer bereits gespeicherten Lernzeit für dasselbe Ziel."
      );

      saveActiveStopwatch({
        ...activeStopwatch,

        goal: selectedGoal,

        startTimestamp: null,

        accumulatedSeconds: totalSeconds,

        isRunning: false,
      });

      setSeconds(totalSeconds);

      setIsRunning(false);

      return;
    }

    const updatedSessions = [...existingSessions, newSession];

    saveLearningSessions(updatedSessions);

    setSeconds(0);

    setIsRunning(false);

    setSelectedGoal("");

    clearActiveStopwatch();

    if (onSessionSaved) {
      onSessionSaved(updatedSessions);
    }
  }

  function handleReset() {
    setSeconds(0);

    setIsRunning(false);

    setSelectedGoal("");

    clearActiveStopwatch();
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

      {goals.length === 0 && (
        <p className="helper-text">
          Noch keine Lernziele vorhanden. Bitte erstelle zuerst ein Lernziel.
        </p>
      )}

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

function getElapsedSeconds(stopwatch) {
  const accumulatedSeconds = Number(stopwatch.accumulatedSeconds || 0);

  if (!stopwatch.isRunning || !stopwatch.startTimestamp) {
    return accumulatedSeconds;
  }

  return (
    accumulatedSeconds +
    Math.floor((Date.now() - Number(stopwatch.startTimestamp)) / 1000)
  );
}

export default Stopwatch;
