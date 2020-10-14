import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Stepper} from './Stepper';

const meta = {
  component: Stepper,
  title: 'Stepper',
  decorators: [
    withKnobs,
    themeWithKnobs('textFields'),
    (story: () => JSX.Element) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

const defaultProps = {
  label: 'Quantity',
};

export const defaultState = () => <Stepper {...defaultProps} />;

export const min = () => <Stepper {...defaultProps} min={3} />;

export const max = () => <Stepper {...defaultProps} max={5} />;

export const minAndMax = () => <Stepper {...defaultProps} min={1} max={5} />;

export const step = () => <Stepper {...defaultProps} step={0.5} />;

export const minMaxAndStep = () => (
  <Stepper {...defaultProps} step={2} min={0} max={5} />
);

export const error = () => <Stepper {...defaultProps} error="Limit reached" />;
