import React, {ReactNode, useMemo} from 'react';

import {Portal} from '../Portal';
import {rem} from '../../utilities/units';

import {useEffectRect, useRect} from './hooks';
import {PopperContext} from './context';
import {computeOffsets, roundOffsets, Placement} from './utilities/offsets';
import styles from './Popper.css';

export interface Props {
  children?: ReactNode;
  /**
   * The element used to activate the popper.
   */
  activator: HTMLElement | null;
  /**
   * Position the popper relative to the activator.
   * @defaultValue 'blockStart'
   */
  placement?: Placement;
  /**
   * Moves the popper away from the activator.
   * If not specified, the popper will be flush with the activator.
   *
   * Number is in pixels.
   *
   * Example:
   * - `10` represents `10px`
   */
  offset?: number;
  /**
   * Ensures the popper is always visible in the viewport.
   */
  preventOverflow?: boolean;
  /**
   * Match the inline size of the popper to the `activator` size.
   */
  sameInlineSize?: boolean;
  /**
   * Minimum inline size of the popper.
   * This ensure the popper will not go smaller than the size specified.
   *
   * When used with `sameInlineSize`, the `minInlineSize` will act as a
   * guard rail in case the activator becomes too small depending its context.
   * This will ensure the popper content remains readable.
   *
   * Number is in pixels.
   *
   * Example:
   * - `500` represents `500px`
   */
  minInlineSize?: number;
}

export function Popper({
  children,
  offset,
  placement = 'blockStart',
  preventOverflow,
  activator,
  sameInlineSize,
  minInlineSize,
}: Props) {
  const referenceRect = useEffectRect(activator);
  const [popperRect, popperRef] = useRect();

  const {clipping, offsets, spacing} = useMemo(
    () =>
      computeOffsets(placement, popperRect, referenceRect, {
        offset,
        preventOverflow,
        sameInlineSize,
      }),
    [
      offset,
      placement,
      popperRect,
      preventOverflow,
      referenceRect,
      sameInlineSize,
    ],
  );

  const contextValue = useMemo(
    () => ({
      clipping,
      offsets,
      placement,
      popperRect,
      referenceRect,
      spacing,
    }),
    [clipping, offsets, placement, popperRect, referenceRect, spacing],
  );

  const {x, y} = roundOffsets({
    x: offsets.x + spacing + (window.scrollX || window.pageXOffset),
    y: offsets.y + (window.scrollY || window.pageYOffset),
  });

  const transform =
    (window.devicePixelRatio || 1) < 2
      ? `translate(${x}px, ${y}px)`
      : `translate3d(${x}px, ${y}px, 0)`;

  return (
    <PopperContext.Provider value={contextValue}>
      <Portal>
        <div
          className={styles.Popper}
          style={{
            ...(referenceRect && {
              transform,
              MozTransform: transform,
              webkitTransform: transform,
              ...(sameInlineSize && {width: referenceRect.width}),
              ...(minInlineSize && {minWidth: rem(minInlineSize)}),
            }),
          }}
          ref={popperRef}
        >
          {children}
        </div>
      </Portal>
    </PopperContext.Provider>
  );
}
