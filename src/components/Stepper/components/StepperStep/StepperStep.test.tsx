import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {TextBlock} from '../../../TextBlock';
import {Stepper} from '../../Stepper';
import {VisuallyHidden} from '../../../VisuallyHidden';

import {
  StepperStep,
  Props,
  StepperStepIcon,
  StepperStepLabel,
  StepperStepConnector,
} from './StepperStep';

const defaultProps = (id: number): Props => ({
  id: `step${id}`,
  icon: 'checkmark',
  label: `Step ${id}`,
  state: `State ${id}`,
});

describe('<StepperStep />', () => {
  it('renders a <StepperStepConnector /> except for first StepperStep', () => {
    const stepper = mount(
      <Stepper activeStep="step3">
        <StepperStep {...defaultProps(1)} />
        <StepperStep {...defaultProps(2)} />
        <StepperStep {...defaultProps(3)} />
      </Stepper>,
    );

    const [
      firstStepperStep,
      secondStepperStep,
      finalStepperStep,
    ] = stepper.findAll(StepperStep);

    expect(firstStepperStep).not.toContainReactComponent(StepperStepConnector);
    expect(secondStepperStep).toContainReactComponent(StepperStepConnector, {
      active: false,
      completed: true,
    });
    expect(finalStepperStep).toContainReactComponent(StepperStepConnector, {
      active: true,
      completed: false,
    });
  });

  it('renders <StepperStepIcon />', () => {
    const stepper = mount(
      <Stepper activeStep="step2">
        <StepperStep {...defaultProps(1)} />
        <StepperStep {...defaultProps(2)} />
        <StepperStep {...defaultProps(3)} iconColor="critical" />
      </Stepper>,
    );

    const [
      firstStepperStep,
      secondStepperStep,
      finalStepperStep,
    ] = stepper.findAll(StepperStep);

    expect(firstStepperStep).toContainReactComponent(StepperStepIcon, {
      active: false,
      completed: true,
      source: 'checkmark',
    });
    expect(secondStepperStep).toContainReactComponent(StepperStepIcon, {
      active: true,
      completed: false,
      source: 'checkmark',
    });
    expect(finalStepperStep).toContainReactComponent(StepperStepIcon, {
      active: false,
      completed: false,
      source: 'checkmark',
      color: 'critical',
    });
  });

  it('renders <StepperStepLabel /> with state', () => {
    const stepper = mount(
      <Stepper>
        <StepperStep {...defaultProps(1)} />
        <StepperStep {...defaultProps(2)} stateHidden={false} />
      </Stepper>,
    );

    const [firstStepperStep, finalStepperStep] = stepper.findAll(StepperStep);

    expect(firstStepperStep).toContainReactComponent(StepperStepLabel, {
      state: 'State 1',
    });
    expect(finalStepperStep).toContainReactComponent(StepperStepLabel, {
      state: 'State 2',
    });

    expect(firstStepperStep).toContainReactComponent(VisuallyHidden);
    expect(firstStepperStep).toContainReactComponentTimes(TextBlock, 1);

    expect(finalStepperStep).not.toContainReactComponent(VisuallyHidden);
    expect(finalStepperStep).toContainReactComponentTimes(TextBlock, 2);

    expect(firstStepperStep.find(VisuallyHidden)).toContainReactText('State 1');
    expect(finalStepperStep.find(TextBlock)).toContainReactText('State 2');
  });

  it('renders <StepperStepLabel /> with label or description', () => {
    const stepper = mount(
      <Stepper activeStep="step2">
        <StepperStep {...defaultProps(1)} description="Description 1" />
        <StepperStep {...defaultProps(2)} description="Description 2" />
        <StepperStep {...defaultProps(3)} />
      </Stepper>,
    );

    const [
      firstStepperStep,
      secondStepperStep,
      finalStepperStep,
    ] = stepper.findAll(StepperStep);

    expect(firstStepperStep).toContainReactComponent(StepperStepLabel, {
      label: 'Step 1',
      description: 'Description 1',
    });
    expect(secondStepperStep).toContainReactComponent(StepperStepLabel, {
      label: 'Step 2',
      description: 'Description 2',
    });
    expect(finalStepperStep).toContainReactComponent(StepperStepLabel, {
      label: 'Step 3',
    });

    expect(firstStepperStep.find(TextBlock)).toContainReactText('Step 1');
    expect(secondStepperStep.find(TextBlock)).toContainReactText('Step 2');
    expect(finalStepperStep.find(TextBlock)).toContainReactText('Step 3');

    expect(firstStepperStep).toContainReactComponentTimes(TextBlock, 2);
    expect(secondStepperStep).toContainReactComponentTimes(TextBlock, 2);
    expect(finalStepperStep).toContainReactComponentTimes(TextBlock, 1);
  });

  it('renders a <li> with a aria-current attribute', () => {
    const stepper = mount(
      <Stepper activeStep="step2">
        <StepperStep {...defaultProps(1)} />
        <StepperStep {...defaultProps(2)} />
        <StepperStep {...defaultProps(3)} />
      </Stepper>,
    );

    const [
      firstStepperStep,
      secondStepperStep,
      finalStepperStep,
    ] = stepper.findAll(StepperStep);

    expect(firstStepperStep).toContainReactComponent('li', {
      'aria-current': false,
    });
    expect(secondStepperStep).toContainReactComponent('li', {
      'aria-current': true,
    });
    expect(finalStepperStep).toContainReactComponent('li', {
      'aria-current': false,
    });
  });
});
