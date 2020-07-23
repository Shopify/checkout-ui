import React, {useRef, useState, ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {useTransition} from '../../utilities/transition';
import {Popper, usePopper} from '../Popper';

import styles from './Tooltip.css';

export interface Props {
  content: string;
  children: ReactNode;
}

export const RETURN_KEY_CODE = 13;
export const ESCAPE_KEY_CODE = 27;
export const SPACE_KEY_CODE = 32;

const createId = createIdCreator('Tooltip');

export function Tooltip({content, children}: Props) {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const transition = useTransition(active, {
    exit: 'slow',
  });

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.keyCode) {
      case RETURN_KEY_CODE:
      case SPACE_KEY_CODE:
        event.preventDefault();
        setActive(!active);
        break;
      case ESCAPE_KEY_CODE:
        event.preventDefault();
        setActive(false);
        break;
    }
  }

  function handleClick() {
    setActive(!active);
  }

  const className = classNames(
    styles.Tooltip,
    styles[variationName('transition', transition)],
  );

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
          setActive(true);
        }}
        onBlur={() => {
          setActive(false);
        }}
        onMouseEnter={() => {
          setActive(true);
        }}
        onMouseLeave={() => {
          setActive(false);
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
      >
        {children}
      </button>
      {transition !== 'exited' && (
        <Popper activator={buttonRef.current} preventOverflow>
          {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <p
            id={controlId}
            role="tooltip"
            onMouseEnter={() => {
              setActive(true);
            }}
            onMouseLeave={() => {
              setActive(false);
            }}
            className={className}
          >
            {content}
            <Arrow />
          </p>
        </Popper>
      )}
    </div>
  );
}

export function Arrow() {
  const {clipping} = usePopper();

  const offsetX =
    (clipping.right || clipping.left) &&
    `calc(${document.dir === 'ltr' ? '-50' : '50'}% - ${
      clipping.right || clipping.left
    }px)`;

  return (
    <div
      className={styles.Arrow}
      style={{
        ...(offsetX && {
          transform: `translateX(${offsetX})`,
          MozTransform: `translateX(${offsetX})`,
          webkitTransform: `translateX(${offsetX})`,
        }),
      }}
    />
  );
}
