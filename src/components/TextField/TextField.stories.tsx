import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {TextField} from './TextField';

const meta = {
  component: TextField,
  title: 'TextField',
  decorators: [withKnobs, themeWithKnobs('textFields')],
};

export default meta;

const defaultProps = {
  id: 'field',
  label: 'Label',
};

export const defaultState = () => <TextField {...defaultProps} />;

export const inputTypeNumber = () => (
  <TextField {...defaultProps} type="number" />
);

export const inputTypeEmail = () => (
  <TextField {...defaultProps} type="email" />
);

export const inputTypeTelephone = () => (
  <TextField {...defaultProps} type="telephone" />
);

export const prefilledContent = () => (
  <TextField {...defaultProps} value="Shopifolk" />
);

export const errorState = () => (
  <TextField {...defaultProps} error="Enter a name" />
);

export const textarea = () => <TextField {...defaultProps} multiline />;

export const withTooltip = () => (
  <TextField
    {...defaultProps}
    tooltip={{
      label: 'More information',
      content: 'In case we need to contact you about your order',
    }}
  />
);

export const disabled = () => <TextField {...defaultProps} disabled />;

export const readonly = () => <TextField {...defaultProps} readonly />;
