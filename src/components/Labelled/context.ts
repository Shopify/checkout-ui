import React from 'react';

export interface State {
  isFloating: boolean;
  isFocused: boolean;
  isEmpty: boolean;
}

export type Action =
  | {
      type: 'blur' | 'focus';
    }
  | {type: 'change' | 'init'; isEmpty: boolean};

export interface HookReturn extends State {
  onBlur(): void;
  onFocus(): void;
  onChange(isEmpty: boolean): void;
}

export const LabelledContext = React.createContext<HookReturn | undefined>(
  undefined,
);
