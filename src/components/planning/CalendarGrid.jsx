function CalendarGrid({
  dailyPlans,
  onDayClick,
}) {
  const days = Array.from(
    { length: 30 },
    (_, index) => index + 1
  );

  return (
    <div className="calendar-grid">
      {days.map((day) => {
        const currentPlans =
          dailyPlans.filter(
            (plan) =>
              Number(plan.date) === day
          );

        return (
          <div
            key={day}
            className="calendar-day"
          >
            <div className="calendar-day-top">
              <span>{day}</span>

              <button
                onClick={() =>
                  onDayClick(day)
                }
              >
                +
              </button>
            </div>

            <div className="calendar-plans">
              {currentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="calendar-plan-item"
                >
                  <small>
                    {plan.startTime} -{" "}
                    {plan.endTime}
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