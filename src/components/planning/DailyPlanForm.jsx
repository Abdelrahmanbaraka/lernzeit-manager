import { useState } from "react";

import { getDailyPlanDateRange } from "../../utils/dateUtils";

import { getTodayDate } from "../../utils/timerUtils";

function DailyPlanForm({ goals, selectedDate, existingPlan, onSave, onClose }) {
  const dateRange = getDailyPlanDateRange();

  const fixedDate = selectedDate || existingPlan?.date || "";

  const [date, setDate] = useState(fixedDate || getTodayDate());

  const [startTime, setStartTime] = useState(existingPlan?.startTime || "");

  const [endTime, setEndTime] = useState(existingPlan?.endTime || "");

  const [goal, setGoal] = useState(existingPlan?.goal || "");

  function handleSubmit(event) {
    event.preventDefault();

    if (!date || !startTime || !endTime || !goal) {
      alert("Bitte alle Felder ausfüllen.");

      return;
    }

    if (endTime <= startTime) {
      alert("Ihre eingegebenen Zeiten sind ungültig.");

      return;
    }

    if (!existingPlan && (date < dateRange.min || date > dateRange.max)) {
      alert("Tagesplanung ist nur für die nächsten 30 Tage möglich.");

      return;
    }

    onSave({
      id: existingPlan?.id || Date.now(),

      date,

      startTime,

      endTime,

      goal,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>{existingPlan ? "Tagesplanung bearbeiten" : "Tagesplanung"}</h2>

        {fixedDate ? (
          <p className="modal-hint">Datum: {fixedDate}</p>
        ) : (
          <p className="modal-hint">Datum innerhalb der nächsten 30 Tage wählen.</p>
        )}

        <form onSubmit={handleSubmit}>
          {!fixedDate && (
            <input
              type="date"
              min={dateRange.min}
              max={dateRange.max}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          )}

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
