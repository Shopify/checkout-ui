import React from 'react';

import {ProgressTracker, ProgressTrackerStep} from '.';

const meta = {
  component: ProgressTracker,
  title: 'ProgressTracker',
};

export default meta;

function step(step: string, state: string, stateHidden = true) {
  switch (step) {
    case 'confirmed':
      return (
        <ProgressTrackerStep
          icon="checkmark"
          id={step}
          label="Confirmed"
          description="March 16"
          state={state}
          stateHidden={stateHidden}
        />
      );
    case 'onItsWay':
      return (
        <ProgressTrackerStep
          icon="ship"
          id={step}
          label="On its way"
          description="March 17"
          state={state}
          stateHidden={stateHidden}
        />
      );
    case 'outForDelivery':
      return (
        <ProgressTrackerStep
          icon="delivery"
          id={step}
          label="Out for delivery"
          description="March 18"
          state={state}
          stateHidden={stateHidden}
        />
      );
    case 'delivered':
      return (
        <ProgressTrackerStep
          icon="delivered"
          id={step}
          label="Delivered"
          description="March 19"
          state={state}
          stateHidden={stateHidden}
        />
      );
    case 'failure':
      return (
        <ProgressTrackerStep
          icon="errorFill"
          iconAppearance="critical"
          id={step}
          label="Not delivered"
          description="March 19"
          state={state}
          stateHidden={stateHidden}
        />
      );
  }
}

export const defaultState = () => (
  <ProgressTracker>
    {step('confirmed', 'Current step')}
    {step('onItsWay', 'Upcoming step')}
    {step('outForDelivery', 'Upcoming step')}
    {step('delivered', 'Upcoming step')}
  </ProgressTracker>
);

export const withCompletedSteps = () => (
  <ProgressTracker activeStep="onItsWay">
    {step('confirmed', 'Past step')}
    {step('onItsWay', 'Current step')}
    {step('outForDelivery', 'Upcoming step')}
    {step('delivered', 'Upcoming step')}
  </ProgressTracker>
);

export const withState = () => (
  <ProgressTracker activeStep="outForDelivery">
    {step('confirmed', 'Past step:', false)}
    {step('onItsWay', 'Past step:', false)}
    {step('outForDelivery', 'Current step:', false)}
    {step('delivered', 'Upcoming step:', false)}
  </ProgressTracker>
);

export const withColor = () => (
  <ProgressTracker activeStep="failure">
    {step('confirmed', 'Past step:')}
    {step('onItsWay', 'Past step:')}
    {step('outForDelivery', 'Past step:')}
    {step('failure', 'Current step:')}
  </ProgressTracker>
);
