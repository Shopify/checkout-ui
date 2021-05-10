import React from 'react';
import {Story} from '@storybook/preact/types-6-0';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';

import {ReviewItem, ReviewBlock, Props, ReviewBlockProps} from './ReviewItem';

const meta = {
  component: ReviewItem,
  title: 'checkout-web-ui/ReviewItem',
  decorators: [withKnobs, themeWithKnobs('reviewBlock')],
  argTypes: {
    to: {type: {name: 'string', required: false}},
    linkLabel: {type: {name: 'string', required: false}},
    linkAccessibilityLabel: {type: {name: 'string', required: false}},
  },
};

export default meta;

const Template: Story<Props> = (args: Props) => (
  <div role="table">
    <ReviewItem {...args}>snowdevil@shopify.com</ReviewItem>
  </div>
);

export const defaultState = Template.bind({});
defaultState.args = {
  label: 'Contact',
  to: undefined,
  linkLabel: undefined,
  linkAccessibilityLabel: undefined,
};

export const withLink = Template.bind({});
withLink.args = {
  ...defaultState.args,
  to: '/shipping',
  linkLabel: 'Change',
  linkAccessibilityLabel: undefined,
};

export const withAriaLabelForLink = Template.bind({});
withAriaLabelForLink.args = {
  ...withLink.args,
  linkAccessibilityLabel: 'Change contact information',
};

export const withNoWrap = Template.bind({});
withNoWrap.args = {
  ...withAriaLabelForLink.args,
  noWrap: true,
};

const ReviewBlockTemplate: Story<Props & ReviewBlockProps> = ({
  title,
  titleHidden,
  ...reviewItemArgs
}: Props & ReviewBlockProps) => (
  <ReviewBlock {...{title, titleHidden}}>
    <ReviewItem {...reviewItemArgs}>snowdevil@shopify.com</ReviewItem>
    <ReviewItem
      label="Ship to"
      to="/information"
      linkLabel="Change"
      linkAccessibilityLabel="Change shipping address"
    >
      490 Rue de la Gauchetière O, Montréal, QC H2Z 0B3
    </ReviewItem>
    <ReviewItem
      label="Method"
      to="/shipping"
      linkLabel="Change"
      linkAccessibilityLabel="Change shipping method"
    >
      Standard - <strong>$14.90</strong>
    </ReviewItem>
  </ReviewBlock>
);

export const reviewBlock = ReviewBlockTemplate.bind({});
reviewBlock.args = {
  ...withAriaLabelForLink.args,
  title: 'Review',
  titleHidden: false,
};

export const reviewBlockWithHiddenTitle = ReviewBlockTemplate.bind({});
reviewBlockWithHiddenTitle.args = {
  ...withAriaLabelForLink.args,
  title: 'Review your information',
  titleHidden: true,
};
