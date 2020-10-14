import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {ProgressTrackerContext} from './context';
import {ProgressTracker} from './ProgressTracker';

import {ProgressTrackerStep} from '.';

describe('<ProgressTracker />', () => {
  it('renders <ProgressTrackerStep /> children', () => {
    const progressTracker = mount(
      <ProgressTracker>
        <ProgressTrackerStep
          id="step1"
          icon="checkmark"
          label="Step 1"
          state="State 1"
        />
        <ProgressTrackerStep
          id="step2"
          icon="checkmark"
          label="Step 2"
          state="State 2"
        />
      </ProgressTracker>,
    );

    expect(progressTracker).toContainReactComponent(ProgressTrackerStep);
    expect(progressTracker).toContainReactComponentTimes(
      ProgressTrackerStep,
      2,
    );
  });

  it('wraps <ProgressTrackerStep /> children with ProgressTrackerContext', () => {
    const progressTracker = mount(
      <ProgressTracker activeStep="step2">
        <ProgressTrackerStep
          id="step1"
          icon="checkmark"
          label="Step 1"
          state="State 1"
        />
        <ProgressTrackerStep
          id="step2"
          icon="checkmark"
          label="Step 2"
          state="State 3"
        />
        <ProgressTrackerStep
          id="step3"
          icon="checkmark"
          label="Step 3"
          state="State 3"
        />
      </ProgressTracker>,
    );

    expect(progressTracker).toProvideReactContext(ProgressTrackerContext, {
      steps: {
        step1: {active: false, completed: true},
        step2: {active: true, completed: false},
        step3: {active: false, completed: false},
      },
    });
  });
});
