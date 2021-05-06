import {Weekday, getWeeksForMonth, isSameDate, isToday} from './dates';

describe('getWeeksForMonth()', () => {
  it('starts the week on Sunday by default', () => {
    const weeks = getWeeksForMonth(1, 2018);
    weeks.map((week) => {
      const startDay = week[0];
      if (startDay !== undefined) {
        expect(startDay.getDay()).toBe(Weekday.Sunday);
      }
    });
  });

  it('always has 7 value for each weeks', () => {
    const weeks = getWeeksForMonth(6, 2018);
    weeks.map((week) => {
      expect(week).toHaveLength(7);
    });
  });

  it('sets values to undefined before first day of month', () => {
    const weeks = getWeeksForMonth(6, 2018, Weekday.Monday);
    expect(weeks[0][0]).toBeUndefined();
    expect(weeks[0][1]).toBeUndefined();
    expect(weeks[0][2]).toBeUndefined();
    expect(weeks[0][3]).toBeUndefined();
    expect(weeks[0][4]).toBeUndefined();
    expect(weeks[0][5]).toBeUndefined();
    expect(weeks[0][6]).not.toBeUndefined();
  });
});

describe('isSameDate', () => {
  it('returns true for dates with same day, month, and year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    expect(isSameDate(date1, date2)).toBe(true);

    date2.setHours(2);
    expect(isSameDate(date1, date2)).toBe(true);
  });

  it('returns false for dates with same day and month, but different year', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setFullYear(date1.getFullYear() + 1);
    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('returns false for dates with same day and year, but different month', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setMonth(date1.getMonth() + 1);
    expect(isSameDate(date1, date2)).toBe(false);
  });

  it('returns false for dates with same month and year, but different day', () => {
    const date1 = new Date('01 Jan 2018 00:00:00 GMT');
    const date2 = new Date(date1.getTime());
    date2.setDate(date1.getDate() + 1);
    expect(isSameDate(date1, date2)).toBe(false);
  });
});

describe('isToday', () => {
  it('returns true for dates with same day, month, and year as today', () => {
    const today = new Date();
    expect(isToday(today)).toBe(true);

    // Time is irrelevant
    const differentMinutes = new Date(today.getTime());
    differentMinutes.setMinutes(today.getMinutes() + 1);
    expect(isToday(differentMinutes)).toBe(true);

    const differentHours = new Date(today.getTime());

    const currentHours = today.getHours();
    differentHours.setHours(today.getHours() + (currentHours === 23 ? -1 : 1));
    expect(isToday(differentHours)).toBe(true);
  });

  it('returns false for dates with different day, month, or year from today', () => {
    const today = new Date();

    const differentDay = new Date(today.getTime());
    differentDay.setDate(today.getDate() + 1);
    expect(isToday(differentDay)).toBe(false);

    const differentMonth = new Date(today.getTime());
    differentMonth.setMonth(today.getMonth() + 1);
    expect(isToday(differentMonth)).toBe(false);

    const differentYear = new Date(today.getTime());
    differentYear.setFullYear(today.getFullYear() + 1);
    expect(isToday(differentYear)).toBe(false);
  });
});
