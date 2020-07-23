import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {Stepper} from './Stepper';
import {StepperContext} from './context';

import {StepperStep} from '.';

describe('<Stepper />', () => {
  it('renders <StepperStep /> children', () => {
    const stepper = mount(
      <Stepper>
        <StepperStep
          id="step1"
          icon="checkmark"
          label="Step 1"
          state="State 1"
        />
        <StepperStep
          id="step2"
          icon="checkmark"
          label="Step 2"
          state="State 2"
        />
      </Stepper>,
    );

    expect(stepper).toContainReactComponent(StepperStep);
    expect(stepper).toContainReactComponentTimes(StepperStep, 2);
  });

  it('wraps <StepperStep /> children with StepperContext', () => {
    const stepper = mount(
      <Stepper activeStep="step2">
        <StepperStep
          id="step1"
          icon="checkmark"
          label="Step 1"
          state="State 1"
        />
        <StepperStep
          id="step2"
          icon="checkmark"
          label="Step 2"
          state="State 3"
        />
        <StepperStep
          id="step3"
          icon="checkmark"
          label="Step 3"
          state="State 3"
        />
      </Stepper>,
    );

    expect(stepper).toProvideReactContext(StepperContext, {
      steps: {
        step1: {active: false, completed: true},
        step2: {active: true, completed: false},
        step3: {active: false, completed: false},
      },
    });
  });
});
