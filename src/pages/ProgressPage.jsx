import { useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import MainLayout from "../components/layout/MainLayout";

import { getGoals } from "../services/goalService";

import { getLearningSessions } from "../services/sessionService";

import { getMonthPlans } from "../services/planningService";

import { formatDisplayDate } from "../utils/dateUtils";

import {
  getMonthPlanTotalHours,
  getPlannedHoursForGoal,
} from "../utils/monthPlanUtils";

function ProgressPage() {
  const [goals] = useState(() => getGoals());

  const [sessions] = useState(() => getLearningSessions());

  const [monthPlans] = useState(() => getMonthPlans());

  const currentMonth = new Date().toISOString().slice(0, 7);

  const plannedHoursThisMonth = monthPlans
    .filter((plan) => plan.month === currentMonth)
    .reduce((sum, plan) => sum + getMonthPlanTotalHours(plan), 0);

  const completedHoursThisMonth = sessions
    .filter((session) => session.date.startsWith(currentMonth))
    .reduce((sum, session) => sum + session.durationMinutes / 60, 0);

  const plannedVsCompletedData = [
    {
      name: "Dieser Monat",
      geplant: Number(plannedHoursThisMonth.toFixed(2)),
      absolviert: Number(completedHoursThisMonth.toFixed(2)),
    },
  ];

  const lastSixMonthsData = getLastSixMonthsData(sessions, monthPlans);

  const detailedGoalProgress = getDetailedGoalProgress(
    goals,
    sessions,
    monthPlans
  );

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Fortschritt</h1>
        </div>

        <div className="progress-grid">
          <div className="chart-card">
            <h2>Monatsvergleich</h2>

            <p className="progress-summary">
              Geplant: {Number(plannedHoursThisMonth.toFixed(2))} h | Gelernt:{" "}
              {Number(completedHoursThisMonth.toFixed(2))} h
            </p>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plannedVsCompletedData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="geplant" fill="#00b0f0" />

                <Bar dataKey="absolviert" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Letzte 6 Monate</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lastSixMonthsData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="geplant" fill="#00b0f0" />

                <Bar dataKey="gelernt" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card chart-wide">
            <h2>Fortschritt pro Lernziel</h2>

            {detailedGoalProgress.length === 0 ? (
              <p>Noch keine Lernziele vorhanden.</p>
            ) : (
              <div className="goal-progress-list">
                {detailedGoalProgress.map((goal) => (
                  <div key={goal.name} className="goal-progress-card">
                    <div className="goal-progress-header">
                      <div>
                        <h3>{goal.name}</h3>

                        <small>Fällig: {formatDisplayDate(goal.dueDate)}</small>
                      </div>

                      <span className={`status-pill ${goal.statusClass}`}>
                        {goal.status}
                      </span>
                    </div>

                    <p>
                      Geplant: {goal.geplant} h | Gelernt: {goal.tatsächlich} h
                      | Fortschritt: {goal.progress}%
                    </p>

                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>

                    {goal.geplant === 0 && (
                      <small className="helper-text">0 h geplant</small>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function getDetailedGoalProgress(goals, sessions, monthPlans) {
  return goals.map((goal) => {
    const learnedMinutes = sessions
      .filter((session) => session.goal === goal.title)
      .reduce((sum, session) => sum + session.durationMinutes, 0);

    const learnedHours = learnedMinutes / 60;

    const plannedHours = getPlannedHoursForGoal(goal, monthPlans);

    const progress =
      plannedHours > 0 ? Math.min((learnedHours / plannedHours) * 100, 100) : 0;

    return {
      name: goal.title,

      dueDate: goal.dueDate,

      geplant: Number(plannedHours.toFixed(2)),

      tatsächlich: Number(learnedHours.toFixed(2)),

      progress: Number(progress.toFixed(0)),

      status: getGoalStatus(goal),

      statusClass: getGoalStatusClass(goal),
    };
  });
}

function getGoalStatus(goal) {
  const today = new Date();

  const dueDate = new Date(goal.dueDate);

  if (goal.completed) {
    return "Erledigt";
  }

  if (dueDate < today) {
    return "Überfällig";
  }

  return "Offen";
}

function getGoalStatusClass(goal) {
  if (goal.completed) {
    return "status-completed";
  }

  if (new Date(goal.dueDate) < new Date()) {
    return "status-overdue";
  }

  return "status-open";
}

function getLastSixMonthsData(sessions, monthPlans) {
  const result = [];

  const today = new Date();

  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - index, 1);

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const label = date.toLocaleDateString("de-DE", {
      month: "short",
      year: "2-digit",
    });

    const plannedHours = monthPlans
      .filter((plan) => plan.month === monthKey)
      .reduce((sum, plan) => sum + getMonthPlanTotalHours(plan), 0);

    const learnedHours = sessions
      .filter((session) => session.date.startsWith(monthKey))
      .reduce((sum, session) => sum + session.durationMinutes / 60, 0);

    result.push({
      month: label,
      geplant: Number(plannedHours.toFixed(2)),
      gelernt: Number(learnedHours.toFixed(2)),
    });
  }

  return result;
}

export default ProgressPage;
