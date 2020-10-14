import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {SelectProps as SelectPropsArgo} from '@shopify/argo-checkout';

import {View} from '../View';
import {InlineError} from '../InlineError';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {Truncate} from '../Truncate';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';
import {
  useThemeConfiguration,
  ThemeLabelPosition,
  ThemeBorder,
  ThemeBackground,
} from '../Theme';
import {autocompleteToHtml} from '../../utilities/autocomplete';
import {useId, createIdCreator} from '../../utilities/id';
import {errorId} from '../../utilities/errors';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Select.css';

export const PLACEHOLDER_VALUE = '';

const createId = createIdCreator('Select');

export interface SelectProps extends SelectPropsArgo {
  /* Whether the field is read only */
  readonly?: boolean;
  labelPosition?: ThemeLabelPosition | 'inline';
  background?: ThemeBackground;
  border?: ThemeBorder;
  disclosureIconSeparator?: boolean;
}

export function Select({
  id: explicitId,
  name,
  label,
  labelPosition,
  options,
  value = PLACEHOLDER_VALUE,
  disabled,
  readonly,
  required,
  error,
  autocomplete,
  placeholder,
  onChange,
  border,
  background,
  disclosureIconSeparator,
}: SelectProps) {
  const {
    select: {
      labelPosition: themeLabelPosition = 'inside',
      background: themeBackground = 'surfaceTertiary',
      border: themeBorder = 'full',
      borderColor = 'base',
      focusBorder = 'full',
      disclosureIcon = 'caretDown',
      disclosureIconSeparator: themeDisclosureIconSeparator = true,
      typographyStyle,
      errorIndentation,
      errorTypographyStyle,
    },
    label: {typographyStyle: labelTypographyStyle},
  } = useThemeConfiguration();

  const finalLabelPosition = labelPosition ?? themeLabelPosition;
  const finalBorder = border ?? themeBorder;
  const finalDisclosureIconSeparator =
    disclosureIconSeparator ?? themeDisclosureIconSeparator;
  const finalBackground = background ?? themeBackground;

  const id = useId(explicitId, createId);

  const errorMarkup = error && (
    <span
      className={
        (errorIndentation &&
          styles[variationName('Error-errorIndentation', errorIndentation)],
        errorTypographyStyle && typographyStyles[errorTypographyStyle])
      }
    >
      <InlineError controlID={id}>{error}</InlineError>
    </span>
  );

  const className = classNames(
    styles.Select,
    Boolean(error) && styles.hasError,
    disabled && styles['Select-isDisabled'],
    readonly && styles['Select-isReadOnly'],
    styles[variationName('Select-label', finalLabelPosition)],
    styles[variationName('Select-background', finalBackground)],
    styles[variationName('Select-border', finalBorder)],
    styles[variationName('Select-borderColor', borderColor)],
    styles[variationName('Select-focusBorder', focusBorder)],
    typographyStyle && typographyStyles[typographyStyle],
  );

  const labelMarkup = (
    <label
      className={classNames(
        styles.Label,
        styles[variationName('Label-position', finalLabelPosition)],
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
          finalLabelPosition === 'inside'
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

  const view = (
    <>
      {finalLabelPosition === 'outside' || finalLabelPosition === 'inline'
        ? labelMarkup
        : null}
      <div className={styles.Wrapper}>
        {finalLabelPosition === 'inside' && labelMarkup}
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
              disabled={option.disabled || readonly}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div
          className={classNames(
            styles.Selector,
            finalDisclosureIconSeparator && styles['Selector-separated'],
            finalDisclosureIconSeparator &&
              styles[variationName('Selector-borderColor', borderColor)],
          )}
        >
          <Icon source={disclosureIcon} size="small" />
        </div>
      </div>
    </>
  );

  return (
    <BlockStack spacing="tight">
      {finalLabelPosition === 'inline' ? (
        <InlineStack spacing="xtight" alignment="center">
          {view}
        </InlineStack>
      ) : (
        <View>{view}</View>
      )}
      {errorMarkup}
    </BlockStack>
  );
}
