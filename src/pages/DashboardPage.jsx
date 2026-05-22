import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Stopwatch from "../components/timer/Stopwatch";

import { getCurrentUser } from "../services/authService";

import { getGoals } from "../services/goalService";

import { getLearningSessions } from "../services/sessionService";

import { getMonthPlans } from "../services/planningService";

import { getTodayDate } from "../utils/timerUtils";

function DashboardPage() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [goals, setGoals] = useState([]);

  const [sessions, setSessions] = useState([]);

  const [monthPlans, setMonthPlans] = useState([]);

  useEffect(() => {
    setGoals(getGoals());

    setSessions(getLearningSessions());

    setMonthPlans(getMonthPlans());
  }, []);

  function handleSessionSaved(updatedSessions) {
    setSessions(updatedSessions);
  }

  const today = getTodayDate();

  const todayLearningMinutes = sessions
    .filter((session) => session.date === today)
    .reduce((sum, session) => sum + session.durationMinutes, 0);

  const activeGoals = goals.filter((goal) => !goal.completed).length;

  const completedGoals = goals.filter((goal) => goal.completed).length;

  const plannedHours = monthPlans.reduce((sum, plan) => {
    return sum + Number(plan.hours || 0);
  }, 0);

  const todayHours = Math.floor(todayLearningMinutes / 60);

  const todayMinutes = todayLearningMinutes % 60;

  return (
    <MainLayout>
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Willkommen, {user?.username}</h1>

          <p>Verfolge deine Lernzeiten und Ziele.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Heutige Lernzeit</h3>

            <p className="card-value">
              {String(todayHours).padStart(2, "0")}:
              {String(todayMinutes).padStart(2, "0")} h
            </p>
          </div>

          <div className="dashboard-card">
            <h3>Aktive Ziele</h3>

            <p className="card-value">{activeGoals}</p>
          </div>

          <div className="dashboard-card">
            <h3>Geplante Stunden</h3>

            <p className="card-value">{plannedHours} h</p>
          </div>

          <div className="dashboard-card">
            <h3>Erledigte Ziele</h3>

            <p className="card-value">{completedGoals}</p>
          </div>
        </div>

        <div className="dashboard-two-columns">
          <Stopwatch onSessionSaved={handleSessionSaved} />

          <div className="dashboard-section">
            <h2>Schnellzugriff</h2>

            <div className="quick-actions vertical">
              <button onClick={() => navigate("/learning-time")}>
                Lernzeiten öffnen
              </button>

              <button onClick={() => navigate("/goals")}>Ziele öffnen</button>

              <button onClick={() => navigate("/planning")}>
                Planung öffnen
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;