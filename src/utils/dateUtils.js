export function getMonthName(date) {
  return date.toLocaleDateString("de-DE", {
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

export function getNextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getPreviousMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}