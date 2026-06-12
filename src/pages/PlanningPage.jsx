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
  formatGermanMonth,
  getMonthName,
  getMonthInputValue,
  getNextMonth,
  getPreviousMonth,
} from "../utils/dateUtils";

import {
  getMonthPlanGoalEntries,
  getMonthPlanTotalHours,
  getRemainingHoursToPlanForGoal,
} from "../utils/monthPlanUtils";

function PlanningPage() {
  const [goals] = useState(() => getGoals());

  const [monthPlans, setMonthPlans] = useState(() => getMonthPlans());

  const [dailyPlans, setDailyPlans] = useState(() => getDailyPlans());

  const [isLoaded] = useState(true);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [showMonthModal, setShowMonthModal] = useState(false);

  const [showDailyModal, setShowDailyModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [editingMonthPlan, setEditingMonthPlan] = useState(null);

  const [editingDailyPlan, setEditingDailyPlan] = useState(null);

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
    const updatedPlans = monthPlans.filter(
      (item) => item.id !== plan.id && item.month !== plan.month
    );

    setMonthPlans([...updatedPlans, plan]);
  }

  function handleDailySave(plan) {
    const updatedPlans = dailyPlans.filter((item) => item.id !== plan.id);

    setDailyPlans([...updatedPlans, plan]);
  }

  function handleDeleteMonthPlan(id) {
    const confirmed = window.confirm("Monatsplanung wirklich löschen?");

    if (!confirmed) {
      return;
    }

    setMonthPlans(monthPlans.filter((plan) => plan.id !== id));
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

    setEditingDailyPlan(null);

    setShowDailyModal(true);
  }

  function handleOpenDailyForm() {
    setSelectedDate(null);

    setEditingDailyPlan(null);

    setShowDailyModal(true);
  }

  function handleEditMonthPlan(plan) {
    setEditingMonthPlan(plan);

    setShowMonthModal(true);
  }

  function handleEditDailyPlan(plan) {
    setSelectedDate(plan.date);

    setEditingDailyPlan(plan);

    setShowDailyModal(true);
  }

  function handleCloseMonthModal() {
    setShowMonthModal(false);

    setEditingMonthPlan(null);
  }

  function handleCloseDailyModal() {
    setShowDailyModal(false);

    setSelectedDate(null);

    setEditingDailyPlan(null);
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

        <div className="planning-action-bar">
          <button
            className="primary-btn"
            onClick={() => {
              setEditingMonthPlan(null);

              setShowMonthModal(true);
            }}
          >
            Monat planen
          </button>

          <button className="primary-btn" onClick={handleOpenDailyForm}>
            Tagesplan erstellen
          </button>
        </div>

        <div className="planning-layout">
          <div className="calendar-section">
            <CalendarGrid
              currentMonth={currentMonth}
              dailyPlans={dailyPlans}
              onDayClick={handleDayClick}
              onDeletePlan={handleDeleteDailyPlan}
              onEditPlan={handleEditDailyPlan}
            />
          </div>

          <div className="month-plan-section">
            <h2>Monatsplan</h2>

            {currentMonthPlans.length === 0 ? (
              <p>Noch keine Monatsplanung für diesen Monat.</p>
            ) : (
              currentMonthPlans.map((plan) => (
                <div key={plan.id} className="month-plan-card">
                  <h3>{formatGermanMonth(plan.month)}</h3>

                  <p>Geplante Stunden: {getMonthPlanTotalHours(plan)}</p>

                  <ul>
                    {getMonthPlanGoalEntries(plan, goals).map(
                      (goalPlan, index) => {
                        const remainingHours = getRemainingHoursToPlanForGoal(
                          goalPlan,
                          dailyPlans,
                          plan.month
                        );

                        return (
                          <li key={goalPlan.goalId || goalPlan.title || index}>
                            <span>
                              {goalPlan.title}:{" "}
                              {Number(goalPlan.plannedHours || 0)} h
                            </span>

                            <span className="remaining-plan-counter">
                              Stunden noch zu verplanen:{" "}
                              {Number(remainingHours.toFixed(2))} h
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>

                  <div className="month-plan-actions">
                    <button onClick={() => handleEditMonthPlan(plan)}>
                      Bearbeiten
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteMonthPlan(plan.id)}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showMonthModal && (
          <MonthPlanForm
            goals={goals}
            currentMonth={currentMonth}
            existingPlan={editingMonthPlan}
            onSave={handleMonthSave}
            onClose={handleCloseMonthModal}
          />
        )}

        {showDailyModal && (
          <DailyPlanForm
            goals={goals}
            selectedDate={selectedDate}
            existingPlan={editingDailyPlan}
            existingPlans={dailyPlans}
            onSave={handleDailySave}
            onClose={handleCloseDailyModal}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default PlanningPage;
