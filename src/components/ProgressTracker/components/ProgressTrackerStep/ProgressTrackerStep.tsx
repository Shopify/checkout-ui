import React from 'react';
import {classNames} from '@shopify/css-utilities';
import {IconProps} from '@shopify/checkout-ui-extensions';

import {Icon} from '../../../Icon';
import {TextBlock} from '../../../TextBlock';
import {View} from '../../../View';
import {useProgressTracker} from '../../hooks';

import styles from './ProgressTrackerStep.css';

export interface Props {
  children?: React.ReactNode;
  description?: string;
  icon: IconProps['source'];
  iconAppearance?: IconProps['appearance'];
  id: string;
  label: string;
  state: string;
  stateHidden?: boolean;
}

export function ProgressTrackerStep({
  children,
  description,
  icon,
  iconAppearance,
  id,
  label,
  state,
  stateHidden = true,
}: Props) {
  const {steps} = useProgressTracker();

  const first = Object.keys(steps).indexOf(id) === 0;
  const {
    [id]: {active, completed},
  } = steps;

  const className = classNames(
    styles.ProgressTrackerStep,
    completed && styles.Completed,
  );

  return (
    <>
      {!first && (
        <ProgressTrackerStepConnector active={active} completed={completed} />
      )}
      <li className={className} aria-current={active}>
        <ProgressTrackerStepIcon
          active={active}
          completed={completed}
          source={icon}
          appearance={iconAppearance}
        />
        <ProgressTrackerStepLabel
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

export interface ProgressTrackerStepIconProps {
  active: boolean;
  appearance?: IconProps['appearance'];
  source: IconProps['source'];
  completed: boolean;
}
export function ProgressTrackerStepIcon({
  active,
  appearance = 'info',
  source,
  completed,
}: ProgressTrackerStepIconProps) {
  const className = classNames(
    styles.ProgressTrackerStepIcon,
    active && styles.active,
    completed && styles.completed,
  );

  return (
    <div className={className}>
      <Icon
        source={source}
        appearance={active || completed ? appearance : 'subdued'}
        size="large"
      />
    </div>
  );
}

interface ProgressTrackerStepLabelProps {
  active: boolean;
  completed: boolean;
  description?: string;
  label: string;
  state: string;
  stateHidden: boolean;
}

export function ProgressTrackerStepLabel({
  active,
  completed,
  description,
  label,
  state,
  stateHidden,
}: ProgressTrackerStepLabelProps) {
  const className = classNames(
    styles.ProgressTrackerStepLabel,
    (active || completed) && styles.completed,
  );

  return (
    <>
      <div className={className}>
        {stateHidden ? (
          <View visibility="hidden">{state}</View>
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

interface ProgressTrackerStepConnectorProps {
  active: boolean;
  completed: boolean;
}

export function ProgressTrackerStepConnector({
  active,
  completed,
}: ProgressTrackerStepConnectorProps) {
  const className = classNames(
    styles.ProgressTrackerStepConnector,
    (active || completed) && styles.completed,
  );

  return <li className={className} aria-hidden />;
}
