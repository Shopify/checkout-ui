import React, {ReactNode} from 'react';

import {successId} from '../../utilities/success';

import styles from './InlineSuccess.css';

export interface Props {
  children?: ReactNode;
  controlID?: string;
}

export function InlineSuccess({children, controlID}: Props) {
  return (
    <p
      className={styles.InlineSuccess}
      id={controlID ? successId(controlID) : undefined}
    >
      {children}
    </p>
  );
}
