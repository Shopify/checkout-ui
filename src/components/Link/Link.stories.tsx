import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {Link, Props} from './Link';

const meta = {
  component: Link,
  title: 'Link',
  decorators: [withKnobs, themeWithKnobs('primaryButton')],
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
  <Link underline to={undefined}>
    Link without Url
  </Link>
);

export const underline = () => (
  <>
    <Link {...defaultProps} underline>
      Just a link
    </Link>
    <br />
    <Link underline>Link without Url (rendered as a Button)</Link>
  </>
);
