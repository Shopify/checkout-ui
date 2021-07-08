import React from 'react';
import {Story} from '@storybook/preact/types-6-0';
import {ImageProps} from '@shopify/checkout-ui-extensions';

import {faker} from '../../test-utilities';
import {TextContainer} from '../TextContainer';
import {View} from '../View';

import {Image} from './Image';

const meta = {
  component: Image,
  title: 'checkout-web-ui/Image',
  argTypes: {
    source: {
      name: 'source',
      type: {name: 'string', required: true},
      defaultValue: 'https://via.placeholder.com/320x180/eee',
      control: {
        type: 'text',
      },
    },
    description: {
      name: 'description',
      type: {name: 'string', required: false},
      defaultValue: 'placeholder.com',
      control: {
        type: 'text',
      },
    },
    loading: {
      name: 'loading',
      control: {
        type: 'select',
        options: ['eager', 'lazy'],
        required: false,
      },
    },
    fit: {
      name: 'fit',
      control: {
        type: 'select',
        options: ['cover', 'contain'],
        required: false,
      },
    },
  },
};

export default meta;

const Template: Story<ImageProps> = (args: ImageProps) => <Image {...args} />;

export const basicImage = Template.bind({});

export const lazyLoading = Template.bind({});
lazyLoading.args = {
  loading: 'lazy',
};

export const cover = Template.bind({});
cover.args = {
  sources: {
    base: [
      {source: 'https://via.placeholder.com/320x180/eee', resolution: 1},
      {source: 'https://via.placeholder.com/640x360/eee', resolution: 2},
    ],
  },
  aspectRatio: 1,
  fit: 'cover',
};
cover.decorators = [
  (Story: Function) => (
    <View maxInlineSize={256} border="base">
      <Story />
    </View>
  ),
];

export const contain = Template.bind({});
contain.args = {
  sources: {
    base: [
      {source: 'https://via.placeholder.com/320x180/eee', resolution: 1},
      {source: 'https://via.placeholder.com/640x360/eee', resolution: 2},
    ],
  },
  aspectRatio: 1,
  fit: 'contain',
};
contain.decorators = [
  (Story: Function) => (
    <View maxInlineSize={256} border="base">
      <Story />
    </View>
  ),
];

export const responsive = Template.bind({});
responsive.args = {
  sources: {
    small: [
      {
        source: 'https://via.placeholder.com/320x180/eee',
        resolution: 1,
      },
      {
        source: 'https://via.placeholder.com/640x360/eee',
        resolution: 2,
      },
    ],
    medium: [
      {
        source: 'https://via.placeholder.com/640x360/eee',
        resolution: 1,
      },
      {
        source: 'https://via.placeholder.com/1280x720/eee',
        resolution: 2,
      },
    ],
    large: [
      {
        source: 'https://via.placeholder.com/1280x720/eee',
        resolution: 1,
      },
      {
        source: 'https://via.placeholder.com/2560x1440/eee',
        resolution: 2,
      },
    ],
  },
};

export const aspectRatio = (args: ImageProps) => (
  <div style={{width: 320}}>
    <TextContainer>
      <Image {...args} />
      <p>{faker.lorem.paragraphs(3)}</p>
    </TextContainer>
  </div>
);
aspectRatio.args = {
  source: 'https://via.placeholder.com/640x360',
  aspectRatio: 3,
};
