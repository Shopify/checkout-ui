import React, {PropsWithChildren} from 'react';

import {Icon} from '../Icon';
import {Truncate} from '../Truncate';

import styles from './Tag.css';

export interface Props {
  /** Callback when pressed */
  onPress?(): void;
}

/**
 * Tag is used to display a removable tag.
 */
export function Tag({children, onPress}: PropsWithChildren<Props>) {
  return (
    <div className={styles.Tag}>
      <span className={styles.Label}>
        <Truncate>{children}</Truncate>
      </span>
      <button type="button" className={styles.Button} onClick={onPress}>
        <Icon source="close" size="default" />
      </button>
    </div>
  );
}
