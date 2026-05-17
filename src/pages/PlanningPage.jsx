import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import MonthPlanForm from "../components/planning/MonthPlanForm";

import DailyPlanForm from "../components/planning/DailyPlanForm";

import CalendarGrid from "../components/planning/CalendarGrid";

import {
  getGoals,
} from "../services/goalService";

import {
  getMonthPlans,
  saveMonthPlans,
  getDailyPlans,
  saveDailyPlans,
} from "../services/planningService";

function PlanningPage() {
  const [goals, setGoals] = useState([]);

  const [monthPlans, setMonthPlans] =
    useState([]);

  const [dailyPlans, setDailyPlans] =
    useState([]);

  const [showMonthModal, setShowMonthModal] =
    useState(false);

  const [showDailyModal, setShowDailyModal] =
    useState(false);

  const [selectedDay, setSelectedDay] =
    useState(null);

  useEffect(() => {
    setGoals(getGoals());

    setMonthPlans(getMonthPlans());

    setDailyPlans(getDailyPlans());
  }, []);

  useEffect(() => {
    saveMonthPlans(monthPlans);
  }, [monthPlans]);

  useEffect(() => {
    saveDailyPlans(dailyPlans);
  }, [dailyPlans]);

  function handleMonthSave(plan) {
    setMonthPlans([...monthPlans, plan]);
  }

  function handleDailySave(plan) {
    setDailyPlans([...dailyPlans, plan]);
  }

  function handleDayClick(day) {
    setSelectedDay(day);

    setShowDailyModal(true);
  }

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Lernplan</h1>

          <button
            className="primary-btn"
            onClick={() =>
              setShowMonthModal(true)
            }
          >
            Monat planen
          </button>
        </div>

        <div className="planning-layout">
          <div className="calendar-section">
            <CalendarGrid
              dailyPlans={dailyPlans}
              onDayClick={handleDayClick}
            />
          </div>

          <div className="month-plan-section">
            <h2>Monatspläne</h2>

            {monthPlans.length === 0 ? (
              <p>
                Noch keine Monatsplanung.
              </p>
            ) : (
              monthPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="month-plan-card"
                >
                  <h3>{plan.month}</h3>

                  <p>
                    Stunden: {plan.hours}
                  </p>

                  <ul>
                    {plan.goals.map(
                      (goal, index) => (
                        <li key={index}>
                          {goal}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        {showMonthModal && (
          <MonthPlanForm
            goals={goals}
            onSave={handleMonthSave}
            onClose={() =>
              setShowMonthModal(false)
            }
          />
        )}

        {showDailyModal && (
          <DailyPlanForm
            goals={goals}
            selectedDate={selectedDay}
            onSave={handleDailySave}
            onClose={() =>
              setShowDailyModal(false)
            }
          />
        )}
      </div>
    </MainLayout>
  );
}

export default PlanningPage;