import React, {ReactNode} from 'react';

import {errorId} from '../../utilities/errors';

import styles from './InlineError.css';

export interface Props {
  children?: ReactNode;
  controlID?: string;
}

export function InlineError({children, controlID}: Props) {
  return (
    <p
      className={styles.InlineError}
      id={controlID ? errorId(controlID) : undefined}
    >
      {children}
    </p>
  );
}
