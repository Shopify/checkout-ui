import React from 'react';

export interface HookReturn {
  focused: boolean;
  floating: boolean;
  onBlur(): void;
  onFocus(): void;
}

export const LabelledContext = React.createContext<HookReturn | undefined>(
  undefined,
);
