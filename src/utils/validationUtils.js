export function normalizeGoalTitle(title) {
  return title.trim().toLocaleLowerCase("de-DE");
}

export function hasDuplicateGoalTitle(title, goals, currentGoalId = null) {
  const normalizedTitle = normalizeGoalTitle(title);

  if (!normalizedTitle) {
    return false;
  }

  return goals.some((goal) => {
    if (goal.id === currentGoalId) {
      return false;
    }

    return normalizeGoalTitle(goal.title || "") === normalizedTitle;
  });
}

export function getTodayDateString() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isDateInPast(dateValue, todayValue = getTodayDateString()) {
  if (!dateValue) {
    return false;
  }

  return dateValue < todayValue;
}
