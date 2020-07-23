import React from 'react';

import {Text} from '../Text';
import {Heading} from '../Heading';
import {themeWithKnobs} from '../../storybook-utilities';

import {CalloutHeader} from './CalloutHeader';

const meta = {
  component: CalloutHeader,
  title: 'CalloutHeader',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          margin: '1em 0 0 7em',
        }}
      >
        {story()}
      </div>
    ),
    themeWithKnobs('headingLevel2'),
  ],
};

export default meta;

export const successState = () => (
  <CalloutHeader status="success">
    <Text subdued>Order #1234</Text>
    <Heading>Thank you!</Heading>
  </CalloutHeader>
);

export const warningState = () => (
  <CalloutHeader status="warning">
    <Heading>Inventory issues</Heading>
    <Text subdued>
      Some products became unavailable and your cart has been updated.
    </Text>
  </CalloutHeader>
);
