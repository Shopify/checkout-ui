import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {useThemeConfiguration} from '../Theme';
import {useId, createIdCreator} from '../../utilities/id';

import styles from './RadioControl.css';

const createId = createIdCreator('Radio');

interface RadioControlProps {
  /**
   * A unique identifier for the field. When no `id` is provided,
   * a globally unique value will be used instead.
   */
  id?: string;
  /**
   * An identifier for the field that is unique within the nearest
   * containing `<Form />` component. When you create multiple radio
   * components representing different options for the same choice,
   * each one should have the same `name` property.
   */
  name: string;
  /**
   * Whether the radio is selected. This prop is an alias for `checked`,
   * and can be useful in form libraries that provide a normalized API for
   * dealing with both `boolean` and `string` values. If both `value` and
   * `checked` are provided, `checked` takes precedence.
   */
  value?: boolean;
  /**
   * Whether the radio is selected.
   */
  checked?: boolean;
  /**
   * Whether the radio can be changed.
   */
  disabled?: boolean;
  /**
   * A callback that is run whenever the checkbox is changed. This callback
   * is called with a boolean indicating whether the radio should now be
   * active or inactive. This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
   * so you **must** store this value in state and reflect it back in the
   * `checked` or `value` props.
   */
  onChange?(value: boolean): void;
}

export function RadioControl({
  id: explicitId,
  name,
  value = false,
  checked = value,
  disabled,
  onChange,
}: RadioControlProps) {
  const id = useId(explicitId, createId);
  const {
    controls: {background: controlsBackground},
    radio: {
      background: radioBackground,
      borderColor = 'base',
      checkedStyle = 'ring',
      checkedColor = 'interactive',
      size = 'base',
    },
  } = useThemeConfiguration();

  const background = radioBackground || controlsBackground || 'surfaceTertiary';

  const className = classNames(
    styles.Input,
    disabled && styles['Input-isDisabled'],
    styles[variationName('Input-size', size)],
    styles[variationName('Input-background', background)],
    styles[variationName('Input-borderColor', borderColor)],
    styles[variationName('Input-checkedStyle', checkedStyle)],
    styles[variationName('Input-checkedColor', checkedColor)],
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
}
