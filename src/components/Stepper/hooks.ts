import {useContext} from 'react';

import {StepperContext} from './context';

export function useStepper() {
  const context = useContext(StepperContext);

  if (context === null) {
    throw new Error('<StepperStep />  must be used inside of an <Stepper />');
  }

  return context;
}
