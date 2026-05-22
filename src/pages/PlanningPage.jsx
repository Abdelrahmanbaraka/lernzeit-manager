import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";

import MonthPlanForm from "../components/planning/MonthPlanForm";

import DailyPlanForm from "../components/planning/DailyPlanForm";

import CalendarGrid from "../components/planning/CalendarGrid";

import { getGoals } from "../services/goalService";

import {
  getMonthPlans,
  saveMonthPlans,
  getDailyPlans,
  saveDailyPlans,
} from "../services/planningService";

import {
  getMonthName,
  getMonthInputValue,
  getNextMonth,
  getPreviousMonth,
} from "../utils/dateUtils";

function PlanningPage() {
  const [goals, setGoals] = useState([]);

  const [monthPlans, setMonthPlans] = useState([]);

  const [dailyPlans, setDailyPlans] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [showMonthModal, setShowMonthModal] = useState(false);

  const [showDailyModal, setShowDailyModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setGoals(getGoals());

    setMonthPlans(getMonthPlans());

    setDailyPlans(getDailyPlans());

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveMonthPlans(monthPlans);
    }
  }, [monthPlans, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveDailyPlans(dailyPlans);
    }
  }, [dailyPlans, isLoaded]);

  function handleMonthSave(plan) {
    const updatedPlans = monthPlans.filter((item) => item.month !== plan.month);

    setMonthPlans([...updatedPlans, plan]);
  }

  function handleDailySave(plan) {
    setDailyPlans([...dailyPlans, plan]);
  }

  function handleDeleteDailyPlan(id) {
    const confirmed = window.confirm("Tagesplanung wirklich löschen?");

    if (!confirmed) {
      return;
    }

    const updatedDailyPlans = dailyPlans.filter((plan) => plan.id !== id);

    setDailyPlans(updatedDailyPlans);
  }

  function handleDayClick(dateKey) {
    setSelectedDate(dateKey);

    setShowDailyModal(true);
  }

  const selectedMonthValue = getMonthInputValue(currentMonth);

  const currentMonthPlans = monthPlans.filter(
    (plan) => plan.month === selectedMonthValue
  );

  return (
    <MainLayout>
      <div className="page-container">
        <div className="page-header">
          <h1>Lernplan</h1>

          <button className="primary-btn" onClick={() => setShowMonthModal(true)}>
            Monat planen
          </button>
        </div>

        <div className="month-navigation">
          <button onClick={() => setCurrentMonth(getPreviousMonth(currentMonth))}>
            ←
          </button>

          <h2>{getMonthName(currentMonth)}</h2>

          <button onClick={() => setCurrentMonth(getNextMonth(currentMonth))}>
            →
          </button>
        </div>

        <div className="planning-layout">
          <div className="calendar-section">
            <CalendarGrid
              currentMonth={currentMonth}
              dailyPlans={dailyPlans}
              onDayClick={handleDayClick}
              onDeletePlan={handleDeleteDailyPlan}
            />
          </div>

          <div className="month-plan-section">
            <h2>Monatsplan</h2>

            {currentMonthPlans.length === 0 ? (
              <p>Noch keine Monatsplanung für diesen Monat.</p>
            ) : (
              currentMonthPlans.map((plan) => (
                <div key={plan.id} className="month-plan-card">
                  <h3>{plan.month}</h3>

                  <p>Geplante Stunden: {plan.hours}</p>

                  <ul>
                    {plan.goals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        {showMonthModal && (
          <MonthPlanForm
            goals={goals}
            currentMonth={currentMonth}
            onSave={handleMonthSave}
            onClose={() => setShowMonthModal(false)}
          />
        )}

        {showDailyModal && (
          <DailyPlanForm
            goals={goals}
            selectedDate={selectedDate}
            onSave={handleDailySave}
            onClose={() => setShowDailyModal(false)}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default PlanningPage;