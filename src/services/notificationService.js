import { STORAGE_KEYS } from "../utils/storageKeys";

import { getDailyPlans } from "./planningService";

import { getLearningSessions } from "./sessionService";

import { getActiveStopwatch } from "./stopwatchService";

import {
  getStoredValue,
  saveStoredValue,
} from "./storageService";

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

export async function checkMissedPlannedSessions() {
  if (!("Notification" in window)) {
    console.warn("Browser notifications are not supported.");

    return;
  }

  const dailyPlans = getDailyPlans();

  const sessions = getLearningSessions();

  const activeStopwatch = getActiveStopwatch();

  const notifiedPlanIds = getStoredValue(STORAGE_KEYS.NOTIFIED_PLANS, []);

  const now = Date.now();

  const dueNotifications = dailyPlans.flatMap((plan) => {
    if (!plan.date || !plan.startTime || !plan.goal) {
      return [];
    }

    if (!plan.id || notifiedPlanIds.includes(plan.id)) {
      return [];
    }

    const startTimestamp = new Date(`${plan.date}T${plan.startTime}`).getTime();

    if (Number.isNaN(startTimestamp)) {
      return [];
    }

    const hasSessionForGoal = sessions.some(
      (session) => session.date === plan.date && session.goal === plan.goal
    );

    const hasActiveStopwatchForGoal = isActiveStopwatchForPlan(
      activeStopwatch,
      plan
    );

    const reminderId = `${plan.id}:before`;

    const missedId = `${plan.id}:missed`;

    const notifications = [];

    if (
      now >= startTimestamp - FIFTEEN_MINUTES_MS &&
      now < startTimestamp &&
      !notifiedPlanIds.includes(reminderId)
    ) {
      notifications.push({
        notificationId: reminderId,
        body: `Deine geplante Lernsession für "${plan.goal}" startet in 15 Minuten.`,
      });
    }

    if (
      now >= startTimestamp + FIFTEEN_MINUTES_MS &&
      !hasSessionForGoal &&
      !hasActiveStopwatchForGoal &&
      !notifiedPlanIds.includes(missedId)
    ) {
      notifications.push({
        notificationId: missedId,
        body: `Du hast eine geplante Lernsession für "${plan.goal}" verpasst.`,
      });
    }

    return notifications;
  });

  if (dueNotifications.length === 0) {
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission !== "granted") {
    return;
  }

  dueNotifications.forEach((notification) => {
    new Notification("Lernzeit-Erinnerung", {
      body: notification.body,
    });
  });

  saveStoredValue(STORAGE_KEYS.NOTIFIED_PLANS, [
    ...notifiedPlanIds,
    ...dueNotifications.map((notification) => notification.notificationId),
  ]);
}

export function markPlanNotificationStateValid() {
  const dailyPlans = getDailyPlans();

  const dailyPlanNotificationIds = dailyPlans.flatMap((plan) => [
    plan.id,
    `${plan.id}:before`,
    `${plan.id}:missed`,
  ]);

  const notifiedPlanIds = getStoredValue(STORAGE_KEYS.NOTIFIED_PLANS, []);

  saveStoredValue(
    STORAGE_KEYS.NOTIFIED_PLANS,
    notifiedPlanIds.filter((id) => dailyPlanNotificationIds.includes(id))
  );
}

function isActiveStopwatchForPlan(activeStopwatch, plan) {
  if (!activeStopwatch?.isRunning || activeStopwatch.goal !== plan.goal) {
    return false;
  }

  const stopwatchDate =
    activeStopwatch.startDate ||
    formatDateFromTimestamp(activeStopwatch.startTimestamp);

  return stopwatchDate === plan.date;
}

function formatDateFromTimestamp(timestamp) {
  if (!timestamp) {
    return null;
  }

  const date = new Date(Number(timestamp));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
