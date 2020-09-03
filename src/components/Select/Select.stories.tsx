import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Select} from './Select';

const meta = {
  component: Select,
  title: 'Select',
  decorators: [withKnobs, themeWithKnobs('select')],
};

export default meta;

const defaultProps = {
  label: 'Country',
  options: [
    {
      value: 'CA',
      label: 'Canada',
    },
    {
      value: 'US',
      label: 'United States',
    },
    {
      value: 'UK',
      label: 'United Kingdom',
    },
  ],
};

export const defaultState = () => <Select {...defaultProps} />;

export const preselectedValue = () => <Select {...defaultProps} value="UK" />;

export const disabled = () => <Select {...defaultProps} disabled />;

export const readonly = () => <Select {...defaultProps} readonly />;

export const withError = () => (
  <Select {...defaultProps} error="Select a country" />
);
