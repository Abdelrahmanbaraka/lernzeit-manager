export function formatSecondsToHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

export function formatMinutesToHHMM(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export function calculateMinutesBetween(startTime, endTime) {
  if (!startTime || !endTime) {
    return 0;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);

  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;

  const endTotalMinutes = endHour * 60 + endMinute;

  const difference = endTotalMinutes - startTotalMinutes;

  return difference > 0 ? difference : 0;
}

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}