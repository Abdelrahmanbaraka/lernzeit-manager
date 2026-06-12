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
