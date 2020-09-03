import React, {useRef, useState, ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {useTransition} from '../../utilities/transition';
import {Popper, usePopper} from '../Popper';
import {TextBlock} from '../TextBlock';
import {TextContainer} from '../TextContainer';
import {useThemeConfiguration} from '../Theme';

import styles from './Tooltip.css';

export interface Props {
  content: string;
  children: ReactNode;
}

const createId = createIdCreator('Tooltip');

export function Tooltip({content, children}: Props) {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ignoreNonTouchEvents = useRef(false);

  const transition = useTransition(active, {
    exit: 'base',
  });

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case 'Space':
        event.preventDefault();
        setActive(!active);
        break;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        setActive(false);
        break;
    }
  }

  const id = useId(undefined, createId);
  const controlId = active ? id : undefined;

  return (
    <div className={styles.Wrapper}>
      <button
        type="button"
        className={styles.Button}
        aria-pressed={active}
        aria-controls={controlId}
        aria-describedby={controlId}
        onFocus={() => {
          if (ignoreNonTouchEvents.current) {
            return;
          }

          setActive(true);
        }}
        onBlur={() => {
          if (ignoreNonTouchEvents.current) {
            return;
          }

          setActive(false);
        }}
        onMouseEnter={() => {
          if (ignoreNonTouchEvents.current) {
            return;
          }

          setActive(true);
        }}
        onMouseLeave={() => {
          setActive(false);
        }}
        onTouchStart={() => {
          ignoreNonTouchEvents.current = true;
        }}
        onClick={() => {
          setActive(!active);
        }}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
      >
        {children}
      </button>
      {transition !== 'exited' && (
        <Popper activator={buttonRef.current} preventOverflow>
          <TooltipContent
            content={content}
            id={controlId}
            onMouseEnter={() => {
              if (ignoreNonTouchEvents.current) {
                return;
              }

              setActive(true);
            }}
            onMouseLeave={() => {
              setActive(false);
            }}
            transition={transition}
          />
        </Popper>
      )}
    </div>
  );
}

interface TooltipContentProps extends Omit<Props, 'children'> {
  id: any;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  transition: string;
}

export function TooltipContent({
  content,
  id,
  onMouseEnter,
  onMouseLeave,
  transition,
}: TooltipContentProps) {
  const {clipping, spacing} = usePopper();
  const {
    tooltip: {
      background,
      opacity = 'translucent',
      borderRadius = 'base',
      textAlignment = 'center',
    },
  } = useThemeConfiguration();

  const offsetX =
    (clipping.right || clipping.left) &&
    `calc(50% - ${(clipping.right || clipping.left) + spacing}px)`;

  const className = classNames(
    styles.Tooltip,
    styles[variationName('transition', transition)],
    styles[variationName('Tooltip-opacity', opacity)],
    styles[variationName('Tooltip-borderRadius', borderRadius)],
    background && styles[variationName('Tooltip-background', background)],
  );

  const alignment = textAlignment === 'start' ? 'leading' : textAlignment;

  return (
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
    <div
      id={id}
      role="tooltip"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        ...(offsetX && {
          transformOrigin: `${offsetX} 120%`,
        }),
      }}
    >
      <TextContainer alignment={alignment}>
        <TextBlock size="small">{content}</TextBlock>
      </TextContainer>
      <TooltipArrow />
    </div>
  );
}

export function TooltipArrow() {
  const {clipping, spacing} = usePopper();

  const offsetX =
    (clipping.right || clipping.left) &&
    `calc(${document.dir === 'ltr' ? '-50' : '50'}% - ${
      (clipping.right || clipping.left) + spacing
    }px)`;

  const transform =
    (window.devicePixelRatio || 1) < 2
      ? `translate(${offsetX}, 0)`
      : `translate3d(${offsetX}, 0, 0)`;

  return (
    <div
      className={styles.Arrow}
      style={{
        ...(offsetX && {
          transform,
          MozTransform: transform,
          webkitTransform: transform,
        }),
      }}
    />
  );
}
