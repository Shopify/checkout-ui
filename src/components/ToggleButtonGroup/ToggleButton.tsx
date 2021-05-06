import React, {PropsWithChildren} from 'react';
import {classNames} from '@shopify/css-utilities';

import styles from './ToggleButtonGroup.css';
import {useToggleButtons} from './hooks';

export interface ToggleButtonProps {
  /**
   * A unique identifier for the toggle button.
   */
  id: string;
}
export function ToggleButton({
  id,
  children,
}: PropsWithChildren<ToggleButtonProps>) {
  const {selectedItem, onChange} = useToggleButtons();
  const selected = selectedItem === id;

  return (
    <div className={classNames(styles.ToggleButton)}>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => {
          onChange(id);
        }}
        className={classNames(styles.Button, {
          [styles['Button-selected']]: selected,
        })}
      >
        {children}
      </button>
    </div>
  );
}
