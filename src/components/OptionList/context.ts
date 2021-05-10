import {createContext} from 'react';

export interface OptionListContextOptions {
  id: string;
  selectedItems: string[];
  allowMultiple: boolean;
  controlHidden: boolean;
  onChange(value: string[]): void;
}

export const OptionListContext = createContext<OptionListContextOptions | null>(
  null,
);
