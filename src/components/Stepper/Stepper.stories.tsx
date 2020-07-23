import React from 'react';

import {Stepper, StepperStep} from '.';

const meta = {
  component: Stepper,
  title: 'Stepper',
};

export default meta;

function step(step: string, state: string, stateHidden = true) {
  switch (step) {
    case 'confirmed':
      return (
        <StepperStep
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
        <StepperStep
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
        <StepperStep
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
        <StepperStep
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
        <StepperStep
          icon="errorFill"
          iconColor="critical"
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
  <Stepper>
    {step('confirmed', 'Current step')}
    {step('onItsWay', 'Upcoming step')}
    {step('outForDelivery', 'Upcoming step')}
    {step('delivered', 'Upcoming step')}
  </Stepper>
);

export const withCompletedSteps = () => (
  <Stepper activeStep="onItsWay">
    {step('confirmed', 'Past step')}
    {step('onItsWay', 'Current step')}
    {step('outForDelivery', 'Upcoming step')}
    {step('delivered', 'Upcoming step')}
  </Stepper>
);

export const withState = () => (
  <Stepper activeStep="outForDelivery">
    {step('confirmed', 'Past step:', false)}
    {step('onItsWay', 'Past step:', false)}
    {step('outForDelivery', 'Current step:', false)}
    {step('delivered', 'Upcoming step:', false)}
  </Stepper>
);

export const withColor = () => (
  <Stepper activeStep="failure">
    {step('confirmed', 'Past step:')}
    {step('onItsWay', 'Past step:')}
    {step('outForDelivery', 'Past step:')}
    {step('failure', 'Current step:')}
  </Stepper>
);
