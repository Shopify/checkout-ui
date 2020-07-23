import React, {ReactNode, useMemo} from 'react';

import {StepperContext, StepperContextOptions} from './context';
import styles from './Stepper.css';

export interface Props {
  activeStep?: string;
  children?: ReactNode;
}

export function Stepper({activeStep, children}: Props) {
  const stepIds = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child)) {
      return child.props.id;
    }
  });

  const contextValue = useMemo(
    () => ({
      steps: stepIds.reduce(
        (steps: StepperContextOptions['steps'], step, index) => {
          steps[step] = {
            active: activeStep ? activeStep === step : index === 0,
            completed: stepIds.indexOf(activeStep) > stepIds.indexOf(step),
          };

          return steps;
        },
        {},
      ),
    }),
    [activeStep, stepIds],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <ol className={styles.Stepper}>{children}</ol>
    </StepperContext.Provider>
  );
}
