import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {ReviewItem, ReviewBlock} from './ReviewItem';

const meta = {
  component: ReviewItem,
  title: 'ReviewItem',
  decorators: [withKnobs, themeWithKnobs('reviewBlock')],
};

export default meta;

export const defaultState = () => (
  <ReviewItem label="Contact">snowdevil@shopify.com</ReviewItem>
);

export const withLink = () => (
  <ReviewItem label="Contact" to="/shipping" linkLabel="Change">
    snowdevil@shopify.com
  </ReviewItem>
);

export const withAriaLabelForLink = () => (
  <ReviewItem
    label="Contact"
    to="/shipping"
    linkLabel="Change"
    linkAriaLabel="Change contact information"
  >
    snowdevil@shopify.com
  </ReviewItem>
);

export const reviewBlock = () => (
  <ReviewBlock title="Review">
    <ReviewItem
      label="Contact"
      to="/information"
      linkLabel="Change"
      linkAriaLabel="Change contact information"
    >
      snowdevil@shopify.com
    </ReviewItem>
    <ReviewItem
      label="Ship to"
      to="/information"
      linkLabel="Change"
      linkAriaLabel="Change shipping address"
    >
      490 Rue de la Gauchetière O, Montréal, QC H2Z 0B3
    </ReviewItem>
    <ReviewItem
      label="Method"
      to="/shipping"
      linkLabel="Change"
      linkAriaLabel="Change shipping method"
    >
      Standard - <strong>$14.90</strong>
    </ReviewItem>
  </ReviewBlock>
);

export const reviewBlockWithHiddenTitle = () => (
  <ReviewBlock title="Review your information" titleHidden>
    <ReviewItem
      label="Contact"
      to="/information"
      linkLabel="Change"
      linkAriaLabel="Change contact information"
    >
      snowdevil@shopify.com
    </ReviewItem>
    <ReviewItem
      label="Ship to"
      to="/information"
      linkLabel="Change"
      linkAriaLabel="Change shipping address"
    >
      490 Rue de la Gauchetière O, Montréal, QC H2Z 0B3
    </ReviewItem>
    <ReviewItem
      label="Method"
      to="/shipping"
      linkLabel="Change"
      linkAriaLabel="Change shipping method"
    >
      Standard - <strong>$14.90</strong>
    </ReviewItem>
  </ReviewBlock>
);
