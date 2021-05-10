import React, {PropsWithChildren} from 'react';

import {Icon} from '../Icon';
import {Truncate} from '../Truncate';

import styles from './Tag.css';

export interface Props {
  /** Callback when pressed */
  onPress?(): void;
  accessibilityLabel?: string;
}

/**
 * Tag is used to display a removable tag.
 */
export function Tag({
  children,
  onPress,
  accessibilityLabel,
}: PropsWithChildren<Props>) {
  return (
    <div className={styles.Tag}>
      <span className={styles.Label}>
        <Truncate>{children}</Truncate>
      </span>
      <button
        type="button"
        className={styles.Button}
        onClick={onPress}
        aria-label={accessibilityLabel}
      >
        <Icon source="close" size="default" />
      </button>
    </div>
  );
}
