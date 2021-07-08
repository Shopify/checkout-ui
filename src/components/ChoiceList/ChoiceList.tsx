import React, {PropsWithChildren, createContext, useContext} from 'react';
import {classNames} from '@shopify/css-utilities';
import {
  ChoiceListProps as CheckoutChoiceListProps,
  ChoiceProps as CheckoutChoiceProps,
} from '@shopify/checkout-ui-extensions';

import {CheckboxControl} from '../Checkbox';
import {RadioControl} from '../RadioControl';

import styles from './ChoiceList.css';

interface ChoiceListCtx {
  name: string;
  value: string | string[];
  onChangeHandler(id: string, value: boolean): void;
}

const ChoiceListContext = createContext<ChoiceListCtx | null>(null);

function useChoiceList() {
  const context = useContext(ChoiceListContext);

  if (context == null) {
    throw new Error('No `ChoiceList` found in context');
  }

  return context;
}
export interface ChoiceListProps<T extends string | string[]>
  extends PropsWithChildren<CheckoutChoiceListProps<T>> {}

export interface ChoiceProps extends PropsWithChildren<CheckoutChoiceProps> {}

// TODO: consider adding error prop

export function ChoiceList<T extends string | string[]>({
  name,
  value,
  onChange,
  children,
}: PropsWithChildren<ChoiceListProps<T>>) {
  const onChangeHandler = (id: string, checked: boolean) => {
    onChange(getNewValue(value, checked, id));
  };

  return (
    <ChoiceListContext.Provider
      value={{
        name,
        value,
        onChangeHandler,
      }}
    >
      {children}
    </ChoiceListContext.Provider>
  );
}

export function Choice({
  id,
  disabled,
  accessibilityLabel,
  children,
}: PropsWithChildren<ChoiceProps>) {
  const {name, onChangeHandler, value} = useChoiceList();

  const Control = isString(value) ? RadioControl : CheckboxControl;
  const checked = isString(value) ? value === id : value.includes(id);

  const className = classNames(
    styles.Label,
    disabled && styles['Label-isDisabled'],
  );

  return (
    <div className={styles.Wrapper}>
      <Control
        id={id}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={(value: boolean) => {
          onChangeHandler(id, value);
        }}
      />
      <label
        htmlFor={id}
        className={className}
        aria-label={accessibilityLabel ? accessibilityLabel : undefined}
      >
        {children}
      </label>
    </div>
  );
}

function getNewValue<T extends string | string[]>(
  value: T,
  checked: boolean,
  id: string,
): T {
  if (checked === true) {
    return (isString(value) ? id : [...value, id]) as T;
  }

  return (isString(value)
    ? ''
    : (value as string[]).filter((el) => el !== id)) as T;
}

function isString(value: string | string[]): value is string {
  return typeof value === 'string';
}
