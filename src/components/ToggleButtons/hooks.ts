import {useContext} from 'react';

import {ToggleButtonsContext} from './context';

export function useToggleButtons() {
  const context = useContext(ToggleButtonsContext);

  if (context === null) {
    throw new Error(
      '<ToggleButton /> must be used inside of a <ToggleButtonGroup />',
    );
  }

  return context;
}
