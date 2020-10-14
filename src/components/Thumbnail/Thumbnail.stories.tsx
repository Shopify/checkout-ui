import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Thumbnail, Props} from './Thumbnail';

const meta = {
  component: Thumbnail,
  title: 'Thumbnail',
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
  <Thumbnail {...defaultProps} source="http://placekitten.com/g/100/100" />
);

export const withBadge = () => <Thumbnail {...defaultProps} badge={1} />;

export const withExpandedBadge = () => (
  <Thumbnail {...defaultProps} badge="New" />
);
