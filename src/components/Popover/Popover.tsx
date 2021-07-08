import {classNames, variationName} from '@shopify/css-utilities';
import React, {ReactNode, useCallback, useEffect, useRef} from 'react';

import {createIdCreator, useId} from '../../utilities/id';
import {
  isFocused,
  findFirstFocusableNode,
  findLastFocusableNode,
  findNextFocusableNode,
} from '../../utilities/focus';
import {Popper, Props as PopperProps} from '../Popper';
import {useThemeConfiguration} from '../Theme';

import styles from './Popover.css';

export interface Props {
  children: ReactNode;
  /**
   * Element used to activate the popover
   */
  activator: HTMLElement | null;
  /**
   * Show or hide the popover
   */
  open: boolean;
  /**
   * Position the popover relative to the activator
   * @defaultValue 'inlineEnd'
   */
  placement?: PopperProps['placement'];
  /**
   * Defines the style of the backdrop under the popover
   */
  backdrop?: 'translucent' | 'none';
  /**
   * Callback to run when the Popover is closed
   */
  onClose: () => void;
}

const createId = createIdCreator('Popover');

export function Popover({
  children,
  activator,
  open,
  placement = 'inlineEnd',
  backdrop = 'none',
  onClose,
}: Props) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const {
    popover: {connector = 'arrow', depth = 'far'},
  } = useThemeConfiguration();

  const id = useId(undefined, createId);

  const setActivatorAccessibilityAttributes = useCallback(() => {
    activator?.setAttribute('aria-controls', id);
    activator?.setAttribute('aria-expanded', String(open));
  }, [activator, id, open]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !activator?.contains(event.target) &&
        open
      ) {
        handleClose();
      }
    },
    [handleClose, activator, open],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (!open) return;

      const nextFocusableNode = activator && findNextFocusableNode(activator);
      const firstFocusableNode =
        popoverRef.current && findFirstFocusableNode(popoverRef.current);
      const lastFocusableNode =
        popoverRef.current && findLastFocusableNode(popoverRef.current);

      switch (event.key) {
        case 'Escape':
        case 'Esc':
          handleClose();
          activator?.focus();
          break;
        case 'Tab': {
          if (isFocused(activator) && event.shiftKey) {
            handleClose();
          } else if (isFocused(activator)) {
            event.preventDefault();
            firstFocusableNode?.focus();
          } else if (isFocused(firstFocusableNode) && event.shiftKey) {
            event.preventDefault();
            activator?.focus();
            handleClose();
          } else if (isFocused(lastFocusableNode) && !event.shiftKey) {
            event.preventDefault();
            nextFocusableNode?.focus();
            handleClose();
          }
          break;
        }
      }
    },
    [handleClose, activator, open],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown, false);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    setActivatorAccessibilityAttributes();
  });

  const popoverClassName = classNames(
    styles.Popover,
    styles[variationName('Popover-placement', placement)],
    styles[variationName('Popover-connector', connector)],
    styles[variationName('Popover-depth', depth)],
  );

  const contentClassName = classNames(
    styles.Content,
    styles[variationName('Content-placement', placement)],
  );

  const backdropClassName = classNames(
    styles.Backdrop,
    styles[variationName('Backdrop-style', backdrop)],
  );

  const offset = connector === 'arrow' ? 15 : 5;

  return open ? (
    <>
      <Popper
        activator={activator}
        placement={placement}
        offset={offset}
        preventOverflow
      >
        <div className={popoverClassName} id={id} ref={popoverRef}>
          <div className={contentClassName}>{children}</div>
        </div>
      </Popper>
      {backdrop === 'translucent' ? (
        <div className={backdropClassName} />
      ) : null}
    </>
  ) : null;
}
