import { useState } from "react";

import {
  getAllowedMonthOptions,
  getMonthInputValue,
  isAllowedMonth,
} from "../../utils/dateUtils";

import {
  getMonthPlanGoalEntries,
  getMonthPlanTotalHours,
} from "../../utils/monthPlanUtils";

function MonthPlanForm({ goals, currentMonth, existingPlan, onSave, onClose }) {
  const allowedMonths = getAllowedMonthOptions();

  const currentMonthValue = getMonthInputValue(currentMonth);

  const initialMonth =
    existingPlan?.month ||
    (isAllowedMonth(currentMonthValue)
      ? currentMonthValue
      : allowedMonths[0]?.value || "");

  const [month, setMonth] = useState(initialMonth);

  const [selectedGoals, setSelectedGoals] = useState(() =>
    existingPlan ? getMonthPlanGoalEntries(existingPlan, goals) : []
  );

  function handleGoalSelect(goal) {
    if (selectedGoals.some((goalPlan) => goalPlan.goalId === goal.id)) {
      setSelectedGoals(
        selectedGoals.filter((goalPlan) => goalPlan.goalId !== goal.id)
      );

      return;
    }

    setSelectedGoals([
      ...selectedGoals,
      {
        goalId: goal.id,

        title: goal.title,

        plannedHours: "",
      },
    ]);
  }

  function handleGoalHoursChange(goalId, plannedHours) {
    setSelectedGoals(
      selectedGoals.map((goalPlan) => {
        if (goalPlan.goalId !== goalId) {
          return goalPlan;
        }

        return {
          ...goalPlan,

          plannedHours,
        };
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!month || selectedGoals.length === 0) {
      alert("Bitte Monat und mindestens ein Ziel auswählen.");

      return;
    }

    const hasInvalidHours = selectedGoals.some(
      (goalPlan) => Number(goalPlan.plannedHours) <= 0
    );

    if (hasInvalidHours) {
      alert("Bitte für jedes ausgewählte Ziel geplante Stunden eintragen.");

      return;
    }

    const plan = {
      id: existingPlan?.id || Date.now(),

      month,

      goals: selectedGoals.map((goalPlan) => ({
        goalId: goalPlan.goalId,

        title: goalPlan.title,

        plannedHours: Number(goalPlan.plannedHours),
      })),
    };

    onSave({
      ...plan,

      hours: getMonthPlanTotalHours(plan),
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal month-plan-modal">
        <h2>{existingPlan ? "Monatsplan bearbeiten" : "Monat planen"}</h2>

        <form className="month-plan-form" onSubmit={handleSubmit}>
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

          <div className="goal-selection">
            <h4>Ziele auswählen</h4>

            {goals.length === 0 ? (
              <p>Bitte zuerst Lernziele erstellen.</p>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="goal-hours-row">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={selectedGoals.some(
                        (goalPlan) => goalPlan.goalId === goal.id
                      )}
                      onChange={() => handleGoalSelect(goal)}
                    />

                    {goal.title}
                  </label>

                  {selectedGoals.some(
                    (goalPlan) => goalPlan.goalId === goal.id
                  ) && (
                    <label className="goal-hours-input-group">
                      <input
                        type="number"
                        min="0.25"
                        step="0.25"
                        placeholder="Stunden"
                        value={
                          selectedGoals.find(
                            (goalPlan) => goalPlan.goalId === goal.id
                          )?.plannedHours || ""
                        }
                        onChange={(event) =>
                          handleGoalHoursChange(goal.id, event.target.value)
                        }
                      />

                      <span>Stunden</span>
                    </label>
                  )}
                </div>
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
