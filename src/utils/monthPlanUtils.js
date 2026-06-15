import { calculateMinutesBetween } from "./timerUtils.js";

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

export function getPlannedHoursForGoal(goal, monthPlans, dailyPlans = []) {
  const monthKeys = new Set([
    ...monthPlans.map((plan) => plan.month).filter(Boolean),
    ...dailyPlans
      .filter((plan) => plan.goal === goal.title && plan.date)
      .map((plan) => plan.date.slice(0, 7)),
  ]);

  return Array.from(monthKeys).reduce(
    (sum, monthKey) =>
      sum + getPlannedHoursForGoalInMonth(goal, monthPlans, dailyPlans, monthKey),
    0
  );
}

export function getPlannedHoursForMonth(monthPlans, dailyPlans, monthKey) {
  const monthPlansForMonth = monthPlans.filter((plan) => plan.month === monthKey);

  const monthlyHours = monthPlansForMonth.reduce(
    (sum, plan) => sum + getMonthPlanTotalHours(plan),
    0
  );

  const monthlyGoalTitles = new Set(
    monthPlansForMonth.flatMap((plan) =>
      getMonthPlanGoalEntries(plan)
        .map((goalPlan) => goalPlan.title)
        .filter(Boolean)
    )
  );

  const uncoveredDailyHours = dailyPlans
    .filter((plan) => plan.date?.startsWith(monthKey))
    .filter((plan) => !monthlyGoalTitles.has(plan.goal))
    .reduce((sum, plan) => sum + getDailyPlanHours(plan), 0);

  return monthlyHours + uncoveredDailyHours;
}

export function getPlannedHoursForGoalInMonth(
  goal,
  monthPlans,
  dailyPlans,
  monthKey
) {
  const monthlyPlanHours = getMonthlyPlanHoursForGoal(goal, monthPlans, monthKey);

  if (monthlyPlanHours.hasMonthlyPlan) {
    return monthlyPlanHours.hours;
  }

  return getDetailedPlanHoursForGoalInMonth(goal, dailyPlans, monthKey);
}

export function getDistributedDailyHoursForGoalInMonth(
  goalPlan,
  dailyPlans,
  monthKey
) {
  return getDetailedPlanHoursForGoalInMonth(goalPlan, dailyPlans, monthKey);
}

export function getRemainingHoursToPlanForGoal(goalPlan, dailyPlans, monthKey) {
  const plannedHours = Number(goalPlan.plannedHours || 0);

  const distributedHours = getDistributedDailyHoursForGoalInMonth(
    goalPlan,
    dailyPlans,
    monthKey
  );

  return Math.max(plannedHours - distributedHours, 0);
}

function getMonthlyPlanHoursForGoal(goal, monthPlans, monthKey) {
  return monthPlans
    .filter((plan) => plan.month === monthKey)
    .reduce(
      (result, plan) => {
        const matchingGoalPlan = getMonthPlanGoalEntries(plan).find(
          (goalPlan) =>
            (goalPlan.goalId && goalPlan.goalId === goal.id) ||
            goalPlan.title === goal.title
        );

        if (!matchingGoalPlan) {
          return result;
        }

        if (!hasGoalLevelPlannedHours(plan)) {
          return result;
        }

        return {
          hasMonthlyPlan: true,
          hours: result.hours + Number(matchingGoalPlan.plannedHours || 0),
        };
      },
      { hasMonthlyPlan: false, hours: 0 }
    );
}

function getDetailedPlanHoursForGoalInMonth(goal, dailyPlans, monthKey) {
  return dailyPlans
    .filter((plan) => plan.goal === goal.title)
    .filter((plan) => plan.date?.startsWith(monthKey))
    .reduce((sum, plan) => sum + getDailyPlanHours(plan), 0);
}

function getDailyPlanHours(plan) {
  return calculateMinutesBetween(plan.startTime, plan.endTime) / 60;
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

function hasGoalLevelPlannedHours(plan) {
  return (
    Array.isArray(plan.goals) &&
    plan.goals.some(
      (goalEntry) =>
        typeof goalEntry === "object" &&
        Object.prototype.hasOwnProperty.call(goalEntry, "plannedHours")
    )
  );
}
