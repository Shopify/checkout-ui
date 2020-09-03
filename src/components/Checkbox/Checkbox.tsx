import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {CheckboxProps} from '@shopify/argo-checkout';

import {Icon} from '../Icon';
import {VisuallyHidden} from '../VisuallyHidden';
import {HiddenForAccessibility} from '../HiddenForAccessibility';
import {InlineError} from '../InlineError';
import {useThemeConfiguration} from '../Theme';
import {useId, createIdCreator} from '../../utilities/id';
import {errorId} from '../../utilities/errors';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Checkbox.css';

type Props = PropsWithChildren<CheckboxProps>;

const createId = createIdCreator('Checkbox');

export function Checkbox({
  id: explicitId,
  accessibilityLabel,
  error,
  disabled,
  children,
  ...rest
}: Props) {
  const id = useId(explicitId, createId);
  const {
    checkbox: {errorIndentation, errorTypographyStyle},
  } = useThemeConfiguration();

  const errorMarkup = error ? (
    <div
      className={classNames(
        styles.Error,
        errorTypographyStyle && typographyStyles[errorTypographyStyle],
      )}
    >
      <InlineError controlID={id}>{error}</InlineError>
    </div>
  ) : null;

  const labelClassName = classNames(
    styles.Label,
    disabled && styles['Label-isDisabled'],
  );

  const hasError = Boolean(error);

  return (
    <div
      className={classNames(
        styles.Wrapper,
        hasError && styles.hasError,
        hasError &&
          errorIndentation &&
          styles[variationName('errorIndentation', errorIndentation)],
      )}
    >
      <CheckboxControl
        id={id}
        name={name}
        error={Boolean(error)}
        disabled={disabled}
        {...rest}
      />
      <label htmlFor={id} className={labelClassName}>
        {accessibilityLabel ? (
          <>
            <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
            <HiddenForAccessibility>{children}</HiddenForAccessibility>
          </>
        ) : (
          children
        )}
      </label>
      {errorMarkup}
    </div>
  );
}

interface ControlProps
  extends Omit<Props, 'id' | 'error' | 'children' | 'accessibilityLabel'> {
  error?: boolean;
  id: string;
}

export function CheckboxControl({
  id,
  name,
  value = false,
  checked = value,
  disabled,
  error = false,
  onChange,
}: ControlProps) {
  const {
    checkbox: {background = 'surfaceTertiary', borderColor = 'base'},
  } = useThemeConfiguration();

  const className = classNames(
    styles.Input,
    error && styles['Input-hasError'],
    disabled && styles['Input-isDisabled'],
    styles[variationName('Input-background', background)],
    styles[variationName('Input-borderColor', borderColor)],
  );

  return (
    <div className={styles.Checkbox}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={({currentTarget}) => {
          onChange?.(currentTarget.checked);
        }}
        className={className}
        aria-describedby={error ? errorId(id) : undefined}
        aria-invalid={error}
      />
      <div className={styles.Icon}>
        <Icon source="checkmark" size="small" />
      </div>
    </div>
  );
}
