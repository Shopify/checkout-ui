import React, {PropsWithChildren} from 'react';

import {mountWithContext} from '../../test-utilities';
import {Link} from '../Link';
import {Heading} from '../Heading';

import {ReviewBlock, ReviewItem, Props} from './ReviewItem';

const defaultProps: PropsWithChildren<Props> = {
  label: 'Contact',
  children: 'snowdevil@shopify.com',
};

describe('<ReviewItem />', () => {
  describe('label', () => {
    it('renders the label', () => {
      const label = 'Ship to';
      const reviewItem = mountWithContext(
        <ReviewItem {...defaultProps} label={label} />,
      );

      expect(reviewItem).toContainReactText(label);
    });
  });

  describe('children', () => {
    it('does not render a link when not provided', () => {
      const content = 'snowdevil@shopify.com';
      const reviewItem = mountWithContext(
        <ReviewItem {...defaultProps}>{content}</ReviewItem>,
      );

      expect(reviewItem).toContainReactText(content);
    });
  });

  it('does not render a link when `to` is not provided', () => {
    const reviewItem = mountWithContext(
      <ReviewItem label="Content">snowdevil@shopify.com</ReviewItem>,
    );

    expect(reviewItem).not.toContainReactComponent(Link);
  });

  it('renders a link when `to` is provided', () => {
    const to = '/payment';
    const reviewItem = mountWithContext(
      <ReviewItem {...defaultProps} to={to} />,
    );

    expect(reviewItem).toContainReactComponent(Link, {
      to,
    });
  });

  it('sets an aria-label on Link when `linkAccessibilityLabel` is provided', () => {
    const reviewItem = mountWithContext(
      <ReviewItem
        {...defaultProps}
        to="/information"
        linkLabel="Change"
        linkAccessibilityLabel="Change contact information"
      />,
    );

    expect(reviewItem).toContainReactComponent(Link, {
      accessibilityLabel: 'Change contact information',
    });
  });
});

describe('<ReviewBlock />', () => {
  it('renders the children', () => {
    const reviewBlock = mountWithContext(
      <ReviewBlock>
        <ReviewItem {...defaultProps} label="Ship to" />
      </ReviewBlock>,
    );

    expect(reviewBlock).toContainReactComponent(ReviewItem);
  });

  it('renders a <Heading /> when a title is passed as a prop', () => {
    const reviewBlock = mountWithContext(<ReviewBlock title="Review" />);

    const heading = reviewBlock.find(Heading);
    expect(heading).toContainReactText('Review');
    expect(reviewBlock).toContainReactComponent('div', {
      'aria-labelledby': heading?.prop('id'),
    });
  });

  it('links the Heading with the section using aria-labelledBy', () => {
    const reviewBlock = mountWithContext(
      <ReviewBlock title="Review" titleHidden />,
    );
    const heading = reviewBlock.find(Heading);

    expect(reviewBlock).toContainReactComponent('div', {
      'aria-labelledby': heading?.prop('id'),
    });
  });
});
