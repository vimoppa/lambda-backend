export function getCurrentDate() {
  return new Date(Date.now());
}

/**
 * @dev https://www.30secondsofcode.org/js/s/first-last-date-of-month/#get-the-last-date-of-a-month
 */
export function getSpecificDayOfMonth(date = getCurrentDate(), day = 0, currentMonth = 1) {
  return new Date(date.getFullYear(), date.getMonth() + currentMonth, day);
}

export function lastDateOfMonth(date = getCurrentDate()) {
  return getSpecificDayOfMonth(date);
}

export function lastDateOfNextMonth(date = getCurrentDate()) {
  return getSpecificDayOfMonth(date, 0, 2);
}
