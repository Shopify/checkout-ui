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
  source:
    '//cdn.shopify.com/s/assets/checkout/product-blank-98d4187c2152136e9fb0587a99dfcce6f6873f3a9f21ea9135ed7f495296090f.png',
  description: 'Placeholder image',
};

export const defaultThumbnail = () => <Thumbnail {...defaultProps} />;

export const thumbnailWithBadge = () => (
  <Thumbnail {...defaultProps} badge="1" />
);

export const thumbnailWithExpandedBadge = () => (
  <Thumbnail {...defaultProps} badge="100" />
);
