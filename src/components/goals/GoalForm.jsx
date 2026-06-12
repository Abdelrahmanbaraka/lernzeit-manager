import { useState } from "react";

import { hasDuplicateGoalTitle } from "../../utils/validationUtils";

function GoalForm({
  onSave,
  onClose,
  existingGoal,
  existingGoals = [],
}) {
  const [title, setTitle] = useState(
    existingGoal?.title || ""
  );

  const [description, setDescription] = useState(
    existingGoal?.description || ""
  );

  const [dueDate, setDueDate] = useState(
    existingGoal?.dueDate || ""
  );

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || !dueDate) {
      alert("Bitte alle Felder ausfüllen.");

      return;
    }

    if (
      hasDuplicateGoalTitle(trimmedTitle, existingGoals, existingGoal?.id || null)
    ) {
      alert(
        "Dieser Zielname wird bereits verwendet. Bitte wähle einen eindeutigen Namen."
      );

      return;
    }

    onSave({
      id: existingGoal?.id || Date.now(),

      title: trimmedTitle,

      description: description.trim(),

      dueDate,

      completed:
        existingGoal?.completed || false,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>
          {existingGoal
            ? "Ziel bearbeiten"
            : "Neues Ziel"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Beschreibung"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <label className="form-field">
            <span>Fälligkeitsdatum</span>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

            <small className="helper-text">
              Bis zu diesem Datum soll das Lernziel erledigt sein.
            </small>
          </label>

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

export default GoalForm;
