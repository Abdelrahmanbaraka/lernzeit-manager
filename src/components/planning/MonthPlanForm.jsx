import { useState } from "react";

function MonthPlanForm({
  goals,
  onSave,
  onClose,
}) {
  const [month, setMonth] = useState("");

  const [hours, setHours] = useState("");

  const [selectedGoals, setSelectedGoals] =
    useState([]);

  function handleGoalSelect(goalTitle) {
    if (selectedGoals.includes(goalTitle)) {
      setSelectedGoals(
        selectedGoals.filter(
          (goal) => goal !== goalTitle
        )
      );

      return;
    }

    if (selectedGoals.length >= 10) {
      alert("Maximal 10 Ziele.");

      return;
    }

    setSelectedGoals([
      ...selectedGoals,
      goalTitle,
    ]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      id: Date.now(),

      month,

      hours,

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
            onChange={(e) =>
              setMonth(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Geplante Stunden"
            value={hours}
            onChange={(e) =>
              setHours(e.target.value)
            }
          />

          <div className="goal-selection">
            <h4>Ziele auswählen</h4>

            {goals.map((goal) => (
              <label
                key={goal.id}
                className="checkbox-row"
              >
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(
                    goal.title
                  )}
                  onChange={() =>
                    handleGoalSelect(goal.title)
                  }
                />

                {goal.title}
              </label>
            ))}
          </div>

          <div className="modal-actions">
            <button type="submit">
              Speichern
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MonthPlanForm;