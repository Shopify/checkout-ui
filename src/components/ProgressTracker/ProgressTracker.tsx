import React, {ReactNode, useMemo} from 'react';

import {ProgressTrackerContext, ProgressTrackerContextOptions} from './context';
import styles from './ProgressTracker.css';

export interface Props {
  activeStep?: string;
  children?: ReactNode;
}

export function ProgressTracker({activeStep, children}: Props) {
  const stepIds = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child)) {
      return child.props.id;
    }
  });

  const contextValue = useMemo(
    () => ({
      steps: stepIds.reduce(
        (steps: ProgressTrackerContextOptions['steps'], step, index) => {
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
    <ProgressTrackerContext.Provider value={contextValue}>
      <ol className={styles.ProgressTracker}>{children}</ol>
    </ProgressTrackerContext.Provider>
  );
}
