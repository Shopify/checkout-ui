import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {RadioProps} from '@shopify/argo-checkout';

import {HiddenForAccessibility} from '../HiddenForAccessibility';
import {VisuallyHidden} from '../VisuallyHidden';
import {useThemeConfiguration} from '../Theme';
import {useId, createIdCreator} from '../../utilities/id';

import styles from './Radio.css';

const createId = createIdCreator('Radio');

export function Radio({
  id: explicitId,
  accessibilityLabel,
  children,
  disabled,
  ...rest
}: PropsWithChildren<RadioProps>) {
  const id = useId(explicitId, createId);

  const className = classNames(
    styles.Label,
    disabled && styles['Label-isDisabled'],
  );

  return (
    <div className={styles.Wrapper}>
      <RadioControl id={id} disabled={disabled} {...rest} />
      <label htmlFor={id} className={className}>
        {accessibilityLabel ? (
          <>
            <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
            <HiddenForAccessibility>{children}</HiddenForAccessibility>
          </>
        ) : (
          children
        )}
      </label>
    </div>
  );
}

interface ControlProps
  extends Omit<RadioProps, 'id' | 'error' | 'children' | 'accessibilityLabel'> {
  id: string;
}

export const RadioControl = ({
  id,
  name,
  value = false,
  checked = value,
  disabled,
  onChange,
}: ControlProps) => {
  const {
    radio: {background = 'surfaceTertiary', borderColor = 'base'},
  } = useThemeConfiguration();

  const className = classNames(
    styles.Input,
    disabled && styles['Input-isDisabled'],
    styles[variationName('Input-background', background)],
    styles[variationName('Input-borderColor', borderColor)],
  );

  return (
    <div className={styles.Radio}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={({currentTarget}) => {
          onChange?.(currentTarget.checked);
        }}
        className={className}
      />
    </div>
  );
};
