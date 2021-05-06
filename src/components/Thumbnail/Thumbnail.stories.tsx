import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Thumbnail, Props} from './Thumbnail';

const meta = {
  component: Thumbnail,
  title: 'checkout-web-ui/Thumbnail',
  decorators: [
    withKnobs,
    themeWithKnobs('thumbnail'),
    (story: () => JSX.Element) => <div style={{margin: '1em'}}>{story()}</div>,
  ],
};

export default meta;

const defaultProps: Props = {
  description: 'Placeholder image',
};

export const defaultState = () => <Thumbnail {...defaultProps} />;

export const withSource = () => (
  <Thumbnail {...defaultProps} source="https://via.placeholder.com/64x64/eee" />
);

export const withBadge = () => <Thumbnail {...defaultProps} badge={1} />;

export const withExpandedBadge = () => (
  <Thumbnail {...defaultProps} badge="New" />
);

export const smallThumbnailWithBadge = () => (
  <Thumbnail {...defaultProps} badge={1} size="small" />
);
