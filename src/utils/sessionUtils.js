import { doTimeRangesOverlap } from "./timerUtils";

export function hasOverlappingLearningSession(newSession, sessions) {
  if (
    !newSession.date ||
    !newSession.goal ||
    !newSession.startTime ||
    !newSession.endTime
  ) {
    return false;
  }

  return sessions.some((session) => {
    if (
      session.id === newSession.id ||
      session.date !== newSession.date ||
      session.goal !== newSession.goal ||
      !session.startTime ||
      !session.endTime
    ) {
      return false;
    }

    return doTimeRangesOverlap(
      newSession.startTime,
      newSession.endTime,
      session.startTime,
      session.endTime
    );
  });
}

export function isRunningStopwatchForSession(
  activeStopwatch,
  session,
  currentTime
) {
  if (!activeStopwatch?.isRunning || activeStopwatch.goal !== session.goal) {
    return false;
  }

  const stopwatchDate =
    activeStopwatch.startDate ||
    formatDateFromTimestamp(activeStopwatch.startTimestamp);

  if (stopwatchDate !== session.date) {
    return false;
  }

  if (!activeStopwatch.startTime || !session.startTime || !session.endTime) {
    return true;
  }

  return doTimeRangesOverlap(
    session.startTime,
    session.endTime,
    activeStopwatch.startTime,
    currentTime
  );
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
