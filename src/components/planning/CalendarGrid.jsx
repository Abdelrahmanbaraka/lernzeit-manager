import {
  formatDateKey,
  getDaysInMonth,
  isAllowedDailyPlanDate,
} from "../../utils/dateUtils";

function CalendarGrid({
  currentMonth,
  dailyPlans,
  onDayClick,
  onDeletePlan,
  onEditPlan,
}) {
  const year = currentMonth.getFullYear();

  const month = currentMonth.getMonth();

  const daysInMonth = getDaysInMonth(currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className="calendar-grid">
      {days.map((day) => {
        const dateKey = formatDateKey(year, month, day);

        const currentPlans = dailyPlans.filter((plan) => plan.date === dateKey);

        const canCreatePlan = isAllowedDailyPlanDate(dateKey);

        return (
          <div key={dateKey} className="calendar-day">
            <div className="calendar-day-top">
              <span>{day}</span>

              <button
                disabled={!canCreatePlan}
                className={!canCreatePlan ? "disabled-day-action" : ""}
                onClick={() => onDayClick(dateKey)}
              >
                +
              </button>
            </div>

            <div className="calendar-plans">
              {currentPlans.map((plan) => (
                <div key={plan.id} className="calendar-plan-item">
                  <div className="calendar-plan-content">
                    <small>
                      {plan.startTime} - {plan.endTime}
                    </small>

                    <p>{plan.goal}</p>
                  </div>

                  <div className="calendar-plan-actions">
                    <button
                      className="calendar-plan-edit"
                      onClick={() => onEditPlan(plan)}
                    >
                      Bearbeiten
                    </button>

                    <button
                      className="calendar-plan-delete"
                      onClick={() => onDeletePlan(plan.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;
