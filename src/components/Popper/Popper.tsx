import React, {ReactNode, useMemo} from 'react';

import {Portal} from '../Portal';

import {useEffectRect, useRect} from './hooks';
import {PopperContext} from './context';
import {computeOffsets, Placement} from './utilities/offsets';
import styles from './Popper.css';

export interface Props {
  children?: ReactNode;
  placement?: Placement;
  preventOverflow?: boolean;
  activator: HTMLElement | null;
  sameWidth?: boolean;
}

export function Popper({
  children,
  placement = 'top',
  preventOverflow,
  activator,
  sameWidth,
}: Props) {
  const referenceRect = useEffectRect(activator);
  const [popperRect, popperRef] = useRect();

  const {offsets, clipping} = useMemo(
    () =>
      computeOffsets(placement, popperRect, referenceRect, {
        preventOverflow,
        sameWidth,
      }),
    [placement, popperRect, preventOverflow, referenceRect, sameWidth],
  );

  const contextValue = useMemo(
    () => ({
      offsets,
      clipping,
      placement,
      popperRect,
      referenceRect,
    }),
    [clipping, offsets, placement, popperRect, referenceRect],
  );

  const offsetX = offsets.x + (window.scrollX || window.pageXOffset);
  const offsetY = offsets.y + (window.scrollY || window.pageYOffset);

  return (
    <PopperContext.Provider value={contextValue}>
      <Portal>
        <div
          className={styles.Popper}
          style={{
            ...(referenceRect && {
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              MozTransform: `translate(${offsetX}px, ${offsetY}px)`,
              webkitTransform: `translate(${offsetX}px, ${offsetY}px)`,
              ...(sameWidth && {width: referenceRect.width}),
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
