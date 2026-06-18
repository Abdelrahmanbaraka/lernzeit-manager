import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  getMonthPlanTotalHours,
  getPlannedHoursForGoal,
  getPlannedHoursForMonth,
  getRemainingHoursToPlanForGoal,
} from "../src/utils/monthPlanUtils.js";

import {
  hasDuplicateGoalTitle,
  getTodayDateString,
  isDateInPast,
} from "../src/utils/validationUtils.js";

import {
  hasOverlappingLearningSession,
  isRunningStopwatchForSession,
} from "../src/utils/sessionUtils.js";

const files = {
  login: await readFile("src/pages/LoginPage.jsx", "utf8"),
  dashboard: await readFile("src/pages/DashboardPage.jsx", "utf8"),
  goalForm: await readFile("src/components/goals/GoalForm.jsx", "utf8"),
  monthPlanForm: await readFile("src/components/planning/MonthPlanForm.jsx", "utf8"),
  readme: await readFile("README.md", "utf8"),
};


assert.equal(
  files.login.includes("student / 1234") || files.login.includes("tutor / 1234"),
  false,
  "Startseite darf keine Demo-Zugangsdaten rendern."
);

assert.equal(
  files.login.includes("demo-users"),
  false,
  "Startseite darf keinen Demo-Account-Hinweis rendern."
);

assert.equal(
  files.monthPlanForm.includes("Maximal 10 Ziele") ||
    files.monthPlanForm.includes("selectedGoals.length >= 10"),
  false,
  "Monatsplanung darf nicht nach 10 Zielen blockieren."
);

assert.equal(
  files.dashboard.includes("Geplante Stunden"),
  false,
  "Dashboard darf keinen Geplante-Stunden-Counter rendern."
);

assert.equal(
  files.readme.includes("10-Ziele-Limit aus Anforderungen entfernt"),
  true,
  "Änderungsliste muss den entfernten 10-Ziele-Limit-Eintrag enthalten."
);

assert.equal(
  files.goalForm.includes("min={todayDate}"),
  true,
  "Fälligkeitsdatum muss das heutige Datum als min-Attribut verwenden."
);

assert.equal(
  files.goalForm.includes("Das Fälligkeitsdatum darf nicht in der Vergangenheit liegen."),
  true,
  "Fälligkeitsdatum braucht eine deutsche Validierungsmeldung."
);

assert.equal(
  files.goalForm.includes("dueDate !== existingGoal.dueDate"),
  true,
  "Bearbeitung bestehender alter Ziele darf unveränderte Altdaten nicht pauschal blockieren."
);

// Unit-/Logiktests
assert.equal(isDateInPast("2026-06-14", "2026-06-15"), true);
assert.equal(isDateInPast("2026-06-15", "2026-06-15"), false);
assert.equal(isDateInPast("2026-06-16", "2026-06-15"), false);
assert.match(getTodayDateString(), /^\d{4}-\d{2}-\d{2}$/);
assert.equal(
  hasDuplicateGoalTitle(" mathe ", [{ id: 1, title: "Mathe" }]),
  true
);
assert.equal(
  hasDuplicateGoalTitle("Deutsch", [{ id: 1, title: "Mathe" }]),
  false
);
assert.equal(
  hasOverlappingLearningSession(
    {
      id: 2,
      date: "2026-06-15",
      goal: "Mathe",
      startTime: "09:30",
      endTime: "10:30",
    },
    [
      {
        id: 1,
        date: "2026-06-15",
        goal: "Mathe",
        startTime: "09:00",
        endTime: "10:00",
      },
    ]
  ),
  true
);
assert.equal(
  isRunningStopwatchForSession(
    {
      goal: "Mathe",
      isRunning: true,
      startDate: "2026-06-15",
      startTime: "09:00",
    },
    {
      date: "2026-06-15",
      goal: "Mathe",
      startTime: "09:30",
      endTime: "10:30",
    },
    "10:00"
  ),
  true
);

const goals = Array.from({ length: 11 }, (_, index) => ({
  id: `goal-${index + 1}`,
  title: `Ziel ${index + 1}`,
}));

const monthPlan = {
  id: 1,
  month: "2026-06",
  goals: goals.map((goal) => ({
    goalId: goal.id,
    title: goal.title,
    plannedHours: 2,
  })),
};

const dailyPlans = [
  {
    id: 1,
    goal: "Ziel 1",
    date: "2026-06-16",
    startTime: "09:00",
    endTime: "10:00",
  },
  {
    id: 2,
    goal: "Ziel ohne Monatsplan",
    date: "2026-06-17",
    startTime: "10:00",
    endTime: "11:30",
  },
];

assert.equal(getMonthPlanTotalHours(monthPlan), 22);

// Integrationstests
assert.equal(getPlannedHoursForMonth([monthPlan], dailyPlans, "2026-06"), 23.5);
assert.equal(getPlannedHoursForGoal(goals[0], [monthPlan], dailyPlans), 2);
assert.equal(
  getPlannedHoursForGoal(
    { id: "fallback-goal", title: "Ziel ohne Monatsplan" },
    [monthPlan],
    dailyPlans
  ),
  1.5
);
assert.equal(
  getRemainingHoursToPlanForGoal(monthPlan.goals[0], dailyPlans, "2026-06"),
  1
);

const learnedHours = 1;
const plannedHours = getPlannedHoursForGoal(goals[0], [monthPlan], dailyPlans);
const progress = plannedHours > 0 ? Math.min((learnedHours / plannedHours) * 100, 100) : 0;

assert.equal(progress, 50);

// Regressionstests
assert.equal(files.login.includes("login-form"), true);
assert.equal(files.dashboard.includes("Heutige Lernzeit"), true);
assert.equal(files.goalForm.includes("hasDuplicateGoalTitle"), true);
assert.equal(files.monthPlanForm.includes("getMonthPlanTotalHours"), true);
assert.equal(files.readme.includes("Änderungsliste"), true);

