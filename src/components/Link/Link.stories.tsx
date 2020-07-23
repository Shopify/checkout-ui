import React from 'react';

import {Link, Props} from './Link';

const meta = {
  component: Link,
  title: 'Link',
};

export default meta;

const defaultProps: Props = {
  to: 'https://shopify.com',
};

export const internalLink = () => (
  <Link {...defaultProps} external={false}>
    Internal link
  </Link>
);

export const externalLink = () => (
  <Link {...defaultProps} external>
    External link
  </Link>
);

export const linkWithoutUrl = () => (
  <Link to={undefined}>Link without Url</Link>
);
