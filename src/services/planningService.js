import { STORAGE_KEYS } from "../utils/storageKeys";

import { getData, saveData } from "./storageService";

export function getMonthPlans() {
  return getData(STORAGE_KEYS.MONTH_PLANS);
}

export function saveMonthPlans(plans) {
  saveData(STORAGE_KEYS.MONTH_PLANS, plans);
}

export function getDailyPlans() {
  return getData(STORAGE_KEYS.DAILY_PLANS);
}

export function saveDailyPlans(plans) {
  saveData(STORAGE_KEYS.DAILY_PLANS, plans);
}

export function removeGoalFromPlans(goalTitle) {
  const monthPlans = getMonthPlans();

  const updatedMonthPlans = monthPlans
    .map((plan) => {
      return {
        ...plan,
        goals: plan.goals.filter((goal) => goal !== goalTitle),
      };
    })
    .filter((plan) => plan.goals.length > 0);

  saveMonthPlans(updatedMonthPlans);
}
