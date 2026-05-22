import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import GoalForm from "../components/goals/GoalForm";

import GoalItem from "../components/goals/GoalItem";

import { getGoals, saveGoals } from "../services/goalService";

import { removeGoalFromPlans } from "../services/planningService";

function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    const storedGoals = getGoals();

    setGoals(storedGoals);

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveGoals(goals);
    }
  }, [goals, isLoaded]);

  function handleSaveGoal(goal) {
    if (editingGoal) {
      const updatedGoals = goals.map((existingGoal) =>
        existingGoal.id === goal.id ? goal : existingGoal
      );

      setGoals(updatedGoals);

      setEditingGoal(null);

      return;
    }

    setGoals([...goals, goal]);
  }

  function handleDeleteGoal(id) {
    const goalToDelete = goals.find((goal) => goal.id === id);

    const confirmed = window.confirm("Ziel wirklich löschen?");

    if (!confirmed) {
      return;
    }

    if (goalToDelete) {
      removeGoalFromPlans(goalToDelete.title);
    }

    const updatedGoals = goals.filter((goal) => goal.id !== id);

    setGoals(updatedGoals);
  }

  function handleToggleGoal(id) {
    const goalToUpdate = goals.find((goal) => goal.id === id);

    if (!goalToUpdate) {
      return;
    }

    const willBeCompleted = !goalToUpdate.completed;

    if (willBeCompleted) {
      removeGoalFromPlans(goalToUpdate.title);
    }

    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        return {
          ...goal,
          completed: willBeCompleted,
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

  function handleCloseModal() {
    setShowModal(false);

    setEditingGoal(null);
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
            <p>Noch keine Lernziele vorhanden.</p>
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
            onSave={handleSaveGoal}
            onClose={handleCloseModal}
            existingGoal={editingGoal}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default GoalsPage;