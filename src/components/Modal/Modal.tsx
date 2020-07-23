import React, {
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Portal} from '../Portal';
import {Heading} from '../Heading';
import {Icon} from '../Icon';
import {useTransition} from '../../utilities/transition';

import styles from './Modal.css';

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;

interface CommonProps {
  open?: boolean;
  title?: string;
  height?: number;
  onClose?: () => void;
}

interface IFrameProps {
  src: string;
  iFrameName?: string;
}

interface ChildrenProps {
  children: ReactNode;
}

function isIFrameProps(
  props: IFrameProps | ChildrenProps,
): props is IFrameProps {
  return (props as IFrameProps).src !== undefined;
}

export type Props = CommonProps & (IFrameProps | ChildrenProps);

export function Modal({
  open: openProp = false,
  title,
  height,
  onClose,
  ...props
}: Props) {
  const iFrameTitle = 'body markup';

  const [open, setOpen] = useState(openProp);
  const [iframeHeight, setIframeHeight] = useState(IFRAME_LOADING_HEIGHT);
  const titleBarRef = useRef<HTMLElement>(null);

  const transition = useTransition(open, {enter: 'fast'});
  const transitionClassName = styles[variationName('transition', transition)];

  const closeModal = useCallback(() => {
    setOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event) => event.key === 'Escape' && closeModal(),
    [closeModal],
  );

  useEffect(() => {
    if (openProp) {
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

  // TODO handle focus

  let contentHeight: string;
  if (height) {
    if (title) {
      contentHeight = `${height - (titleBarRef.current?.clientHeight ?? 64)}px`;
    }
    contentHeight = `${height}px`;
  } else if (isIFrameProps(props)) {
    contentHeight = `${iframeHeight}px`;
  } else {
    contentHeight = 'auto';
  }

  return (
    <Portal>
      <div className={styles.Wrapper}>
        {/* TODO: <ScrollLock />, <Scrollable /> */}
        <div className={classNames(styles.Backdrop, transitionClassName)} />
        <div className={classNames(styles.Content, transitionClassName)}>
          {title && (
            <header className={styles.Header} ref={titleBarRef}>
              <Heading level={1}>{title}</Heading>
              <button
                type="button"
                className={styles.Button}
                onClick={() => closeModal()}
              >
                <Icon source="close" size="large" />
              </button>
            </header>
          )}
          {isIFrameProps(props) ? (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <iframe
              src={props.src}
              name={props.iFrameName}
              onLoad={handleIFrameLoad}
              title={iFrameTitle}
              className={styles.IFrame}
              style={{
                // stylelint-disable-next-line value-keyword-case
                height: contentHeight,
              }}
            />
          ) : (
            <div
              className={styles.Body}
              style={{
                // stylelint-disable-next-line value-keyword-case
                height: contentHeight,
              }}
            >
              {props.children}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
