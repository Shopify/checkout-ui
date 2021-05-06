import {createContext} from 'react';

export interface ToggleButtonsContext {
  /**
   * The button that is selected.
   */
  selectedItem: string;
  /**
   * Callback when an item has been selected
   */
  onChange(value: string): void;
}

export const ToggleButtonsContext = createContext<ToggleButtonsContext | null>(
  null,
);
