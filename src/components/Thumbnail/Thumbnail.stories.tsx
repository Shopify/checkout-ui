import React from 'react';

import {Thumbnail, Props} from './Thumbnail';

const meta = {
  component: Thumbnail,
  title: 'Thumbnail',
  decorators: [
    (story: () => JSX.Element) => <div style={{margin: '1em'}}>{story()}</div>,
  ],
};

export default meta;

const defaultProps: Props = {
  description: 'Placeholder image',
};

export const defaultThumbnail = () => <Thumbnail {...defaultProps} />;

export const thumbnailWithBadge = () => (
  <Thumbnail {...defaultProps} badge="1" />
);

export const thumbnailWithExpandedBadge = () => (
  <Thumbnail {...defaultProps} badge="100" />
);
