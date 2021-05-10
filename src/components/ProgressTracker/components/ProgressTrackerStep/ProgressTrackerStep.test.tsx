import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {TextBlock} from '../../../TextBlock';
import {ProgressTracker} from '../../ProgressTracker';
import {View} from '../../../View';

import {
  ProgressTrackerStep,
  Props,
  ProgressTrackerStepIcon,
  ProgressTrackerStepLabel,
  ProgressTrackerStepConnector,
} from './ProgressTrackerStep';

const defaultProps = (id: number): Props => ({
  id: `step${id}`,
  icon: 'checkmark',
  label: `Step ${id}`,
  state: `State ${id}`,
});

describe('<ProgressTrackerStep />', () => {
  it('renders a <ProgressTrackerStepConnector /> except for first ProgressTrackerStep', () => {
    const progressTracker = mount(
      <ProgressTracker activeStep="step3">
        <ProgressTrackerStep {...defaultProps(1)} />
        <ProgressTrackerStep {...defaultProps(2)} />
        <ProgressTrackerStep {...defaultProps(3)} />
      </ProgressTracker>,
    );

    const [
      firstProgressTrackerStep,
      secondProgressTrackerStep,
      finalProgressTrackerStep,
    ] = progressTracker.findAll(ProgressTrackerStep);

    expect(firstProgressTrackerStep).not.toContainReactComponent(
      ProgressTrackerStepConnector,
    );
    expect(secondProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepConnector,
      {
        active: false,
        completed: true,
      },
    );
    expect(finalProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepConnector,
      {
        active: true,
        completed: false,
      },
    );
  });

  it('renders <ProgressTrackerStepIcon />', () => {
    const progressTracker = mount(
      <ProgressTracker activeStep="step2">
        <ProgressTrackerStep {...defaultProps(1)} />
        <ProgressTrackerStep {...defaultProps(2)} />
        <ProgressTrackerStep {...defaultProps(3)} iconAppearance="critical" />
      </ProgressTracker>,
    );

    const [
      firstProgressTrackerStep,
      secondProgressTrackerStep,
      finalProgressTrackerStep,
    ] = progressTracker.findAll(ProgressTrackerStep);

    expect(firstProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepIcon,
      {
        active: false,
        completed: true,
        source: 'checkmark',
      },
    );
    expect(secondProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepIcon,
      {
        active: true,
        completed: false,
        source: 'checkmark',
      },
    );
    expect(finalProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepIcon,
      {
        active: false,
        completed: false,
        source: 'checkmark',
        appearance: 'critical',
      },
    );
  });

  it('renders <ProgressTrackerStepLabel /> with state', () => {
    const progressTracker = mount(
      <ProgressTracker>
        <ProgressTrackerStep {...defaultProps(1)} />
        <ProgressTrackerStep {...defaultProps(2)} stateHidden={false} />
      </ProgressTracker>,
    );

    const [
      firstProgressTrackerStep,
      finalProgressTrackerStep,
    ] = progressTracker.findAll(ProgressTrackerStep);

    expect(firstProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepLabel,
      {
        state: 'State 1',
      },
    );
    expect(finalProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepLabel,
      {
        state: 'State 2',
      },
    );

    expect(firstProgressTrackerStep).toContainReactComponent(View, {
      visibility: 'hidden',
    });
    expect(firstProgressTrackerStep).toContainReactComponentTimes(TextBlock, 1);

    expect(finalProgressTrackerStep).not.toContainReactComponent(View, {
      visibility: 'hidden',
    });
    expect(finalProgressTrackerStep).toContainReactComponentTimes(TextBlock, 2);

    expect(
      firstProgressTrackerStep.find(View, {visibility: 'hidden'}),
    ).toContainReactText('State 1');
    expect(finalProgressTrackerStep.find(TextBlock)).toContainReactText(
      'State 2',
    );
  });

  it('renders <ProgressTrackerStepLabel /> with label or description', () => {
    const progressTracker = mount(
      <ProgressTracker activeStep="step2">
        <ProgressTrackerStep {...defaultProps(1)} description="Description 1" />
        <ProgressTrackerStep {...defaultProps(2)} description="Description 2" />
        <ProgressTrackerStep {...defaultProps(3)} />
      </ProgressTracker>,
    );

    const [
      firstProgressTrackerStep,
      secondProgressTrackerStep,
      finalProgressTrackerStep,
    ] = progressTracker.findAll(ProgressTrackerStep);

    expect(firstProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepLabel,
      {
        label: 'Step 1',
        description: 'Description 1',
      },
    );
    expect(secondProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepLabel,
      {
        label: 'Step 2',
        description: 'Description 2',
      },
    );
    expect(finalProgressTrackerStep).toContainReactComponent(
      ProgressTrackerStepLabel,
      {
        label: 'Step 3',
      },
    );

    expect(firstProgressTrackerStep.find(TextBlock)).toContainReactText(
      'Step 1',
    );
    expect(secondProgressTrackerStep.find(TextBlock)).toContainReactText(
      'Step 2',
    );
    expect(finalProgressTrackerStep.find(TextBlock)).toContainReactText(
      'Step 3',
    );

    expect(firstProgressTrackerStep).toContainReactComponentTimes(TextBlock, 2);
    expect(secondProgressTrackerStep).toContainReactComponentTimes(
      TextBlock,
      2,
    );
    expect(finalProgressTrackerStep).toContainReactComponentTimes(TextBlock, 1);
  });

  it('renders a <li> with a aria-current attribute', () => {
    const progressTracker = mount(
      <ProgressTracker activeStep="step2">
        <ProgressTrackerStep {...defaultProps(1)} />
        <ProgressTrackerStep {...defaultProps(2)} />
        <ProgressTrackerStep {...defaultProps(3)} />
      </ProgressTracker>,
    );

    const [
      firstProgressTrackerStep,
      secondProgressTrackerStep,
      finalProgressTrackerStep,
    ] = progressTracker.findAll(ProgressTrackerStep);

    expect(firstProgressTrackerStep).toContainReactComponent('li', {
      'aria-current': false,
    });
    expect(secondProgressTrackerStep).toContainReactComponent('li', {
      'aria-current': true,
    });
    expect(finalProgressTrackerStep).toContainReactComponent('li', {
      'aria-current': false,
    });
  });
});
