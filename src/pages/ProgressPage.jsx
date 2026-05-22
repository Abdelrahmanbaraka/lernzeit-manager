import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import MainLayout from "../components/layout/MainLayout";

import { getGoals } from "../services/goalService";

import { getLearningSessions } from "../services/sessionService";

import { getMonthPlans } from "../services/planningService";

function ProgressPage() {
  const [goals, setGoals] = useState([]);

  const [sessions, setSessions] = useState([]);

  const [monthPlans, setMonthPlans] = useState([]);

  useEffect(() => {
    setGoals(getGoals());

    setSessions(getLearningSessions());

    setMonthPlans(getMonthPlans());
  }, []);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const plannedHoursThisMonth = monthPlans
    .filter((plan) => plan.month === currentMonth)
    .reduce((sum, plan) => sum + Number(plan.hours || 0), 0);

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

  const hoursPerGoalData = goals
    .map((goal) => {
      const totalMinutes = sessions
        .filter((session) => session.goal === goal.title)
        .reduce((sum, session) => sum + session.durationMinutes, 0);

      return {
        name: goal.title,
        value: Number((totalMinutes / 60).toFixed(2)),
      };
    })
    .filter((item) => item.value > 0);

  const lastSixMonthsData = getLastSixMonthsData(sessions, monthPlans);

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Fortschritt</h1>
        </div>

        <div className="progress-grid">
          <div className="chart-card">
            <h2>Geplante Stunden vs. absolviert</h2>

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
            <h2>Investierte Stunden pro Ziel</h2>

            {hoursPerGoalData.length === 0 ? (
              <p>Noch keine Lernzeiten für Ziele vorhanden.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={hoursPerGoalData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {hoursPerGoalData.map((entry, index) => (
                      <Cell key={entry.name} fill={getChartColor(index)} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="chart-card chart-wide">
            <h2>Gelernte Stunden in den letzten 6 Monaten</h2>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={lastSixMonthsData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line type="monotone" dataKey="geplant" stroke="#00b0f0" />

                <Line type="monotone" dataKey="tatsächlich" stroke="#4caf50" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function getLastSixMonthsData(sessions, monthPlans) {
  const result = [];

  const today = new Date();

  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - index, 1);

    const monthKey = date.toISOString().slice(0, 7);

    const label = date.toLocaleDateString("de-DE", {
      month: "short",
      year: "2-digit",
    });

    const plannedHours = monthPlans
      .filter((plan) => plan.month === monthKey)
      .reduce((sum, plan) => sum + Number(plan.hours || 0), 0);

    const completedHours = sessions
      .filter((session) => session.date.startsWith(monthKey))
      .reduce((sum, session) => sum + session.durationMinutes / 60, 0);

    result.push({
      month: label,
      geplant: Number(plannedHours.toFixed(2)),
      tatsächlich: Number(completedHours.toFixed(2)),
    });
  }

  return result;
}

function getChartColor(index) {
  const colors = [
    "#00b0f0",
    "#4caf50",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
  ];

  return colors[index % colors.length];
}

export default ProgressPage;