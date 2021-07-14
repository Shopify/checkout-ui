import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {StepperProps as Props} from '@shopify/checkout-ui-extensions';

import {themeWithKnobs} from '../../storybook-utilities';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';
import {Text} from '../Text';
import {Divider} from '../Divider';

import {Stepper} from './Stepper';

const meta = {
  component: Stepper,
  title: 'checkout-web-ui/Stepper',
  decorators: [
    withKnobs,
    themeWithKnobs('stepper', 'textFields', 'primaryButton'),
    (story: () => JSX.Element) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

const defaultProps = {
  label: 'Quantity',
};

export const defaultState = () => <Stepper {...defaultProps} />;

export const min = () => <Stepper {...defaultProps} min={3} />;

export const max = () => <Stepper {...defaultProps} max={5} />;

export const minAndMax = () => <Stepper {...defaultProps} min={1} max={5} />;

export const step = () => <Stepper {...defaultProps} step={0.5} />;

export const minMaxAndStep = () => (
  <Stepper {...defaultProps} step={2} min={0} max={5} />
);

export const error = () => <Stepper {...defaultProps} error="Limit reached" />;

export const disabled = () => <Stepper {...defaultProps} disabled />;

export const readonly = () => <Stepper {...defaultProps} value={10} readonly />;

function StepperWithState(props: Props) {
  const [value, setValue] = useState(1);
  const [value1, setValue1] = useState<number | undefined>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const max = 10;
  const handleChange = (val?: string) => {
    setValue(Number(val));
  };

  const handleMaxValueChange = (value: string) => {
    const numVal = Number(value);
    if (max && numVal > max) {
      setError('Value exceeds max');
      return;
    }
    if (numVal < 0) {
      setError('Value less than min');
      return;
    }
    setValue1(numVal);
    setError(undefined);
  };

  return (
    <BlockStack>
      <Stepper {...props} value={value} onChange={handleChange} />
      <BlockStack spacing="extraTight">
        <InlineStack>
          <Text>onChange value: </Text>
          <Text subdued>{value}</Text>
        </InlineStack>
      </BlockStack>
      <Divider />
      <Text>With error when max of 10 exceeded</Text>
      <Stepper
        {...defaultProps}
        max={max}
        value={value1}
        onChange={handleMaxValueChange}
        error={error}
      />
      <InlineStack>
        <Text>onChange value: </Text>
        <Text subdued>{value1}</Text>
      </InlineStack>
    </BlockStack>
  );
}

export const withControls = (props: Props) => <StepperWithState {...props} />;

withControls.args = {
  accessibilityDescription: 'Number of sprockets',
  disabled: false,
  error: '',
  label: 'Quantity',
  min: undefined,
  max: undefined,
  readonly: false,
  spinner: true,
  step: undefined,
};
