import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Popper, Props} from './Popper';
import {PopperContext} from './context';
import {computeOffsets} from './utilities/offsets';

const defaultProps: Props = {
  activator: null,
};

describe('<Popper />', () => {
  it('render its children', () => {
    const content = 'content';
    const popper = mount(<Popper {...defaultProps}>{content}</Popper>);

    expect(popper).toContainReactText('content');
  });

  it('wraps children with PopperContext', () => {
    const content = 'content';
    const placement = 'blockEnd';

    const popper = mount(
      <Popper placement={placement} {...defaultProps}>
        {content}
      </Popper>,
    );

    expect(popper).toProvideReactContext(PopperContext, {
      offsets: {
        x: 0,
        y: 0,
      },
      clipping: {left: 0, right: 0},
      spacing: 0,
      placement,
      popperRect: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
      } as DOMRectReadOnly,
      referenceRect: null,
    });
  });

  describe('computeOffsets', () => {
    it('computes default offsets when reference and popper rect are null', () => {
      const {offsets} = computeOffsets('blockStart', null, null);

      expect(offsets).toStrictEqual({x: 0, y: 0});
    });

    it('computes top center offsets with reference larger than popper', () => {
      const referenceWidth = 100;
      const referenceHeight = 40;
      const popperWidth = 40;
      const popperHeight = 20;

      const referenceRect = {
        bottom: 100 + referenceHeight,
        height: referenceHeight,
        top: 100,
        left: 100,
        width: referenceWidth,
        right: 100 + referenceWidth,
      };

      const popperRect = {
        bottom: popperHeight,
        height: popperHeight,
        right: popperWidth,
        width: popperWidth,
      };

      const {offsets} = computeOffsets(
        'blockStart',
        popperRect as DOMRectReadOnly,
        referenceRect as DOMRectReadOnly,
      );

      expect(offsets).toStrictEqual({x: 130, y: 80});
      expect(offsets.x).toBeGreaterThan(referenceRect.left);
      expect(offsets.y).toBeLessThan(referenceRect.top);
    });

    it('computes bottom center offsets with reference larger than popper', () => {
      const referenceWidth = 100;
      const referenceHeight = 40;
      const popperWidth = 40;
      const popperHeight = 20;

      const referenceRect = {
        bottom: 100 + referenceHeight,
        height: referenceHeight,
        top: 100,
        left: 100,
        width: referenceWidth,
        right: 100 + referenceWidth,
      };

      const popperRect = {
        bottom: popperHeight,
        height: popperHeight,
        right: popperWidth,
        width: popperWidth,
      };

      const {offsets} = computeOffsets(
        'blockEnd',
        popperRect as DOMRectReadOnly,
        referenceRect as DOMRectReadOnly,
      );

      expect(offsets).toStrictEqual({x: 130, y: 140});
      expect(offsets.x).toBeGreaterThan(referenceRect.left);
      expect(offsets.y).toBeGreaterThan(referenceRect.top);
    });

    it('computes top center offsets with reference smaller than popper', () => {
      const referenceWidth = 40;
      const referenceHeight = 20;
      const popperWidth = 100;
      const popperHeight = 40;

      const referenceRect = {
        bottom: 100 + referenceHeight,
        height: referenceHeight,
        top: 100,
        left: 100,
        width: referenceWidth,
        right: 100 + referenceWidth,
      };

      const popperRect = {
        bottom: popperHeight,
        height: popperHeight,
        right: popperWidth,
        width: popperWidth,
      };

      const {offsets} = computeOffsets(
        'blockStart',
        popperRect as DOMRectReadOnly,
        referenceRect as DOMRectReadOnly,
      );

      expect(offsets).toStrictEqual({x: 70, y: 60});
      expect(offsets.x).toBeLessThan(referenceRect.left);
      expect(offsets.y).toBeLessThan(referenceRect.top);
    });

    it('computes bottom center offsets with reference smaller than popper', () => {
      const referenceWidth = 40;
      const referenceHeight = 20;
      const popperWidth = 100;
      const popperHeight = 40;

      const referenceRect = {
        bottom: 100 + referenceHeight,
        height: referenceHeight,
        top: 100,
        left: 100,
        width: referenceWidth,
        right: 100 + referenceWidth,
      };

      const popperRect = {
        bottom: popperHeight,
        height: popperHeight,
        right: popperWidth,
        width: popperWidth,
      };

      const {offsets} = computeOffsets(
        'blockEnd',
        popperRect as DOMRectReadOnly,
        referenceRect as DOMRectReadOnly,
      );

      expect(offsets).toStrictEqual({x: 70, y: 120});
      expect(offsets.x).toBeLessThan(referenceRect.left);
      expect(offsets.y).toBeGreaterThan(referenceRect.top);
    });

    it('computes offsets with reference larger than popper and sameInlineSize option', () => {
      const referenceWidth = 100;
      const referenceHeight = 40;
      const popperWidth = 40;
      const popperHeight = 20;

      const referenceRect = {
        bottom: 100 + referenceHeight,
        height: referenceHeight,
        top: 100,
        left: 100,
        width: referenceWidth,
        right: 100 + referenceWidth,
      };

      const popperRect = {
        bottom: popperHeight,
        height: popperHeight,
        right: popperWidth,
        width: popperWidth,
      };

      const {offsets} = computeOffsets(
        'blockStart',
        popperRect as DOMRectReadOnly,
        referenceRect as DOMRectReadOnly,
        {
          sameInlineSize: true,
        },
      );

      expect(offsets).toStrictEqual({x: 100, y: 80});
      expect(offsets.x).toBe(referenceRect.left);
      expect(offsets.y).toBeLessThan(referenceRect.top);
    });
  });
});
