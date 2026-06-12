import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import GoalForm from "../components/goals/GoalForm";

import GoalItem from "../components/goals/GoalItem";

import { getGoals, saveGoals } from "../services/goalService";

function GoalsPage() {
  const [goals, setGoals] = useState(() => getGoals());

  const [isLoaded] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingGoal, setEditingGoal] = useState(null);

  const [showCompletedGoals, setShowCompletedGoals] = useState(false);

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
    const confirmed = window.confirm("Ziel wirklich löschen?");

    if (!confirmed) {
      return;
    }

    const updatedGoals = goals.filter((goal) => goal.id !== id);

    setGoals(updatedGoals);
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

  function handleCloseModal() {
    setShowModal(false);

    setEditingGoal(null);
  }

  const activeGoals = goals.filter((goal) => !goal.completed);

  const completedGoals = goals.filter((goal) => goal.completed);

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
          <>
            <div className="goal-status-legend" aria-label="Legende Zielstatus">
              <span>
                <span aria-hidden="true">🟢</span> Erledigt
              </span>

              <span>
                <span aria-hidden="true">🟡</span> Offen
              </span>

              <span>
                <span aria-hidden="true">🔴</span> Überfällig
              </span>
            </div>

            <section className="goals-section">
              <h2>Aktive Lernziele</h2>

              {activeGoals.length === 0 ? (
                <p>Keine aktiven Lernziele vorhanden.</p>
              ) : (
                <div className="goals-list">
                  {activeGoals.map((goal) => (
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
            </section>

            <section className="goals-section">
              <div className="section-title-row">
                <h2>Erledigte Lernziele</h2>

                <button
                  className="primary-btn"
                  onClick={() => setShowCompletedGoals(!showCompletedGoals)}
                >
                  {showCompletedGoals
                    ? "Erledigte Ziele ausblenden"
                    : "Erledigte Ziele anzeigen"}
                </button>
              </div>

              {showCompletedGoals && (
                completedGoals.length === 0 ? (
                  <p>Noch keine erledigten Lernziele vorhanden.</p>
                ) : (
                  <div className="goals-list">
                    {completedGoals.map((goal) => (
                      <GoalItem
                        key={goal.id}
                        goal={goal}
                        onDelete={handleDeleteGoal}
                        onToggle={handleToggleGoal}
                        onEdit={handleEditGoal}
                      />
                    ))}
                  </div>
                )
              )}
            </section>
          </>
        )}

        {showModal && (
          <GoalForm
            onSave={handleSaveGoal}
            onClose={handleCloseModal}
            existingGoal={editingGoal}
            existingGoals={goals}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default GoalsPage;
