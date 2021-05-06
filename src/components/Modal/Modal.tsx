import React, {
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {useTranslate} from '../AppContext';
import {Portal} from '../Portal';
import {Heading} from '../Heading';
import {Icon} from '../Icon';
import {useTransition} from '../../utilities/transition';
import {useFocusTrap} from '../../utilities/focusTrap';
import {createIdCreator, useId} from '../../utilities/id';

import styles from './Modal.css';

const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;
const createId = createIdCreator('ModalHeading');

interface CommonProps {
  /**
   * Whether the modal is closable or not. This will prevent closing
   * the modal by pressing `ESC` and hide the "close" button. This
   * can be used in flows where the user feedback is mandatory.
   */
  blocking?: boolean;
  /**
   * Stretches the modal on the y-axis to make it cover 90% of
   * the screen's height. This also cancels the automatic resizing
   * of the iframe when it's loaded.
   */
  long?: boolean;
  onClose?: () => void;
  open?: boolean;
  title?: string;
  titleHidden?: boolean;
}

interface IFrameProps {
  iFrameName?: string;
  iFrameTitle?: string;
  src?: string;
}

interface ChildrenProps {
  children?: ReactNode;
}

function isIFrameProps(
  props: IFrameProps | ChildrenProps,
): props is IFrameProps {
  return (props as IFrameProps).src !== undefined;
}

export type Props = CommonProps & (IFrameProps | ChildrenProps);

export function Modal({
  blocking = false,
  long = false,
  onClose,
  open: openProp = false,
  title,
  titleHidden,
  ...props
}: Props) {
  const translate = useTranslate();
  const [open, setOpen] = useState(openProp);
  const [iframeHeight, setIframeHeight] = useState<number>();
  const titleBarRef = useRef<HTMLElement>(null);
  const activatorRef = useRef<Element | null>(null);
  const modalRef = useFocusTrap({preventScroll: true});
  const modalHeadingId = useId(undefined, createId);

  const transition = useTransition(open, {enter: 'fast'});
  const transitionClassName = styles[variationName('transition', transition)];

  const closeModal = useCallback(() => {
    setOpen(false);
    if (activatorRef?.current instanceof HTMLElement)
      activatorRef.current.focus();
    if (onClose) onClose();
    document.body.style.overflow = 'auto';
    setIframeHeight(undefined);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event) => {
      if ((event.key === 'Escape' || event.key === 'Esc') && !blocking) {
        closeModal();
      }
    },
    [blocking, closeModal],
  );

  useEffect(() => {
    if (openProp) {
      document.body.style.overflow = 'hidden';
      activatorRef.current = document.activeElement;
      setOpen(true);
    } else {
      closeModal();
    }
  }, [openProp, closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  const handleIFrameLoad = useCallback(
    (evt: React.SyntheticEvent<HTMLIFrameElement>) => {
      const iframe = evt.target as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        try {
          setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
        } catch {
          setIframeHeight(DEFAULT_IFRAME_CONTENT_HEIGHT);
        }
      }
    },
    [],
  );

  if (!open) return null;

  const ariaLabelOrLabelledby = titleHidden
    ? {'aria-label': title}
    : {'aria-labelledby': modalHeadingId};

  const titleMarkup = titleHidden ? (
    <span />
  ) : (
    <Heading level={1} id={modalHeadingId}>
      {title}
    </Heading>
  );

  return (
    <Portal>
      <div className={styles.Modal}>
        {/* TODO: <ScrollLock />, <Scrollable /> */}
        <div className={classNames(styles.Backdrop, transitionClassName)}>
          <div
            className={classNames(styles.Content, transitionClassName, {
              [styles['Content-isLong']]: long,
            })}
            role="dialog"
            aria-modal
            /** @see https://dequeuniversity.com/rules/axe/4.1/scrollable-region-focusable?application=axeAPI */
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            ref={modalRef}
            {...ariaLabelOrLabelledby}
          >
            {(!titleHidden || !blocking) && (
              <header className={styles.Header} ref={titleBarRef}>
                {titleMarkup}
                {!blocking && (
                  <button
                    type="button"
                    className={styles.Button}
                    onClick={() => closeModal()}
                    aria-label={translate('close') || 'Close'}
                  >
                    <Icon source="close" size="large" />
                  </button>
                )}
              </header>
            )}
            {isIFrameProps(props) ? (
              <iframe
                src={props.src}
                name={props.iFrameName}
                title={props.iFrameTitle || 'body markup'}
                className={styles.IFrame}
                {...(iframeHeight && {style: {height: `${iframeHeight}px`}})}
                {...(!long && {onLoad: handleIFrameLoad})}
              />
            ) : (
              <div className={styles.Body}>{props.children}</div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
