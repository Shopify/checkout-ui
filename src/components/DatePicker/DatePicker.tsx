import React, {memo, useMemo, useCallback} from 'react';
import {classNames} from '@shopify/css-utilities';

import {useTranslate, useGeolocation, TranslationKey} from '../AppContext';
import {
  Year,
  Month,
  Weekday,
  getOrderedWeekdays,
  getWeeksForMonth,
  getNextDisplayYear,
  getNextDisplayMonth,
  getPreviousDisplayYear,
  getPreviousDisplayMonth,
  getWeekStartDay,
  isToday,
} from '../../utilities/dates';
import {Text} from '../Text';
import {Icon} from '../Icon';

import styles from './DatePicker.css';

/* Simplified ISO format (ISO 8601) */
export type ISODate = string;

export interface Range {
  /** First day (inclusive) of the selected range */
  start?: ISODate;
  /** Last day (inclusive) of the selected range */
  end?: ISODate;
}

export type DisabledDate = ISODate | Range | Weekday[];

export interface Props<T extends ISODate | ISODate[] | Range> {
  /** Month to display */
  month: Month;
  /** Year to display */
  year: Year;
  /** Disabled date or dates */
  disabled?: DisabledDate[];
  /**
   * A date, an array of dates, or a range object with `start` and/or `to` keys indicating the selected dates.
   * When a range is provided, dates between the boundaries will be highlighted.
   */
  selected?: T;
  /**
   * A callback that is run whenever a date is selected or unselected. This callback
   * is called with a string, an array of strings or a range object representing the selected dates.
   * This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
   * so you **must** store these values in state and reflect it back in the
   * `selected` props.
   */
  onChange?(selected: T): void;
  /**
   * A callback that is run whenever the month is changed. This callback
   * is called with `month` and `year` values indicating the month the UI should change to.
   * This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
   * so you **must** store these values in state and reflect it back in the
   * `month` and `year` props.
   */
  onMonthChange?(month: Month, year: Year): void;
}

export function DatePicker<T extends ISODate[] | ISODate | Range>({
  month,
  year,
  onMonthChange,
}: Props<T>) {
  const translate = useTranslate();
  const geolocation = useGeolocation();

  const weekStartDay = useMemo(
    () => getWeekStartDay(geolocation?.countryCode),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [geolocation],
  );

  const now = new Date();
  const currentMonth = now.getMonth() === month && now.getFullYear() === year;

  const weekdaysMarkup = getOrderedWeekdays(weekStartDay).map((weekday) => {
    return (
      <WeekdayUI
        key={weekday}
        day={Weekday[weekday]}
        current={currentMonth && new Date().getDay() === weekday}
      />
    );
  });

  const weeks = useMemo(() => getWeeksForMonth(month, year, weekStartDay), [
    month,
    year,
    weekStartDay,
  ]);

  const weeksMarkup = weeks.map((week) => {
    const index = week.map((date) => date?.getDate()).join('');

    return (
      <tr className={styles.Week} key={index}>
        {week.map((date?: Date) => (
          <Day date={date} key={date?.getDate()} />
        ))}
      </tr>
    );
  });

  const previousYear = getPreviousDisplayYear(month, year);
  const previousMonth = getPreviousDisplayMonth(month);
  const showPreviousMonthLabel = translate('showPreviousMonth', {
    month: translate(Month[previousMonth].toLowerCase() as TranslationKey),
    year: `${previousYear}`,
  });

  const nextYear = getNextDisplayYear(month, year);
  const nextMonth = getNextDisplayMonth(month);
  const showNextMonthLabel = translate('showNextMonth', {
    month: translate(Month[nextMonth].toLowerCase() as TranslationKey),
    year: `${nextYear}`,
  });

  const handleMonthChange = useCallback(
    (month: Month, year: Year) => {
      if (!onMonthChange) {
        return;
      }
      onMonthChange(month, year);
    },
    [onMonthChange],
  );

  const monthLabelClassName = classNames(
    styles.MonthLabel,
    currentMonth && styles['MonthLabel-current'],
  );

  return (
    <div className={styles.DatePicker}>
      {onMonthChange && (
        <div className={styles.Controls}>
          <button
            type="button"
            onClick={() => handleMonthChange(previousMonth, previousYear)}
            className={styles.ControlsPrevious}
            aria-label={showPreviousMonthLabel}
          >
            <Icon source="arrowLeft" size="default" />
          </button>
          <button
            type="button"
            onClick={() => handleMonthChange(nextMonth, nextYear)}
            className={styles.ControlsNext}
            aria-label={showNextMonthLabel}
          >
            <Icon source="arrowRight" size="default" />
          </button>
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <table role="grid" className={styles.Month}>
        <caption className={monthLabelClassName} aria-live="polite">
          {translate(Month[month].toLowerCase() as TranslationKey)} {year}
        </caption>
        <thead>
          <tr className={styles.WeekDays}>{weekdaysMarkup}</tr>
        </thead>
        <tbody>{weeksMarkup}</tbody>
      </table>
    </div>
  );
}

interface WeekdayProps {
  day: string;
  current?: boolean;
}

const WeekdayUI = memo(function Weekday({day, current}: WeekdayProps) {
  const translate = useTranslate();

  const className = classNames(styles.Weekday);

  return (
    <th scope="col" className={className}>
      <Text
        role={{
          type: 'abbreviation',
          for: translate(day.toLowerCase() as TranslationKey),
        }}
        subdued={!current}
        emphasized={current}
        size="small"
      >
        {translate(`${day.toLowerCase()}Abbreviation` as TranslationKey)}
      </Text>
    </th>
  );
});

interface DayProps {
  date?: Date;
  disabled?: boolean;
  selected?: boolean;
  inRange?: boolean;
}

function Day({date, disabled, selected, inRange}: DayProps) {
  if (!date) {
    return <td />;
  }

  const label = date.getDate();
  const today = isToday(date);

  const className = classNames(
    styles.Day,
    today && styles['Day-today'],
    disabled && styles['Day-disabled'],
    selected && styles['Day-selected'],
    inRange && styles['Day-inRange'],
  );

  return (
    <td className={styles.DayCell}>
      {disabled ? (
        <span className={className}>{label}</span>
      ) : (
        <button type="button" tabIndex={-1} className={className}>
          {label}
        </button>
      )}
    </td>
  );
}
