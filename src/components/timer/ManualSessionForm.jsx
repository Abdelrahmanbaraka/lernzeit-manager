import { useState } from "react";

import { getGoals } from "../../services/goalService";

import { getActiveStopwatch } from "../../services/stopwatchService";

import {
  calculateMinutesBetween,
  getCurrentTime,
  getTodayDate,
} from "../../utils/timerUtils";

import {
  hasOverlappingLearningSession,
  isRunningStopwatchForSession,
} from "../../utils/sessionUtils";

function ManualSessionForm({ existingSessions = [], onSave, onClose }) {
  const [goals] = useState(() => getGoals());

  const [date, setDate] = useState(getTodayDate());

  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [goal, setGoal] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!date || !startTime || !endTime || !goal) {
      alert("Bitte alle Felder ausfüllen.");

      return;
    }

    const durationMinutes = calculateMinutesBetween(startTime, endTime);

    if (durationMinutes <= 0) {
      alert("Ihre eingegebenen Zeiten sind ungültig.");

      return;
    }

    const session = {
      id: Date.now(),

      date,

      startTime,

      endTime,

      goal,

      durationMinutes,

      source: "manual",

      emoji: "✍️",
    };

    if (hasOverlappingLearningSession(session, existingSessions)) {
      alert(
        "Diese Lernsession überschneidet sich mit einer bereits gespeicherten Lernzeit für dasselbe Ziel."
      );

      return;
    }

    if (
      isRunningStopwatchForSession(getActiveStopwatch(), session, getCurrentTime())
    ) {
      alert(
        "Für dieses Ziel läuft bereits eine Stoppuhr. Bitte stoppe oder pausiere sie zuerst."
      );

      return;
    }

    onSave(session);

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>Lernsession nachtragen</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <input
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />

          <input
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />

          <select value={goal} onChange={(event) => setGoal(event.target.value)}>
            <option value="">Ziel auswählen</option>

            {goals.map((goalItem) => (
              <option key={goalItem.id} value={goalItem.title}>
                {goalItem.title}
              </option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit">Speichern</button>

            <button type="button" onClick={onClose}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManualSessionForm;
