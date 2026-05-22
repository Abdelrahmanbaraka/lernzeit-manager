import { useState } from "react";

import { getMonthInputValue } from "../../utils/dateUtils";

function MonthPlanForm({ goals, currentMonth, onSave, onClose }) {
  const [month, setMonth] = useState(getMonthInputValue(currentMonth));

  const [hours, setHours] = useState("");

  const [selectedGoals, setSelectedGoals] = useState([]);

  function handleGoalSelect(goalTitle) {
    if (selectedGoals.includes(goalTitle)) {
      setSelectedGoals(selectedGoals.filter((goal) => goal !== goalTitle));

      return;
    }

    if (selectedGoals.length >= 10) {
      alert("Maximal 10 Ziele.");

      return;
    }

    setSelectedGoals([...selectedGoals, goalTitle]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!month || !hours || selectedGoals.length === 0) {
      alert("Bitte Monat, Stunden und mindestens ein Ziel auswählen.");

      return;
    }

    onSave({
      id: Date.now(),

      month,

      hours: Number(hours),

      goals: selectedGoals,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>Monat planen</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="month"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          />

          <input
            type="number"
            min="1"
            placeholder="Geplante Stunden"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
          />

          <div className="goal-selection">
            <h4>Ziele auswählen</h4>

            {goals.length === 0 ? (
              <p>Bitte zuerst Lernziele erstellen.</p>
            ) : (
              goals.map((goal) => (
                <label key={goal.id} className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={selectedGoals.includes(goal.title)}
                    onChange={() => handleGoalSelect(goal.title)}
                  />

                  {goal.title}
                </label>
              ))
            )}
          </div>

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

export default MonthPlanForm;