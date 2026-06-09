export function getMonthName(date) {
  return date.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });
}

export function formatGermanMonth(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);

  return new Date(year, month - 1, 1).toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });
}

export function getDaysInMonth(date) {
  const year = date.getFullYear();

  const month = date.getMonth();

  return new Date(year, month + 1, 0).getDate();
}

export function formatDateKey(year, month, day) {
  const formattedMonth = String(month + 1).padStart(2, "0");

  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function getMonthInputValue(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function getAllowedMonthOptions() {
  const today = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() + index, 1);

    const value = getMonthInputValue(date);

    return {
      value,
      label: formatGermanMonth(value),
    };
  });
}

export function isAllowedMonth(monthKey) {
  return getAllowedMonthOptions().some((option) => option.value === monthKey);
}

export function addDays(date, days) {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
}

export function formatDateFromDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateKey) {
  if (!dateKey) {
    return "";
  }

  const [year, month, day] = dateKey.split("-");

  if (!year || !month || !day) {
    return dateKey;
  }

  return `${day}.${month}.${year}`;
}

export function isDateBeforeToday(dateKey) {
  if (!dateKey) {
    return false;
  }

  return dateKey < formatDateFromDate(new Date());
}

export function getGoalStatus(goal) {
  if (goal.completed) {
    return "Erledigt";
  }

  if (isDateBeforeToday(goal.dueDate)) {
    return "Überfällig";
  }

  return "Offen";
}

export function getGoalStatusClass(goal) {
  if (goal.completed) {
    return "status-completed";
  }

  if (isDateBeforeToday(goal.dueDate)) {
    return "status-overdue";
  }

  return "status-open";
}

export function getDailyPlanDateRange() {
  const today = new Date();

  return {
    min: formatDateFromDate(today),
    max: formatDateFromDate(addDays(today, 30)),
  };
}

export function isAllowedDailyPlanDate(dateKey) {
  const { min, max } = getDailyPlanDateRange();

  return dateKey >= min && dateKey <= max;
}

export function isStartTimeInPast(dateKey, startTime) {
  if (!dateKey || !startTime) {
    return false;
  }

  const now = new Date();

  const today = formatDateFromDate(now);

  if (dateKey < today) {
    return true;
  }

  if (dateKey > today) {
    return false;
  }

  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  return startTime < currentTime;
}

export function getNextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getPreviousMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}
