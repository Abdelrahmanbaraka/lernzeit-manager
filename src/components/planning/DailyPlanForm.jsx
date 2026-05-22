import { useState } from "react";

function DailyPlanForm({ goals, selectedDate, onSave, onClose }) {
  const [startTime, setStartTime] = useState("");

  const [endTime, setEndTime] = useState("");

  const [goal, setGoal] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!startTime || !endTime || !goal) {
      alert("Bitte alle Felder ausfüllen.");

      return;
    }

    if (endTime <= startTime) {
      alert("Die Endzeit muss nach der Startzeit liegen.");

      return;
    }

    onSave({
      id: Date.now(),

      date: selectedDate,

      startTime,

      endTime,

      goal,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>Tagesplanung</h2>

        <p className="modal-hint">Datum: {selectedDate}</p>

        <form onSubmit={handleSubmit}>
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

export default DailyPlanForm;