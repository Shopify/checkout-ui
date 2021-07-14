import React, {useRef, PropsWithChildren, CSSProperties} from 'react';
import {classNames} from '@shopify/css-utilities';

import {
  useTransition,
  state as TransitionState,
} from '../../utilities/transition';

import styles from './Collapsible.css';

export interface Props {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** A minimum size when the collapsible is closed. Used for peeking content. */
  minSize?: number;
  /** A fade when collapsing and when content is peeking in the closed state. */
  fade?: boolean;
}

type LazyCssHeight = () => {
  height: CSSProperties['height'];
};

export function Collapsible({
  id,
  open,
  minSize = 0,
  fade,
  children,
}: PropsWithChildren<Props>) {
  const transition = useTransition(open, 'slow');
  const div = useRef<HTMLDivElement | null>(null);

  const lazyCssHeight = new Map<TransitionState, LazyCssHeight>([
    ['enter', () => ({height: minSize})],
    ['entering', () => ({height: div?.current?.clientHeight})],
    ['entered', () => ({height: 'auto'})],
    ['exit', () => ({height: div?.current?.clientHeight})],
    ['exiting', () => ({height: minSize})],
    ['exited', () => ({height: minSize})],
  ]);

  const showFade = !open && fade;

  return (
    <div
      id={id}
      style={{...lazyCssHeight.get(transition)!()}}
      className={classNames(styles.Collapsible, showFade && styles.fade)}
      aria-expanded={open}
      hidden={transition === 'exited' && minSize === 0}
    >
      <div ref={div}>{children}</div>
    </div>
  );
}
