import { FaCog, FaTrash } from "react-icons/fa";

import { formatDisplayDate } from "../../utils/dateUtils";

function GoalItem({
  goal,
  onDelete,
  onToggle,
  onEdit,
}) {
  const isOverdue =
    new Date(goal.dueDate) < new Date() &&
    !goal.completed;

  function getStatusEmoji() {
    if (goal.completed) {
      return "🟢";
    }

    if (isOverdue) {
      return "🔴";
    }

    return "🟡";
  }

  return (
    <div className="goal-item">
      <div className="goal-left">
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={() => onToggle(goal.id)}
        />

        <div>
          <h3>{goal.title}</h3>

          <p>{goal.description}</p>

          <small>
            Fällig: {formatDisplayDate(goal.dueDate)}
          </small>
        </div>
      </div>

      <div className="goal-right">
        <span className="goal-emoji">
          {getStatusEmoji()}
        </span>

        <button
          className="icon-btn"
          onClick={() => onEdit(goal)}
        >
          <FaCog />
        </button>

        <button
          className="icon-btn delete-icon"
          onClick={() => onDelete(goal.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default GoalItem;
