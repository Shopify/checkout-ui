import {useContext} from 'react';

import {OptionListContext} from './context';

export function useOptionList() {
  const context = useContext(OptionListContext);

  if (context === null) {
    throw new Error(
      '<Option /> and <OptionDetails /> must be used inside of an <OptionList />',
    );
  }

  return context;
}
