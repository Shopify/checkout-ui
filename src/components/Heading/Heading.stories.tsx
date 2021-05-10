import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Heading} from './Heading';

const meta = {
  component: Heading,
  title: 'checkout-web-ui/Heading',
  decorators: [
    withKnobs,
    themeWithKnobs('headingLevel1', 'headingLevel2', 'headingLevel3'),
  ],
};

const content = 'Contact information';

export default meta;

export const allSizes = () => (
  <>
    <Heading level={1}>{content}</Heading>
    <Heading level={2}>{content}</Heading>
    <Heading level={3}>{content}</Heading>
  </>
);

export const level1 = () => <Heading level={1}>{content}</Heading>;
export const level2 = () => <Heading level={2}>{content}</Heading>;
export const level3 = () => <Heading level={3}>{content}</Heading>;
