import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  HTMLProps,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextFieldProps} from '@shopify/argo-checkout';

import {Icon} from '../Icon';
import {VisuallyHidden} from '../VisuallyHidden';
import {useLabelled, Labelled} from '../Labelled';
import {Text} from '../Text';
import {Tooltip} from '../Tooltip';
import {InlineError} from '../InlineError';
import {BlockStack} from '../BlockStack';
import {useThemeConfiguration} from '../Theme';
import typographyStyles from '../../utilities/typography-styles.css';
import {isEmptyString} from '../../utilities/strings';
import {createIdCreator, useId} from '../../utilities/id';
import {errorId} from '../../utilities/errors';
import {autocompleteToHtml} from '../../utilities/autocomplete';

import styles from './TextField.css';

const createId = createIdCreator('TextField');

export interface Props extends TextFieldProps {
  /* A detailed description for screen readers. */
  accessibilityDescription?: string;
  /* Automatically focus on this element on first render. */
  autofocus?: boolean;
}

/**
 * A text field is an input field that merchants can type into.
 */
export const TextField = forwardRef((props: Props, ref) => {
  const {
    textFields: {labelPosition, background = 'surfaceTertiary'},
  } = useThemeConfiguration();

  const {
    accessibilityDescription,
    error,
    id: explicitId,
    label,
    tooltip,
    value: explicitValue,
  } = props;

  const id = useId(explicitId, createId);
  const descriptionId = accessibilityDescription
    ? `${id}-description`
    : undefined;
  const description = descriptionId ? (
    <VisuallyHidden>
      <Text id={descriptionId}>{accessibilityDescription}</Text>
    </VisuallyHidden>
  ) : null;

  const errorMarkup = error && (
    <InlineError controlID={id}>{error}</InlineError>
  );

  const tooltipMarkup = tooltip ? (
    <div className={styles.Tooltip}>
      <Tooltip content={tooltip.content}>
        <VisuallyHidden>{tooltip.label}</VisuallyHidden>
        <Icon source="questionFill" size="large" color="subdued" />
      </Tooltip>
    </div>
  ) : null;

  return (
    <BlockStack spacing="tight">
      <Labelled
        label={label}
        htmlFor={id}
        isEmpty={isEmptyString(explicitValue)}
        position={labelPosition}
        background={background}
      >
        <div className={styles.Wrapper}>
          {description}
          <Field ref={ref} {...props} id={id} ariaDescribedBy={descriptionId} />
          {tooltipMarkup}
        </div>
      </Labelled>
      {errorMarkup}
    </BlockStack>
  );
});

interface FieldProps extends Omit<TextFieldProps, 'id'> {
  id: string;
  ariaActiveDescendant?: string;
  ariaAutocomplete?: string;
  ariaControls?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  autofocus?: boolean;
  role?: string;
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

export const Field = forwardRef(
  (
    {
      id,
      name,
      label,
      value: explicitValue,
      type = 'text',
      role,
      required,
      error,
      tooltip,
      autocomplete,
      autofocus,
      multiline,
      ariaActiveDescendant,
      ariaAutocomplete,
      ariaControls,
      ariaDescribedBy,
      ariaExpanded,
      onFocus,
      onBlur,
      onChange,
      onInput,
      onKeyDown,
    }: FieldProps,
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement | HTMLTextAreaElement>();
    const refsSetter = useCallback(
      (instance: HTMLInputElement | HTMLTextAreaElement) => {
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
        innerRef.current = instance;
      },
      [ref],
    );

    useEffect(() => {
      if (autofocus) {
        innerRef.current?.focus();
      }
    }, [autofocus]);

    const {
      textFields: {
        labelPosition = 'inside',
        background = 'surfaceTertiary',
        border = 'full',
        borderColor = 'base',
        focusBorder = 'full',
        typographyStyle: style,
      },
    } = useThemeConfiguration();

    const labelled = useLabelled();

    const [localValue, setLocalValue] = usePartiallyControlledState(
      explicitValue,
    );

    const className = classNames(
      styles.Field,
      Boolean(error) && styles.hasError,
      Boolean(tooltip) && styles['Field-hasTooltip'],
      labelled.isFloating &&
        labelPosition !== 'outside' &&
        styles['Field-isFloating'],

      styles[variationName('Field-background', background)],
      styles[variationName('Field-border', border)],
      styles[variationName('Field-borderColor', borderColor)],
      styles[variationName('Field-focusBorder', focusBorder)],
      style && typographyStyles[style],
    );

    const finalDescribedBy = [ariaDescribedBy, error && errorId(id)]
      .filter(Boolean)
      .join(' ');

    const field = React.createElement(multiline ? 'textarea' : 'input', {
      id,
      name,
      placeholder:
        labelled.isFloating || labelPosition === 'outside' ? undefined : label,
      className,
      required,
      type: normalizeType(multiline ? undefined : type),
      'aria-activedescendant': ariaActiveDescendant,
      'aria-autocomplete': ariaAutocomplete,
      'aria-controls': ariaControls,
      'aria-describedby': finalDescribedBy,
      'aria-expanded': ariaExpanded,
      'aria-invalid': Boolean(error),
      'aria-required': required,
      onBlur: ({currentTarget: {value}}) => {
        const currentValue = explicitValue ?? '';
        if (value !== currentValue) onChange?.(value);

        onBlur?.();
        labelled.onBlur();
      },
      onChange({currentTarget: {value}}) {
        setLocalValue(value);
        onInput?.(value);
        labelled.onChange(isEmptyString(value));
      },
      onFocus: () => {
        onFocus?.();
        labelled.onFocus();
      },
      onKeyDown,
      ref: refsSetter,
      role,
      value: localValue,
      autoComplete: autocompleteToHtml(autocomplete),
      autofocus,
    } as HTMLProps<HTMLInputElement>);

    return field;
  },
);

function usePartiallyControlledState(value?: string) {
  const [localValue, setLocalValue] = useState(value);
  const lastExplicitValue = useRef(value);

  let valueToReturn = localValue;

  if (lastExplicitValue.current !== value) {
    lastExplicitValue.current = value;
    setLocalValue(value);
    valueToReturn = value;
  }

  return [valueToReturn, setLocalValue] as const;
}

// Takes the `type` we allow for a TextField props, and maps it to the
// valid type for an HTML input. Currently, the only difference is
// that we use the full word `telephone` instead of `tel`.
function normalizeType(type?: TextFieldProps['type']) {
  return type === 'telephone' ? 'tel' : type;
}
