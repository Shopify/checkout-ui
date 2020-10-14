import React, {ComponentProps} from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Button} from '../Button';
import {InlineError} from '../InlineError';
import {Field} from '../TextField';

import {Stepper} from './Stepper';

const defaultProps: ComponentProps<typeof Stepper> = {
  label: 'Quantity',
};

describe('<Stepper />', () => {
  it('renders a number input field with basic props', () => {
    const id = faker.random.alphaNumeric();
    const name = faker.random.word();
    const label = faker.random.word();
    const stepper = mountWithContext(
      <Stepper id={id} name={name} label={label} />,
    );
    expect(stepper).toContainReactComponent(Field, {id, name, label});
  });

  it('renders an error message when the error prop is provided', () => {
    const error = 'Limit reached';
    const id = faker.random.alphaNumeric();
    const stepper = mountWithContext(
      <Stepper {...defaultProps} id={id} error={error} />,
    );
    expect(stepper).toContainReactComponent(InlineError, {
      controlID: id,
      children: error,
    });
  });

  it('increases until it reaches the maximum', () => {
    const step = 2;
    const max = 1;
    const stepper = mountWithContext(
      <Stepper {...defaultProps} step={step} max={max} />,
    );

    const [, increaseButton] = stepper.findAll(Button);
    increaseButton!.trigger('onPress');

    expect(stepper).toContainReactComponent(Field, {
      value: `${max}`,
    });
  });

  it('decreases until it reaches the minimum', () => {
    const step = 2;
    const min = 0;
    const stepper = mountWithContext(
      <Stepper {...defaultProps} step={step} min={min} />,
    );

    const [decreaseButton] = stepper.findAll(Button);
    decreaseButton!.trigger('onPress');

    expect(stepper).toContainReactComponent(Field, {
      value: `${min}`,
    });
  });

  describe('onChange', () => {
    it('does not call onChange when the value changes but is not committed, but updates the value in the input', () => {
      const onChange = jest.fn();
      const value = faker.random.number();
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={value} onChange={onChange} />,
      );
      stepper
        .find('input')!
        .trigger('onInput', {currentTarget: {value: `${value}`}});

      expect(onChange).not.toHaveBeenCalled();
      expect(stepper).toContainReactComponent(Field, {value: `${value}`});
    });

    it('does not call onChange when the value changes and is committed, but matches the current prop value', () => {
      const onChange = jest.fn();
      const value = faker.random.number();
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={value} onChange={onChange} />,
      );

      stepper
        .find('input')!
        .trigger('onInput', {currentTarget: {value: `${value}`}});
      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange when the value changes and is committed, and does not match the current prop value', () => {
      const onChange = jest.fn();
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={0} onChange={onChange} />,
      );

      const value = faker.random.number();
      stepper
        .find('input')!
        .trigger('onInput', {currentTarget: {value: `${value}`}});
      stepper
        .find('input')!
        .trigger('onChange', {currentTarget: {value: `${value}`}});

      expect(onChange).toHaveBeenCalledWith(`${value}`);
    });
  });
  describe('max', () => {
    it('does not increase when value is at the maximum', () => {
      const value = 10;
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={value} max={10} />,
      );

      const [, increaseButton] = stepper.findAll(Button);
      increaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {value: `${value}`});
    });

    describe('going to default maximum value when input is greater than maximum', () => {
      it('increase button is clicked', () => {
        const value = 200;
        const max = 10;
        const stepper = mountWithContext(
          <Stepper {...defaultProps} value={value} max={max} />,
        );

        const [, increaseButton] = stepper.findAll(Button);
        increaseButton!.trigger('onPress');

        expect(stepper).toContainReactComponent(Field, {value: `${max}`});
      });

      it('decrease button is clicked', () => {
        const value = 200;
        const max = 10;
        const stepper = mountWithContext(
          <Stepper {...defaultProps} value={value} max={max} />,
        );

        const [decreaseButton] = stepper.findAll(Button);
        decreaseButton!.trigger('onPress');

        expect(stepper).toContainReactComponent(Field, {value: `${max}`});
      });
    });
  });
  describe('min', () => {
    it('does not decrease when value is at the minimum', () => {
      const min = 0;
      const stepper = mountWithContext(<Stepper {...defaultProps} min={min} />);

      const [decreaseButton] = stepper.findAll(Button);
      decreaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {value: `${min}`});
    });

    describe('going to default minimum value when input is less than minimum', () => {
      it('increase button is clicked', () => {
        const value = -100;
        const min = 1;
        const stepper = mountWithContext(
          <Stepper {...defaultProps} value={value} min={min} />,
        );

        const [, increaseButton] = stepper.findAll(Button);
        increaseButton!.trigger('onPress');

        expect(stepper).toContainReactComponent(Field, {value: `${min}`});
      });

      it('decrease button is clicked', () => {
        const value = -100;
        const min = 1;
        const stepper = mountWithContext(
          <Stepper {...defaultProps} value={value} min={min} />,
        );

        const [decreaseButton] = stepper.findAll(Button);
        decreaseButton!.trigger('onPress');

        expect(stepper).toContainReactComponent(Field, {value: `${min}`});
      });
    });
  });

  describe('<Button/>', () => {
    it('increases when the increase button is clicked on', () => {
      const stepper = mountWithContext(<Stepper {...defaultProps} />);

      const [, increaseButton] = stepper.findAll(Button);
      increaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {value: `${1}`});
    });

    it('decreases when the decrease button is clicked on', () => {
      const value = 2;
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={value} />,
      );

      const [decreaseButton] = stepper.findAll(Button);
      decreaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {
        value: `${value - 1}`,
      });
    });
  });

  describe('value', () => {
    it('decreases from the initial value', () => {
      const value = 1;
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={value} />,
      );

      const [decreaseButton] = stepper.findAll(Button);
      decreaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {
        value: `${value - 1}`,
      });
    });

    it('increases from the initial value', () => {
      const value = 1;
      const stepper = mountWithContext(
        <Stepper {...defaultProps} value={value} />,
      );

      const [, increaseButton] = stepper.findAll(Button);
      increaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {
        value: `${value + 1}`,
      });
    });
  });
  describe('step', () => {
    it('decrease based on the step value', () => {
      const value = 2;
      const step = 2;
      const stepper = mountWithContext(
        <Stepper {...defaultProps} step={step} value={value} />,
      );

      const [decreaseButton] = stepper.findAll(Button);
      decreaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {
        value: `${value - step}`,
      });
    });

    it('increases based on the step value', () => {
      const step = 2;
      const stepper = mountWithContext(
        <Stepper {...defaultProps} step={step} />,
      );
      const [, increaseButton] = stepper.findAll(Button);
      increaseButton!.trigger('onPress');

      expect(stepper).toContainReactComponent(Field, {value: `${step}`});
    });
  });
});
