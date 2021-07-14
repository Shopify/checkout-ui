import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {AVAILABLE_ICONS} from '../Icon';
import {themeWithKnobs} from '../../storybook-utilities';

import {Tag, Props} from './Tag';

const meta = {
  component: Tag,
  title: 'checkout-web-ui/Tag',
  decorators: [withKnobs, themeWithKnobs('tag')],
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: [undefined, ...AVAILABLE_ICONS],
      },
    },
  },
};

export default meta;

const Content = () => <Text emphasized>Hello, world</Text>;

export const TagStory = (props: Props) => (
  <InlineStack>
    {Array(3)
      .fill('Hello, world')
      .map((text, i) => (
        <Tag {...props} key={text}>
          <Text emphasized>
            {text} {i + 1}!
          </Text>
        </Tag>
      ))}
  </InlineStack>
);

TagStory.args = {
  onRemove: 'javascript:;',
  removeControlAccessibilityLabel: 'Remove tag',
  icon: undefined,
};

TagStory.story = {
  name: 'Tag',
};

export const RemovableTags = () => (
  <InlineStack>
    <Tag removeControlAccessibilityLabel="Remove tag" onRemove={() => {}}>
      <Content />
    </Tag>
    <Tag
      icon="discount"
      removeControlAccessibilityLabel="Remove tag"
      onRemove={() => {}}
    >
      <Content />
    </Tag>
  </InlineStack>
);
