import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {TextBlock} from '../TextBlock';

import {Link, Props} from './Link';

const meta = {
  component: Link,
  title: 'checkout-web-ui/Link',
  decorators: [withKnobs, themeWithKnobs('link')],
};

export default meta;

export const LinkComponent = (args: Props) => (
  <TextBlock>
    Learn more about our <Link {...args}>shipping policies</Link>
  </TextBlock>
);

LinkComponent.args = {
  to: 'https://shopify.com',
  external: false,
  underline: false,
  appearance: undefined,
};

LinkComponent.argTypes = {
  appearance: {
    control: {
      type: 'select',
      options: [undefined, 'inheritColor'],
    },
  },
};

export const all = () => (
  <>
    <Link to="https://shopify.com" external={false}>
      Internal link
    </Link>
    <br />
    <Link to="https://shopify.com" external>
      External link
    </Link>
    <br />
    <Link to="https://shopify.com" underline>
      Underline link
    </Link>
    <br />
    <Link to={undefined}>Link without `to` (rendered as a Button)</Link>
    <br />
    <TextBlock>
      Learn more about our{' '}
      <Link to="https://shopify.com" appearance="inheritColor">
        shipping policies
      </Link>{' '}
      (`inheritColor`)
    </TextBlock>
    <br />
    <Link to="https://shopify.com" accessibilityLabel="Visit shopify.com">
      Visit (with accessible label)
    </Link>
  </>
);
