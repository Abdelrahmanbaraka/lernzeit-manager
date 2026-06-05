export function getMonthPlanTotalHours(plan) {
  const goalPlans = getMonthPlanGoalEntries(plan);

  if (
    Array.isArray(plan.goals) &&
    plan.goals.some(
      (goalEntry) =>
        typeof goalEntry === "object" &&
        Object.prototype.hasOwnProperty.call(goalEntry, "plannedHours")
    )
  ) {
    return goalPlans.reduce(
      (sum, goalPlan) => sum + Number(goalPlan.plannedHours || 0),
      0
    );
  }

  return Number(plan.hours || 0);
}

export function getMonthPlanGoalEntries(plan, goals = []) {
  if (!Array.isArray(plan.goals)) {
    return [];
  }

  return plan.goals.map((goalEntry) => normalizeGoalPlanEntry(goalEntry, goals));
}

export function getPlannedHoursForGoal(goal, monthPlans) {
  return monthPlans.reduce((sum, plan) => {
    const matchingGoalPlan = getMonthPlanGoalEntries(plan).find(
      (goalPlan) =>
        (goalPlan.goalId && goalPlan.goalId === goal.id) ||
        goalPlan.title === goal.title
    );

    if (!matchingGoalPlan) {
      return sum;
    }

    return sum + Number(matchingGoalPlan.plannedHours || 0);
  }, 0);
}

function normalizeGoalPlanEntry(goalEntry, goals) {
  if (typeof goalEntry === "string") {
    const matchingGoal = goals.find((goal) => goal.title === goalEntry);

    return {
      goalId: matchingGoal?.id || null,
      title: goalEntry,
      plannedHours: 0,
    };
  }

  const matchingGoal = goals.find(
    (goal) => goal.id === goalEntry.goalId || goal.title === goalEntry.title
  );

  return {
    goalId: goalEntry.goalId || matchingGoal?.id || null,
    title: matchingGoal?.title || goalEntry.title || "",
    plannedHours: Number(goalEntry.plannedHours || 0),
  };
}
