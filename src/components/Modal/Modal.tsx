import React, {
  PropsWithChildren,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {useResponsiveValue} from '../../utilities/responsiveValue';
import {useTranslate} from '../AppContext';
import {FocusTrap} from '../FocusTrap';
import {Portal} from '../Portal';
import {Heading} from '../Heading';
import {Icon} from '../Icon';
import {pixelOrPercent} from '../../utilities/units';
import {useTransition} from '../../utilities/transition';
import {createIdCreator, useId} from '../../utilities/id';

import styles from './Modal.css';

const createId = createIdCreator('ModalHeading');

const IFRAME_HEIGHT_NOT_ACCESSIBLE = -1;

export type Props = PropsWithChildren<{
  /**
   * Whether the modal is closable or not. This will prevent closing
   * the modal by pressing `ESC` and hide the "close" button. This
   * can be used in flows where the user feedback is mandatory.
   */
  maxInlineSize?: number | 'fill';
  blockSize?: 'fill';
  open: boolean;
  title: string;
  titleHidden?: boolean;
  source?: string;
  /**
   * Do not animate modal on mount. Changing `open` props still triggers animation.
   */
  noMountTransition?: boolean;
}> &
  (BlockingProps | NonBlockingProps);

interface BlockingProps {
  blocking: true;
}

interface NonBlockingProps {
  blocking?: false;
  onClose: () => void;
}

export function Modal({
  maxInlineSize,
  blockSize,
  open,
  title,
  titleHidden,
  source,
  noMountTransition = false,
  children,
  ...rest
}: Props) {
  const blocking = rest.blocking;
  const onClose = rest.blocking ? undefined : rest.onClose;

  const translate = useTranslate();
  const [iframeHeight, setIframeHeight] = useState<number>();
  const activatorRef = useRef<Element | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalHeadingId = useId(undefined, createId);

  const transition = useTransition(open, 'fast', !noMountTransition);
  const transitionClassName = styles[variationName('transition', transition)];

  const isMobile = useResponsiveValue({
    base: true,
    medium: false,
  });

  useEffect(() => {
    if (transition === 'enter') {
      document.body.style.overflow = 'hidden';
      activatorRef.current = document.activeElement;
    }

    if (transition === 'exited') {
      document.body.style.overflow = 'auto';

      if (activatorRef?.current instanceof HTMLElement)
        activatorRef.current.focus();
      setIframeHeight(undefined);
    }
  }, [transition]);

  const handleDialogFocus = () => {
    // workaround for browsers that don't support `preventScroll` for `focus`
    setTimeout(() => {
      const modal = modalRef.current;
      modal && modal.scrollTo(0, 0);
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Escape' || event.key === 'Esc') && !blocking) {
        onClose && onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [blocking, onClose]);

  const handleIFrameLoad = useCallback(
    (evt: React.SyntheticEvent<HTMLIFrameElement>) => {
      const iframe = evt.target as HTMLIFrameElement;

      if (iframe && iframe.contentWindow) {
        try {
          setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
        } catch {
          setIframeHeight(IFRAME_HEIGHT_NOT_ACCESSIBLE);
        }
      }
    },
    [],
  );

  function handleBackdropClick() {
    onClose && onClose();
  }

  if (transition === 'exited') return null;

  const ariaLabelOrLabelledby = titleHidden
    ? {'aria-label': title}
    : {'aria-labelledby': modalHeadingId};

  const titleMarkup = titleHidden ? (
    // `null` breaks close button's right alignment
    <span />
  ) : (
    <Heading level={1} id={modalHeadingId}>
      {title}
    </Heading>
  );

  const header = (!titleHidden || !blocking) && (
    <header className={styles.Header}>
      {titleMarkup}
      {!blocking && (
        <button
          type="button"
          className={styles.CloseButton}
          onClick={onClose}
          aria-label={translate('close') || 'Close'}
        >
          <Icon source="close" size="large" />
        </button>
      )}
    </header>
  );

  const content = source ? (
    <iframe
      src={source}
      title={title}
      className={styles.IFrame}
      {...(iframeHeight && iframeHeight > 0 && {style: {height: iframeHeight}})}
      {...(!blockSize && {onLoad: handleIFrameLoad})}
    />
  ) : (
    <div
      className={styles.Content}
      {...((blockSize || isMobile) && {tabIndex: 0})}
    >
      {children}
    </div>
  );

  return (
    <Portal>
      <div className={styles.Modal} ref={modalRef}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={classNames(styles.Backdrop, transitionClassName)}
          onClick={handleBackdropClick}
        />
        <FocusTrap onContainerFocus={handleDialogFocus}>
          <div
            className={classNames(styles.Dialog, transitionClassName, {
              [styles['Dialog-blockSizeFill']]:
                blockSize === 'fill' || iframeHeight === -1,
            })}
            role="dialog"
            aria-modal
            style={{
              ...(maxInlineSize && {
                maxWidth: pixelOrPercent(
                  maxInlineSize === 'fill' ? 1 : maxInlineSize,
                ),
              }),
            }}
            {...ariaLabelOrLabelledby}
          >
            {header}
            {content}
          </div>
        </FocusTrap>
      </div>
    </Portal>
  );
}
