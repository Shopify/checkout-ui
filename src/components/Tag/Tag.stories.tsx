import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {themeWithKnobs} from '../../storybook-utilities';

import {Tag} from './Tag';

const meta = {
  component: Tag,
  title: 'Tag',
  decorators: [withKnobs, themeWithKnobs('tag')],
};

export default meta;

export const tags = () => (
  <InlineStack>
    <Tag>
      <Text emphasized>Hello, world!</Text>
    </Tag>
    <Tag>
      <Text emphasized>Hello, world!</Text>
    </Tag>
    <Tag>
      <Text emphasized>Hello, world!</Text>
    </Tag>
  </InlineStack>
);
