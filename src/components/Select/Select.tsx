import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {SelectProps} from '@shopify/argo-checkout';

import {View} from '../View';
import {InlineError} from '../InlineError';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {Truncate} from '../Truncate';
import {BlockStack} from '../BlockStack';
import {useThemeConfiguration} from '../Theme';
import {autocompleteToHtml} from '../../utilities/autocomplete';
import {useId, createIdCreator} from '../../utilities/id';
import {errorId} from '../../utilities/errors';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Select.css';

export const PLACEHOLDER_VALUE = '';

const createId = createIdCreator('Select');

export function Select({
  id: explicitId,
  name,
  label,
  options,
  value = PLACEHOLDER_VALUE,
  disabled,
  required,
  error,
  autocomplete,
  placeholder,
  onChange,
}: SelectProps) {
  const {
    select: {
      labelPosition = 'inside',
      background = 'surfaceTertiary',
      border = 'full',
      borderColor = 'base',
      focusBorder = 'full',
      disclosureIcon = 'caretDown',
      disclosureIconSeparator,
      typographyStyle,
    },
    label: {typographyStyle: labelTypographyStyle},
  } = useThemeConfiguration();

  const id = useId(explicitId, createId);

  const errorMarkup = error && (
    <InlineError controlID={id}>{error}</InlineError>
  );

  const className = classNames(
    styles.Select,
    Boolean(error) && styles.hasError,
    disabled && styles['Select-isDisabled'],
    labelPosition === 'outside' && styles['Select-hasOutsideLabel'],
    styles[variationName('Select-background', background)],
    styles[variationName('Select-border', border)],
    styles[variationName('Select-borderColor', borderColor)],
    styles[variationName('Select-focusBorder', focusBorder)],
    typographyStyle && typographyStyles[typographyStyle],
  );

  const labelMarkup = (
    <label
      className={classNames(
        styles.Label,
        styles[variationName('Label-position', labelPosition)],
        {
          [styles['Label-isPlaceholder']]:
            value === PLACEHOLDER_VALUE && placeholder === label,
        },
        background && styles[variationName('Label-onBackground', background)],
      )}
      htmlFor={id}
    >
      <Text
        size={
          !(value === PLACEHOLDER_VALUE && placeholder === label) ||
          labelPosition === 'outside'
            ? 'small'
            : undefined
        }
        subdued
        style={labelTypographyStyle}
      >
        <Truncate>{label}</Truncate>
      </Text>
    </label>
  );

  return (
    <BlockStack spacing="tight">
      <View>
        {labelPosition === 'outside' && labelMarkup}
        <div className={styles.Wrapper}>
          {labelPosition === 'inside' && labelMarkup}
          <select
            name={name}
            id={id}
            disabled={disabled}
            onChange={(event) => onChange?.(event.target.value)}
            required={required}
            value={value}
            className={className}
            aria-describedby={error ? errorId(id) : undefined}
            aria-invalid={Boolean(error)}
            autoComplete={autocompleteToHtml(autocomplete)}
          >
            {placeholder &&
              (value === PLACEHOLDER_VALUE || placeholder !== label) && (
                <option
                  value={PLACEHOLDER_VALUE}
                  hidden={placeholder === label}
                  disabled
                >
                  {placeholder === label ? <>&nbsp;</> : placeholder}
                </option>
              )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div
            className={classNames(
              styles.Selector,
              disclosureIconSeparator && styles['Selector-separated'],
              disclosureIconSeparator &&
                styles[variationName('Selector-borderColor', borderColor)],
            )}
          >
            <Icon source={disclosureIcon} size="small" />
          </div>
        </div>
      </View>
      {errorMarkup}
    </BlockStack>
  );
}
