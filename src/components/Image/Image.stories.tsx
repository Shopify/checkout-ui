import React from 'react';
import {Story} from '@storybook/preact/types-6-0';
import {ImageProps} from '@shopify/argo-checkout';

import {faker} from '../../test-utilities';
import {TextContainer} from '../TextContainer';

import {Image} from './Image';

const meta = {
  component: Image,
  title: 'checkout-web-ui/Image',
  argTypes: {
    loading: {
      control: {
        type: 'select',
        options: ['eager', 'lazy'],
        required: false,
      },
    },
    fit: {
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
basicImage.args = {
  source: 'https://via.placeholder.com/320x180/eee',
  description: 'placeholder.com',
  loading: undefined,
  fit: undefined,
};

export const lazyLoading = Template.bind({});
lazyLoading.args = {
  ...basicImage.args,
  loading: 'lazy',
};

export const cover = Template.bind({});
cover.args = {
  ...basicImage.args,
  sources: [
    {source: 'https://via.placeholder.com/320x180/eee', resolution: 1},
    {source: 'https://via.placeholder.com/640x360/eee', resolution: 2},
  ],
  aspectRatio: 1,
  fit: 'cover',
  bordered: true,
};
cover.decorators = [
  (Story: Function) => (
    <div style={{width: 256}}>
      <Story />
    </div>
  ),
];

export const contain = Template.bind({});
contain.args = {
  ...basicImage.args,
  sources: [
    {source: 'https://via.placeholder.com/320x180/eee', resolution: 1},
    {source: 'https://via.placeholder.com/640x360/eee', resolution: 2},
  ],
  aspectRatio: 1,
  fit: 'contain',
  bordered: true,
};
contain.decorators = [
  (Story: Function) => (
    <div style={{width: 256}}>
      <Story />
    </div>
  ),
];

export const responsive = Template.bind({});
responsive.args = {
  ...basicImage.args,
  sources: [
    {
      source: 'https://via.placeholder.com/320x180/eee',
      resolution: 1,
      viewportSize: 'small',
    },
    {
      source: 'https://via.placeholder.com/640x360/eee',
      resolution: 2,
      viewportSize: 'small',
    },
    {
      source: 'https://via.placeholder.com/640x360/eee',
      resolution: 1,
      viewportSize: 'medium',
    },
    {
      source: 'https://via.placeholder.com/1280x720/eee',
      resolution: 2,
      viewportSize: 'medium',
    },
    {
      source: 'https://via.placeholder.com/1280x720/eee',
      resolution: 1,
      viewportSize: 'large',
    },
    {
      source: 'https://via.placeholder.com/2560x1440/eee',
      resolution: 2,
      viewportSize: 'large',
    },
  ],
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
  ...basicImage,
  source: 'https://via.placeholder.com/640x360',
  aspectRatio: 3,
};
