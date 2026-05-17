import { useState } from "react";

function DailyPlanForm({
  goals,
  selectedDate,
  onSave,
  onClose,
}) {
  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [goal, setGoal] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

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

        <form onSubmit={handleSubmit}>
          <input
            type="time"
            value={startTime}
            onChange={(e) =>
              setStartTime(e.target.value)
            }
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) =>
              setEndTime(e.target.value)
            }
          />

          <select
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
          >
            <option value="">
              Ziel auswählen
            </option>

            {goals.map((goal) => (
              <option
                key={goal.id}
                value={goal.title}
              >
                {goal.title}
              </option>
            ))}
          </select>

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

export default DailyPlanForm;