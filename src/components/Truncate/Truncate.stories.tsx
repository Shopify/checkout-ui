import React from 'react';

import {faker} from '../../test-utilities';
import {Text} from '../Text';

import {Truncate} from './Truncate';

const meta = {
  component: Truncate,
  title: 'checkout-web-ui/Truncate',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          width: 200,
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

export const defaultState = () => (
  <Text>
    <Truncate>{faker.lorem.words(5)}</Truncate>
  </Text>
);
