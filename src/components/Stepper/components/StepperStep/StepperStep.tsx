import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {Icon, Props as IconProps} from '../../../Icon';
import {TextBlock} from '../../../TextBlock';
import {VisuallyHidden} from '../../../VisuallyHidden';
import {useStepper} from '../../hooks';

import styles from './StepperStep.css';

export interface Props {
  children?: React.ReactNode;
  description?: string;
  icon: IconProps['source'];
  iconColor?: IconProps['color'];
  id: string;
  label: string;
  state: string;
  stateHidden?: boolean;
}

export function StepperStep({
  children,
  description,
  icon,
  iconColor,
  id,
  label,
  state,
  stateHidden = true,
}: Props) {
  const {steps} = useStepper();

  const first = Object.keys(steps).indexOf(id) === 0;
  const {
    [id]: {active, completed},
  } = steps;

  const className = classNames(
    styles.StepperStep,
    completed && styles.Completed,
  );

  return (
    <>
      {!first && <StepperStepConnector active={active} completed={completed} />}
      <li className={className} aria-current={active}>
        <StepperStepIcon
          active={active}
          completed={completed}
          source={icon}
          color={iconColor}
        />
        <StepperStepLabel
          active={active}
          completed={completed}
          description={description}
          label={label}
          state={state}
          stateHidden={stateHidden}
        />
        {children}
      </li>
    </>
  );
}

export interface StepperStepIconProps {
  active: boolean;
  color?: IconProps['color'];
  source: IconProps['source'];
  completed: boolean;
}
export function StepperStepIcon({
  active,
  color = 'interactive',
  source,
  completed,
}: StepperStepIconProps) {
  const className = classNames(
    styles.StepperStepIcon,
    active && styles.active,
    completed && styles.completed,
  );

  return (
    <div className={className}>
      <Icon
        source={source}
        color={active || completed ? color : 'subdued'}
        size="large"
      />
    </div>
  );
}

interface StepperStepLabelProps {
  active: boolean;
  completed: boolean;
  description?: string;
  label: string;
  state: string;
  stateHidden: boolean;
}

export function StepperStepLabel({
  active,
  completed,
  description,
  label,
  state,
  stateHidden,
}: StepperStepLabelProps) {
  const className = classNames(
    styles.StepperStepLabel,
    (active || completed) && styles.completed,
  );

  return (
    <>
      <div className={className}>
        {stateHidden ? (
          <VisuallyHidden>{state}</VisuallyHidden>
        ) : (
          <TextBlock>{state}</TextBlock>
        )}
        <TextBlock emphasized={active || completed}>{label}</TextBlock>
      </div>
      {(active || completed) && description && (
        <TextBlock size="small" subdued>
          {description}
        </TextBlock>
      )}
    </>
  );
}

interface StepperStepConnectorProps {
  active: boolean;
  completed: boolean;
}

export function StepperStepConnector({
  active,
  completed,
}: StepperStepConnectorProps) {
  const className = classNames(
    styles.StepperStepConnector,
    (active || completed) && styles.completed,
  );

  return <li className={className} aria-hidden />;
}
