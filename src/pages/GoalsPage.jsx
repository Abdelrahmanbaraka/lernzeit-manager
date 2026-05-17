import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import GoalForm from "../components/goals/GoalForm";

import GoalItem from "../components/goals/GoalItem";

import {
  getGoals,
  saveGoals,
} from "../services/goalService";

function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editingGoal, setEditingGoal] =
    useState(null);

  useEffect(() => {
    const storedGoals = getGoals();

    setGoals(storedGoals);
  }, []);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  function handleAddGoal(goal) {
    if (editingGoal) {
      const updatedGoals = goals.map((g) =>
        g.id === goal.id ? goal : g
      );

      setGoals(updatedGoals);

      setEditingGoal(null);

      return;
    }

    setGoals([...goals, goal]);
  }

  function handleDeleteGoal(id) {
    const confirmed = window.confirm(
      "Ziel wirklich löschen?"
    );

    if (!confirmed) {
      return;
    }

    const filteredGoals = goals.filter(
      (goal) => goal.id !== id
    );

    setGoals(filteredGoals);
  }

  function handleToggleGoal(id) {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        return {
          ...goal,
          completed: !goal.completed,
        };
      }

      return goal;
    });

    setGoals(updatedGoals);
  }

  function handleEditGoal(goal) {
    setEditingGoal(goal);

    setShowModal(true);
  }

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Lernziele</h1>

          <button
            className="primary-btn"
            onClick={() => {
              setEditingGoal(null);

              setShowModal(true);
            }}
          >
            Ziel erstellen
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="empty-state">
            <p>
              Noch keine Lernziele vorhanden.
            </p>
          </div>
        ) : (
          <div className="goals-list">
            {goals.map((goal) => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onDelete={handleDeleteGoal}
                onToggle={handleToggleGoal}
                onEdit={handleEditGoal}
              />
            ))}
          </div>
        )}

        {showModal && (
          <GoalForm
            onSave={handleAddGoal}
            onClose={() =>
              setShowModal(false)
            }
            existingGoal={editingGoal}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default GoalsPage;