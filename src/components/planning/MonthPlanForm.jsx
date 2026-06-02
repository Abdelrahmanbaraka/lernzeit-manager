import { useState } from "react";

import {
  getAllowedMonthOptions,
  getMonthInputValue,
  isAllowedMonth,
} from "../../utils/dateUtils";

function MonthPlanForm({ goals, currentMonth, existingPlan, onSave, onClose }) {
  const allowedMonths = getAllowedMonthOptions();

  const currentMonthValue = getMonthInputValue(currentMonth);

  const initialMonth =
    existingPlan?.month ||
    (isAllowedMonth(currentMonthValue)
      ? currentMonthValue
      : allowedMonths[0]?.value || "");

  const [month, setMonth] = useState(initialMonth);

  const [hours, setHours] = useState(existingPlan?.hours || "");

  const [selectedGoals, setSelectedGoals] = useState(existingPlan?.goals || []);

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
      id: existingPlan?.id || Date.now(),

      month,

      hours: Number(hours),

      goals: selectedGoals,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>{existingPlan ? "Monatsplan bearbeiten" : "Monat planen"}</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
            {allowedMonths.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

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
