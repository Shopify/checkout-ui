import React, {useState, useCallback} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {DatePicker} from './DatePicker';

const meta = {
  component: DatePicker,
  title: 'checkout-web-ui/DatePicker',
  decorators: [withKnobs],
};

export default meta;

export const defaultState = () => <DatePickerStory />;

const DatePickerStory = () => {
  const today = new Date();

  const [{month, year}, setDate] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker month={month} year={year} onMonthChange={handleMonthChange} />
  );
};
