import { useState } from "react";

function GoalForm({
  onSave,
  onClose,
  existingGoal,
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

    if (!title || !description || !dueDate) {
      alert("Bitte alle Felder ausfüllen.");

      return;
    }

    onSave({
      id: existingGoal?.id || Date.now(),

      title,

      description,

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

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

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