import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Tooltip} from './Tooltip';

const meta = {
  component: Tooltip,
  title: 'checkout-web-ui/Tooltip',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {story()}
      </div>
    ),
    withKnobs,
    themeWithKnobs('tooltip'),
  ],
};

export default meta;

export const defaultState = () => {
  return (
    <Tooltip content="In case we need to contact you about your order">
      <p>Tooltip control</p>
    </Tooltip>
  );
};
