import React, {useRef, useLayoutEffect, ReactElement} from 'react';

import {
  findFirstFocusableNode,
  findLastFocusableNode,
} from '../../utilities/focus';

import styles from './FocusTrap.css';

interface Props {
  children: ReactElement;
  onContainerFocus?: (event: FocusEvent) => void;
}

export const FocusTrap = ({children, onContainerFocus}: Props) => {
  const firstBumperRef = useRef<HTMLButtonElement>(null);
  const lastBumperRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    contentRef.current?.focus({preventScroll: true});
  }, []);

  const moveFocus = (forward: boolean) => {
    const content = contentRef.current;

    if (content) {
      const focusableNode = forward
        ? findFirstFocusableNode(content)
        : findLastFocusableNode(content);
      focusableNode ? focusableNode.focus() : content.focus();
    }
  };

  return (
    <>
      <button
        className={styles.Bumper}
        ref={firstBumperRef}
        aria-hidden="true"
        onFocus={() => moveFocus(false)}
      />

      {React.cloneElement(children, {
        tabIndex: -1,
        ref: contentRef,
        onFocus: onContainerFocus,
      })}

      <button
        className={styles.Bumper}
        ref={lastBumperRef}
        aria-hidden="true"
        onFocus={() => moveFocus(true)}
      />
    </>
  );
};
