import { formatDateKey, getDaysInMonth } from "../../utils/dateUtils";

function CalendarGrid({ currentMonth, dailyPlans, onDayClick }) {
  const year = currentMonth.getFullYear();

  const month = currentMonth.getMonth();

  const daysInMonth = getDaysInMonth(currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className="calendar-grid">
      {days.map((day) => {
        const dateKey = formatDateKey(year, month, day);

        const currentPlans = dailyPlans.filter((plan) => plan.date === dateKey);

        return (
          <div key={dateKey} className="calendar-day">
            <div className="calendar-day-top">
              <span>{day}</span>

              <button onClick={() => onDayClick(dateKey)}>+</button>
            </div>

            <div className="calendar-plans">
              {currentPlans.map((plan) => (
                <div key={plan.id} className="calendar-plan-item">
                  <small>
                    {plan.startTime} - {plan.endTime}
                  </small>

                  <p>{plan.goal}</p>
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