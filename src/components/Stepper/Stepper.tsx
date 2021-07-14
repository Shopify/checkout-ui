import React, {useEffect, useState, useCallback, useRef} from 'react';
import {classNames} from '@shopify/css-utilities';
import {StepperProps} from '@shopify/checkout-ui-extensions';

import {useTranslate} from '../AppContext';
import {useThemeConfiguration} from '../Theme';
import {BlockStack} from '../BlockStack';
import {TextFieldInternal} from '../TextField';
import {Icon} from '../Icon';
import {InlineError} from '../InlineError';
import {createIdCreator, useId} from '../../utilities/id';

import styles from './Stepper.css';

const createId = createIdCreator('StepperField');

interface SpinButtonProps {
  handleButtonPress(evt: React.MouseEvent, factor: number): void;
  handleTap(factor: number): void;
  minReached: boolean;
  maxReached: boolean;
  separator?: boolean;
}

const SpinButtons = ({
  handleButtonPress,
  handleTap,
  minReached,
  maxReached,
  separator,
}: SpinButtonProps) => {
  const translate = useTranslate();
  return (
    <div className={classNames(styles.SpinButtonGroup)} role="group">
      <button
        type="button"
        aria-label={translate('decrement') || 'Decrement'}
        onTouchStart={() => handleTap(-1)}
        onMouseDown={(evt) => handleButtonPress(evt, -1)}
        className={classNames(styles.SpinButton)}
        disabled={minReached}
        tabIndex={-1}
      >
        <Icon source="minus" size="base" />
      </button>
      {separator && <div className={classNames(styles.SpinButtonSeparator)} />}
      <button
        type="button"
        aria-label={translate('increment') || 'Increment'}
        onTouchStart={() => handleTap(1)}
        onMouseDown={(evt) => handleButtonPress(evt, 1)}
        className={classNames(styles.SpinButton)}
        disabled={maxReached}
        tabIndex={-1}
      >
        <Icon source="plus" size="base" />
      </button>
    </div>
  );
};

export function Stepper({
  accessibilityDescription,
  disabled,
  label,
  error,
  name,
  min = 0,
  max,
  value,
  step = 1,
  id: explicitId,
  required,
  onChange,
  onBlur,
  onFocus,
  readonly,
}: StepperProps) {
  const {
    stepper: {separator = true},
  } = useThemeConfiguration();
  const [quantity, setQuantity] = useState(value);
  const [spinning, setSpinning] = useState(false);
  const [minReached, setMinReached] = useState(false);
  const [maxReached, setMaxReached] = useState(false);
  const buttonPressTimer = useRef<number>();
  const id = useId(explicitId, createId);

  useEffect(() => {
    setQuantity(Number(value));
  }, [value]);

  useEffect(() => {
    setMinReached(() => {
      return quantity !== undefined && min !== undefined && quantity <= min;
    });
  }, [quantity, min]);

  useEffect(() => {
    setMaxReached(() => {
      return quantity !== undefined && max !== undefined && quantity >= max;
    });
  }, [quantity, max]);

  // because we do not register value changes until the blur, we need to manually handle disabling/enabling spin buttons onInput
  const handleMinOrMaxReached = (value: string) => {
    const numVal = Number(value);
    if (numVal <= min) setMinReached(true);
    if (max !== undefined && numVal >= max) setMaxReached(true);
    if (numVal > min) setMinReached(false);
    if (max !== undefined && numVal < max) setMaxReached(false);
  };

  const errorMarkup = error && (
    <InlineError controlID={id}>{error}</InlineError>
  );

  interface QuantityProps {
    factor: number;
    prevQuantity?: number;
    max?: number;
    min?: number;
    step: number;
  }

  const calculateQuantity = useCallback(
    ({factor, prevQuantity, max, min, step}: QuantityProps): number => {
      const normalizedMax = max === undefined ? Infinity : max;
      const normalizedMin = min === undefined ? -Infinity : min;
      const quantity = prevQuantity ? prevQuantity : 0;
      if (isNaN(quantity)) {
        return 0;
      }
      // Returns the length of decimal places in a number
      const decimalLength = (num: number) =>
        (num.toString().split('.')[1] || []).length;

      // Making sure the new value has the same length of decimal places as the
      // step / value has.
      const decimalPlaces = Math.max(
        decimalLength(quantity),
        decimalLength(step),
      );

      const newQuantity = Math.min(
        Number(normalizedMax),
        Math.max(quantity + factor * step, Number(normalizedMin)),
      );

      return parseFloat(newQuantity.toFixed(decimalPlaces));
    },
    [],
  );

  const handleLocalQuantityChange = useCallback(
    (factor: number) => {
      setQuantity((prevQuantity) => {
        return calculateQuantity({factor, prevQuantity, max, min, step});
      });
    },
    [step, max, min, calculateQuantity],
  );

  const handleTap = useCallback(
    (factor: number) => {
      setQuantity((prevQuantity) => {
        const val = calculateQuantity({factor, prevQuantity, max, min, step});
        onChange?.(`${val}`);
        return val;
      });
    },
    [step, max, min, calculateQuantity, onChange],
  );

  /* this mimics native spinner press and hold
   * and is lifted from polaris-react
   * https://github.com/Shopify/polaris-react/blob/main/src/components/TextField/TextField.tsx#L320-L346
   **/
  const handleButtonRelease = useCallback(() => {
    clearTimeout(buttonPressTimer.current);
    setSpinning(false);
    setQuantity((newQuantity) => {
      if (newQuantity !== undefined) {
        onChange?.(`${newQuantity}`);
      }
      return newQuantity === undefined ? quantity : newQuantity;
    });
  }, [onChange, quantity]);

  const handleButtonPress = useCallback(
    (evt: React.MouseEvent, factor: number) => {
      // only increment/decrement if it's left click
      if (evt?.button !== 0) return;
      // if somehow spinning already stop it
      if (spinning) {
        handleButtonRelease();
        return;
      }
      const minInterval = 50;
      const decrementBy = 10;
      let interval = 200;

      const onChangeInterval = () => {
        if (!spinning) setSpinning(true);
        if (interval > minInterval) interval -= decrementBy;
        handleLocalQuantityChange(factor);
        buttonPressTimer.current = window.setTimeout(
          onChangeInterval,
          interval,
        );
      };

      buttonPressTimer.current = window.setTimeout(onChangeInterval, 0);
      document.addEventListener('mouseup', handleButtonRelease, {
        once: true,
      });
      return () => {
        document.removeEventListener('mouseup', handleButtonRelease);
      };
    },
    [handleButtonRelease, handleLocalQuantityChange, spinning],
  );

  return (
    <BlockStack spacing="tight">
      <TextFieldInternal
        accessibilityDescription={accessibilityDescription}
        aria-required={required}
        disabled={disabled}
        error={Boolean(error)}
        id={id}
        label={label}
        max={max}
        min={min}
        name={name}
        readonly={readonly}
        required={required}
        step={step}
        type="number"
        value={quantity === undefined ? '' : `${quantity}`}
        onInput={handleMinOrMaxReached}
        onChange={(value) => {
          setQuantity(Number(value));
          onChange?.(value);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {!disabled && !readonly && (
          <SpinButtons
            handleButtonPress={handleButtonPress}
            handleTap={handleTap}
            maxReached={maxReached}
            minReached={minReached}
            separator={separator}
          />
        )}
      </TextFieldInternal>
      {errorMarkup}
    </BlockStack>
  );
}
