import {classNames, variationName} from '@shopify/css-utilities';
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {rem} from '../../utilities/units';
import {Popper, Props as PopperProps} from '../Popper';

import styles from './Popover.css';

interface ExtendedCSSProperties extends CSSProperties {
  '--popover-offset'?: string;
}

export interface Props {
  children: ReactNode;
  /**
   * Element used to activate the Popover
   */
  activator: HTMLElement | null;
  /**
   * Show or hide the popover
   */
  open: boolean;
  /**
   * Callback to run when the Popover is closed
   */
  onClose: () => void;
  /**
   * Moves the Popover relative to its arrow.
   *
   * Number is in pixels
   *
   * Example:
   * - `10` represents `10px` */
  offset?: number;
  /**
   * Position the Popover relative to the activator.
   * @default 'inlineEnd'
   */
  placement?: PopperProps['placement'];
}

export function Popover({
  children,
  activator,
  open: openProp,
  onClose,
  offset,
  placement = 'inlineEnd',
}: Props) {
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (activator instanceof HTMLElement) {
      activator.focus();
    }
    onClose?.();
  }, [activator, onClose]);

  const popoverClassName = classNames(
    styles.Popover,
    styles[variationName('Popover-placement', placement)],
  );

  const contentClassName = classNames(
    styles.Content,
    styles[variationName('Content-placement', placement)],
  );

  const popoverStyle: ExtendedCSSProperties = {
    '--popover-offset': offset
      ? rem(offset)
      : undefined /* stylelint-disable-line value-keyword-case */,
  };

  return open ? (
    <>
      <Popper activator={activator} placement={placement} offset={15}>
        <div className={popoverClassName} style={popoverStyle}>
          <div className={contentClassName}>{children}</div>
        </div>
      </Popper>
      <div className={styles.Overlay} onClick={handleClose} />
    </>
  ) : null;
}
