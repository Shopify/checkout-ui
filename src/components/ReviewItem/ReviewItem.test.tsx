import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {Link} from '../Link';
import {TextBlock} from '../TextBlock';
import {Heading} from '../Heading';
import {VisuallyHidden} from '../VisuallyHidden';
import {HiddenForAccessibility} from '../HiddenForAccessibility';

import {ReviewBlock, ReviewItem, Props} from './ReviewItem';

const defaultProps: Props = {
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

  it('renders a hidden label for screen readers when `linkAriaLabel` is provided', () => {
    const reviewItem = mountWithContext(
      <ReviewItem
        {...defaultProps}
        to="/information"
        linkLabel="Change"
        linkAriaLabel="Change contact information"
      />,
    );

    expect(reviewItem.find(Link)).toContainReactComponent(VisuallyHidden, {
      children: 'Change contact information',
    });
    expect(reviewItem.find(Link)).toContainReactComponent(
      HiddenForAccessibility,
      {
        children: 'Change',
      },
    );
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

  it('renders a <VisuallyHidden> when a title and titleHidden are passed as props', () => {
    const reviewBlock = mountWithContext(
      <ReviewBlock title="Review" titleHidden />,
    );

    const visuallyHidden = reviewBlock.find(VisuallyHidden);
    expect(visuallyHidden).toContainReactComponent(TextBlock, {
      children: 'Review',
    });
    expect(reviewBlock).toContainReactComponent('div', {
      'aria-labelledby': visuallyHidden?.find(TextBlock)?.prop('id'),
    });
  });
});
