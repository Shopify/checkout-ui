import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  HTMLProps,
  PropsWithChildren,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextFieldProps} from '@shopify/checkout-ui-extensions';

import {View} from '../View';
import {useLabelled, Labelled} from '../Labelled';
import {Icon} from '../Icon';
import {InlineError} from '../InlineError';
import {BlockStack} from '../BlockStack';
import {useThemeConfiguration} from '../Theme';
import typographyStyles from '../../utilities/typography-styles.css';
import {isEmptyString} from '../../utilities/strings';
import {createIdCreator, useId} from '../../utilities/id';
import {errorId} from '../../utilities/errors';
import {autocompleteToHtml} from '../../utilities/autocomplete';
import {useContainingForm} from '../../utilities/forms';

import styles from './TextField.css';

const createId = createIdCreator('TextField');

export interface Props extends PropsWithChildren<TextFieldProps> {
  /* Automatically focus on this element on first render. */
  autofocus?: boolean;
  maxLength?: number;
}

/**
 * A text field is an input field that merchants can type into.
 */
export const TextField = forwardRef((props: Props, ref) => (
  <TextFieldInternal {...props} ref={ref} />
));

export interface InternalProps extends Omit<Props, 'error'> {
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  ariaActiveDescendant?: string;
  ariaAutocomplete?: string;
  ariaControls?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  role?: string;
  error?: string | boolean;
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

export const TextFieldInternal = forwardRef((props: InternalProps, ref) => {
  const {
    controls: {background: controlsBackground},
    textFields: {
      labelPosition,
      background: textFieldsBackground,
      errorIndentation,
      errorTypographyStyle,
    },
  } = useThemeConfiguration();

  const background =
    textFieldsBackground || controlsBackground || 'surfaceTertiary';

  const {
    accessibilityDescription,
    error,
    id: explicitId,
    label,
    value: explicitValue,
    controlledValue,
    onInput,
    children,
    multiline,
    onChange,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!wrapperRef?.current) return;

    const handleFocus = () => {
      setFocus(true);
    };

    const handleBlur = () => {
      setFocus(false);
    };

    const fields = wrapperRef.current.querySelectorAll(
      'input, textarea, select, button',
    );

    for (const field of fields) {
      field.addEventListener('focus', handleFocus);
      field.addEventListener('blur', handleBlur);
    }

    return () => {
      for (const field of fields) {
        field.removeEventListener('focus', handleFocus);
        field.removeEventListener('blur', handleBlur);
      }
    };
  }, [children]);

  const id = useId(explicitId, createId);
  const descriptionId = accessibilityDescription
    ? `${id}-description`
    : undefined;
  const description = descriptionId ? (
    <View visibility="hidden" id={descriptionId}>
      {accessibilityDescription}
    </View>
  ) : null;

  const [localValue, setLocalValue] = usePartiallyControlledState(
    controlledValue ?? explicitValue,
  );

  const handleInput = useCallback(
    (value) => {
      onInput?.(value);
      setLocalValue(value);
    },
    [onInput, setLocalValue],
  );

  const errorMarkup = error && error !== true && (
    <span
      className={classNames(
        errorIndentation &&
          styles[variationName('Error-errorIndentation', errorIndentation)],
        errorTypographyStyle && typographyStyles[errorTypographyStyle],
      )}
    >
      <InlineError controlID={id}>{error}</InlineError>
    </span>
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (multiline === false || !onChange) {
      return;
    }
    switch (event.key) {
      case 'Enter':
        onChange(event.currentTarget.value);
    }
  }

  return (
    <BlockStack spacing="extraTight">
      <Labelled
        label={label}
        htmlFor={id}
        empty={isEmptyString(localValue)}
        position={labelPosition}
        background={background}
        subdued={props.readonly}
        prefixed={Boolean(props.prefix)}
        hasIcon={Boolean(props.icon)}
      >
        <div
          className={classNames(
            styles.Wrapper,
            props.disabled && styles['Wrapper-disabled'],
            props.readonly && styles['Wrapper-readonly'],
            styles[variationName('Wrapper-background', background)],
          )}
          ref={wrapperRef}
        >
          {description}

          <Field
            ref={ref}
            {...props}
            id={id}
            focus={focus}
            ariaDescribedBy={descriptionId}
            localValue={localValue}
            onInput={handleInput}
            onKeyDown={props.onKeyDown ?? handleKeyDown}
            onBlur={() => {
              /**
               * This is a workaround for `Stepper`
               * Not sure of exact root cause, but with Stepper if you focused on the input, typed a new number, blurred (by tabbing or clicking outside) the input would remain visually focused
               * Stepper's spinbuttons get passed in as children and have a lot of state changes that I think cause `useLayoutEffect` to fire
               * and the work in `useLayoutEffect` is constantly adding and removing the blur event listeners
               */
              if (focus) {
                setFocus(false);
              }
              props?.onBlur?.();
            }}
          />
        </div>
      </Labelled>
      {errorMarkup}
    </BlockStack>
  );
});

interface FieldProps extends Omit<InternalProps, 'id'> {
  id: string;
  localValue?: string;
  focus: boolean;
}

export const Field = forwardRef(function Field(
  {
    id,
    min,
    max,
    step,
    maxLength,
    name,
    label,
    prefix,
    icon,
    suffix,
    value: explicitValue,
    localValue,
    type = 'text',
    role,
    required,
    error,
    focus,
    autocomplete,
    autofocus,
    multiline,
    disabled,
    readonly,
    children,
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
) {
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

  const form = useContainingForm();
  useEffect(() => {
    if (autofocus) {
      innerRef.current?.focus();
    }
  }, [autofocus]);

  const {
    controls: {background: controlsBackground},
    textFields: {
      labelPosition = 'inside',
      background: textFieldsBackground,
      border = 'full',
      borderColor = 'base',
      focusBorder = 'full',
      typographyStyle: style,
    },
    label: {typographyStyle: placeholderStyle},
  } = useThemeConfiguration();

  const background =
    textFieldsBackground || controlsBackground || 'surfaceTertiary';

  const labelled = useLabelled();

  const fieldWrapperClassName = classNames(
    styles['Field-Wrapper'],
    Boolean(multiline) && styles.multiline,
  );

  const iconMarkup = icon && (
    <div
      className={styles.Icon}
      aria-hidden="true"
      onClick={() => innerRef.current?.focus()}
    >
      <div className={styles.IconInner}>
        <Icon appearance="subdued" source={icon} />
      </div>
    </div>
  );

  const prefixMarkup = prefix &&
    (labelled.floating || labelPosition === 'outside') && (
      <div
        id={`${id}-prefix`}
        className={classNames(
          styles.Prefix,
          labelPosition === 'inside' && styles['Prefix-inside'],
        )}
        aria-hidden="true"
        onClick={() => innerRef.current?.focus()}
      >
        {prefix}
      </div>
    );

  const className = classNames(
    styles.Field,
    labelled.floating &&
      labelPosition !== 'outside' &&
      styles['Field-floating'],
    Boolean(prefix) && styles['Field-prefixed'],
    Boolean(children) && styles['Field-hasActions'],
    Boolean(multiline) && styles['Field-multiline'],
    style && typographyStyles[style],
    placeholderStyle &&
      typographyStyles[variationName('placeholder', placeholderStyle)],
    type && styles[variationName('type', type)],
  );

  const backdropClassName = classNames(
    styles.Backdrop,
    focus && styles.focus,
    Boolean(error) && styles.hasError,
    styles[variationName('Backdrop-background', background)],
    styles[variationName('Backdrop-border', border)],
    styles[variationName('Backdrop-borderColor', borderColor)],
    styles[variationName('Backdrop-focusBorder', focusBorder)],
    disabled && styles['Backdrop-disabled'],
    readonly && styles['Backdrop-readOnly'],
  );

  const finalDescribedBy = [ariaDescribedBy, error && errorId(id)]
    .filter(Boolean)
    .join(' ');

  const field = React.createElement(multiline ? 'textarea' : 'input', {
    id,
    min,
    max,
    step,
    maxLength,
    name,
    placeholder:
      labelled.floating || labelPosition === 'outside' ? undefined : label,
    className,
    required,
    type: normalizeType(multiline ? undefined : type),
    disabled,
    readOnly: readonly,
    inputmode: type === 'number' ? 'decimal' : undefined,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-autocomplete': ariaAutocomplete,
    'aria-controls': ariaControls,
    'aria-describedby': finalDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-invalid': Boolean(error),
    'aria-required': required,
    'aria-labelledby': `${id}-label${prefix ? ` ${id}-prefix` : ''}${
      suffix ? ` ${id}-suffix` : ''
    }`,
    onBlur: ({currentTarget: {value}}) => {
      const currentValue = explicitValue;
      if (value !== currentValue) onChange?.(value);
      onBlur?.();
      labelled.onBlur();
    },
    onChange({currentTarget: {value}}) {
      onInput?.(value);
    },
    onFocus: () => {
      onFocus?.();
      labelled.onFocus();
    },
    onKeyDown,
    ref: refsSetter,
    role,
    rows: normalizeMultiline(multiline),
    value: localValue ?? '',
    autoComplete: autocompleteToHtml(autocomplete),
    autofocus,
    form: form?.nested ? form.id : undefined,
  } as HTMLProps<HTMLInputElement>);

  const multilineClone = Boolean(multiline) === true && (
    <div
      aria-hidden="true"
      className={classNames(styles.MultilineClone, className)}
    >
      {localValue}
      {' ' /* prevents jump with last return carriage */}
    </div>
  );

  const suffixMarkup = suffix && (
    <div
      id={`${id}-suffix`}
      className={styles.Suffix}
      aria-hidden="true"
      onClick={() => innerRef.current?.focus()}
    >
      {suffix}
    </div>
  );

  const actions = children && !disabled && (
    <div className={styles.Actions}>{children}</div>
  );

  return (
    <>
      {iconMarkup}
      {prefixMarkup}
      <div className={fieldWrapperClassName}>
        {field}
        <div className={backdropClassName} />
        {multilineClone}
      </div>
      {suffixMarkup}
      {actions}
    </>
  );
});

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

function normalizeMultiline(multiline: Props['multiline']) {
  switch (typeof multiline) {
    case 'undefined':
      return false;
    case 'boolean':
      return multiline ? '1' : false;
    case 'number':
      return multiline;
  }
}
