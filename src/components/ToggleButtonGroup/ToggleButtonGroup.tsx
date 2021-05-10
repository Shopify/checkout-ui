import React, {useRef, useMemo, PropsWithChildren} from 'react';

import {ToggleButtonsContext} from './context';
import styles from './ToggleButtonGroup.css';

export interface Props {
  /**
   * A unique identifier for the toggle button.
   */
  id: string;
  /**
   * The button that is selected.
   */
  selectedItem: string;
  /**
   * Callback when an item has been selected
   */
  onChange(value: string): void;
}

export function ToggleButtonGroup({
  children,
  selectedItem,
  onChange,
}: PropsWithChildren<Props>) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const contextValue = useMemo(
    () => ({
      selectedItem,
      get onChange() {
        return onChangeRef.current;
      },
    }),
    [selectedItem],
  );

  return (
    <ToggleButtonsContext.Provider value={contextValue}>
      <div className={styles.ToggleButtonGroup}>{children}</div>
    </ToggleButtonsContext.Provider>
  );
}
