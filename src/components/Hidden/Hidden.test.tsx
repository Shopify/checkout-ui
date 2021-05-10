import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {TextBlock} from '../TextBlock';

import {Hidden} from './Hidden';

describe('<Hidden />', () => {
  it('renders its children', () => {
    const text = 'Snowdevil';
    const hidden = mountWithContext(<Hidden below="medium">{text}</Hidden>);

    expect(hidden).toContainReactText(text);
  });

  it('renders a <div> by default', () => {
    const text = 'Snowdevil';
    const hidden = mountWithContext(<Hidden below="medium">{text}</Hidden>);

    expect(hidden).toContainReactComponent('div');
  });

  it('renders a <span> when used inside an inline formatting context', () => {
    const text = 'Snowdevil';

    const hiddenTextBlock = mountWithContext(
      <TextBlock>
        <Hidden below="medium">{text}</Hidden>
      </TextBlock>,
    );

    expect(hiddenTextBlock).toContainReactComponent('span');
  });

  describe('above', () => {
    it('applies CSS classes that hides the element above the specified breakpoint', () => {
      const text = 'Snowdevil';

      const hiddenAboveSmall = mountWithContext(
        <Hidden above="small">{text}</Hidden>,
      );
      const hiddenAboveMedium = mountWithContext(
        <Hidden above="medium">{text}</Hidden>,
      );

      expect(hiddenAboveSmall).toContainReactComponent('div', {
        className: expect.stringContaining('hiddenOnMedium hiddenOnLarge'),
      });
      expect(hiddenAboveMedium).toContainReactComponent('div', {
        className: expect.stringContaining('hiddenOnLarge'),
      });
    });
  });

  describe('below', () => {
    it('applies CSS classes that hides the element below the specified breakpoint', () => {
      const text = 'Snowdevil';

      const hiddenBelowMedium = mountWithContext(
        <Hidden below="medium">{text}</Hidden>,
      );
      const hiddenBelowLarge = mountWithContext(
        <Hidden below="large">{text}</Hidden>,
      );

      expect(hiddenBelowMedium).toContainReactComponent('div', {
        className: expect.stringContaining('hiddenOnSmall'),
      });
      expect(hiddenBelowLarge).toContainReactComponent('div', {
        className: expect.stringContaining('hiddenOnSmall hiddenOnMedium'),
      });
    });
  });

  describe('below and above combined', () => {
    it('applies CSS classes that hides the element when both below and above is specified', () => {
      const text = 'Snowdevil';

      const hiddenBelowLargeAboveSmall = mountWithContext(
        <Hidden above="small" below="large">
          {text}
        </Hidden>,
      );
      const hiddenBelowMediumAboveMedium = mountWithContext(
        <Hidden above="medium" below="medium">
          {text}
        </Hidden>,
      );

      expect(hiddenBelowLargeAboveSmall).toContainReactComponent('div', {
        className: expect.stringContaining('hiddenOnMedium'),
      });
      expect(hiddenBelowMediumAboveMedium).toContainReactComponent('div', {
        className: expect.stringContaining('hiddenOnSmall hiddenOnLarge'),
      });
    });
  });
});
