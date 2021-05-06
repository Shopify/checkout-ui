export type Year = number;

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export enum Weekday {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export type Week = (Date | undefined)[];

export const WEEK_LENGTH = 7;
export const WEEK_START_DAYS = new Map([
  // Saturday
  ['AE', Weekday.Saturday],
  ['AF', Weekday.Saturday],
  ['BH', Weekday.Saturday],
  ['DZ', Weekday.Saturday],
  ['EG', Weekday.Saturday],
  ['IQ', Weekday.Saturday],
  ['IR', Weekday.Saturday],
  ['JO', Weekday.Saturday],
  ['KW', Weekday.Saturday],
  ['LY', Weekday.Saturday],
  ['OM', Weekday.Saturday],
  ['QA', Weekday.Saturday],
  ['SA', Weekday.Saturday],
  ['SY', Weekday.Saturday],
  ['YE', Weekday.Saturday],
  // Sunday
  ['AR', Weekday.Sunday],
  ['BO', Weekday.Sunday],
  ['BR', Weekday.Sunday],
  ['BZ', Weekday.Sunday],
  ['CA', Weekday.Sunday],
  ['CL', Weekday.Sunday],
  ['CO', Weekday.Sunday],
  ['CR', Weekday.Sunday],
  ['DO', Weekday.Sunday],
  ['EC', Weekday.Sunday],
  ['GT', Weekday.Sunday],
  ['HK', Weekday.Sunday],
  ['HN', Weekday.Sunday],
  ['IL', Weekday.Sunday],
  ['JM', Weekday.Sunday],
  ['JP', Weekday.Sunday],
  ['KE', Weekday.Sunday],
  ['KR', Weekday.Sunday],
  ['MO', Weekday.Sunday],
  ['MX', Weekday.Sunday],
  ['NI', Weekday.Sunday],
  ['PA', Weekday.Sunday],
  ['PE', Weekday.Sunday],
  ['PH', Weekday.Sunday],
  ['SG', Weekday.Sunday],
  ['SV', Weekday.Sunday],
  ['TW', Weekday.Sunday],
  ['US', Weekday.Sunday],
  ['VE', Weekday.Sunday],
  ['ZA', Weekday.Sunday],
  ['ZW', Weekday.Sunday],
  // Monday
  ['AD', Weekday.Monday],
  ['AL', Weekday.Monday],
  ['AM', Weekday.Monday],
  ['AU', Weekday.Monday],
  ['AZ', Weekday.Monday],
  ['BE', Weekday.Monday],
  ['BG', Weekday.Monday],
  ['BN', Weekday.Monday],
  ['BY', Weekday.Monday],
  ['CH', Weekday.Monday],
  ['CN', Weekday.Monday],
  ['CZ', Weekday.Monday],
  ['DE', Weekday.Monday],
  ['DK', Weekday.Monday],
  ['EE', Weekday.Monday],
  ['ES', Weekday.Monday],
  ['FI', Weekday.Monday],
  ['FR', Weekday.Monday],
  ['GB', Weekday.Monday],
  ['GE', Weekday.Monday],
  ['GF', Weekday.Monday],
  ['GR', Weekday.Monday],
  ['HR', Weekday.Monday],
  ['HU', Weekday.Monday],
  ['ID', Weekday.Monday],
  ['IE', Weekday.Monday],
  ['IN', Weekday.Monday],
  ['IS', Weekday.Monday],
  ['IT', Weekday.Monday],
  ['KG', Weekday.Monday],
  ['KZ', Weekday.Monday],
  ['LB', Weekday.Monday],
  ['LT', Weekday.Monday],
  ['LU', Weekday.Monday],
  ['LV', Weekday.Monday],
  ['MA', Weekday.Monday],
  ['MC', Weekday.Monday],
  ['MK', Weekday.Monday],
  ['MN', Weekday.Monday],
  ['MY', Weekday.Monday],
  ['NL', Weekday.Monday],
  ['NO', Weekday.Monday],
  ['NZ', Weekday.Monday],
  ['PK', Weekday.Monday],
  ['PL', Weekday.Monday],
  ['PT', Weekday.Monday],
  ['PY', Weekday.Monday],
  ['RO', Weekday.Monday],
  ['RS', Weekday.Monday],
  ['RU', Weekday.Monday],
  ['SE', Weekday.Monday],
  ['SK', Weekday.Monday],
  ['TH', Weekday.Monday],
  ['TN', Weekday.Monday],
  ['TR', Weekday.Monday],
  ['UA', Weekday.Monday],
  ['UY', Weekday.Monday],
  ['UZ', Weekday.Monday],
  ['VN', Weekday.Monday],
  ['XK', Weekday.Monday],
]);

export const ORDERED_WEEKDAYS = new Map([
  [0, [0, 1, 2, 3, 4, 5, 6]],
  [1, [1, 2, 3, 4, 5, 6, 0]],
  [6, [6, 0, 1, 2, 3, 4, 5]],
]);

export const DEFAULT_WEEK_START_DAY = Weekday.Sunday;
export const DEFAULT_ORDERED_WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export function getWeekStartDay(countryCode?: string) {
  if (!countryCode) {
    return DEFAULT_WEEK_START_DAY;
  }

  return (
    WEEK_START_DAYS.get(countryCode.toUpperCase()) || DEFAULT_WEEK_START_DAY
  );
}

export function getOrderedWeekdays(weekStartsOn: number) {
  return ORDERED_WEEKDAYS.get(weekStartsOn) ?? DEFAULT_ORDERED_WEEKDAYS;
}

export function getWeeksForMonth(
  month: number,
  year: number,
  weekStartsOn = DEFAULT_WEEK_START_DAY,
): Week[] {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks: Week[] = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  const orderedWeekday = getOrderedWeekdays(weekStartsOn);
  for (let i = 0; i < orderedWeekday.indexOf(firstDayOfWeek); i++) {
    currentWeek.push(undefined);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }

  while (currentWeek.length < 7) {
    currentWeek.push(undefined);
  }

  return weeks;
}

export function isSameDate(day1: Date, day2: Date) {
  return (
    day1.getDate() === day2.getDate() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getFullYear() === day2.getFullYear()
  );
}

export function isToday(date: Date) {
  const today = new Date();
  return isSameDate(today, date);
}

export function getNextDisplayMonth(month: number): number {
  if (month === 11) {
    return 0;
  }
  return month + 1;
}

export function getNextDisplayYear(month: number, year: number): number {
  if (month === 11) {
    return year + 1;
  }
  return year;
}

export function getPreviousDisplayMonth(month: number): number {
  if (month === 0) {
    return 11;
  }
  return month - 1;
}

export function getPreviousDisplayYear(month: number, year: number): number {
  if (month === 0) {
    return year - 1;
  }
  return year;
}
