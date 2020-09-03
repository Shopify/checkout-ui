import React from 'react';
import faker from 'faker';

import {errorId} from '../../utilities/errors';
import {mountWithContext} from '../../test-utilities';
import {Text} from '../Text';
import {Tooltip} from '../Tooltip';
import {InlineError} from '../InlineError';
import {VisuallyHidden} from '../VisuallyHidden';

import {TextField} from './TextField';

const defaultProps = {
  id: 'text_field',
  label: 'First name',
};

describe('<TextField />', () => {
  it('renders an input field with basic props', () => {
    const id = faker.random.alphaNumeric();
    const name = faker.random.word();
    const textField = mountWithContext(
      <TextField {...defaultProps} id={id} name={name} />,
    );
    expect(textField).toContainReactComponent('input', {id, name});
  });

  it('renders an input field with a prefilled value when the value prop is provided', () => {
    const value = 'Shopifolk';
    const textField = mountWithContext(
      <TextField {...defaultProps} value={value} />,
    );
    expect(textField).toContainReactComponent('input', {value});
  });

  it('renders an error message when the error prop is provided', () => {
    const error = 'Enter a first name';
    const id = faker.random.alphaNumeric();
    const textField = mountWithContext(
      <TextField {...defaultProps} id={id} error={error} />,
    );

    expect(textField).toContainReactComponent(InlineError, {
      controlID: id,
      children: error,
    });
  });

  it('renders a tooltip when the tooltip prop is provided', () => {
    const label = 'More information';
    const content = 'In case we need to contact you about your order';

    const textField = mountWithContext(
      <TextField {...defaultProps} tooltip={{label, content}} />,
    );

    expect(textField).toContainReactComponent(Tooltip, {content});
    expect(textField.find(VisuallyHidden)).toContainReactText(label);
  });

  it('renders a textarea when the multiline prop is provided', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} multiline />,
    );
    expect(textField).toContainReactComponent('textarea');
    expect(textField).not.toContainReactComponent('input');
  });

  it('renders a disabled input element when the disabled prop is true', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} disabled />,
    );
    expect(textField).toContainReactComponent('input', {disabled: true});
  });

  it('renders a readonly input element when the readonly prop is true', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} readonly />,
    );
    expect(textField).toContainReactComponent('input', {readOnly: true});
  });

  it('calls an onFocus callback when the input gains focus', () => {
    const onFocus = jest.fn();
    const textField = mountWithContext(
      <TextField {...defaultProps} onFocus={onFocus} />,
    );

    textField.find('input')!.trigger('onFocus');

    expect(onFocus).toHaveBeenCalled();
  });

  it('calls an onBlur callback when the input loses focus', () => {
    const onBlur = jest.fn();
    const textField = mountWithContext(
      <TextField {...defaultProps} onBlur={onBlur} />,
    );

    textField.find('input')!.trigger('onBlur', {currentTarget: {value: ''}});

    expect(onBlur).toHaveBeenCalled();
  });

  it('calls an onInput callback on input change with the current value', () => {
    const onInput = jest.fn();
    const textField = mountWithContext(
      <TextField {...defaultProps} onInput={onInput} />,
    );

    const value = faker.random.alphaNumeric();
    textField.find('input')!.trigger('onInput', {currentTarget: {value}});

    expect(onInput).toHaveBeenCalledWith(value);
  });

  describe('type', () => {
    it('is applied to the input', () => {
      const type = 'email';
      const textField = mountWithContext(
        <TextField {...defaultProps} type={type} />,
      );
      expect(textField).toContainReactComponent('input', {type});
    });

    it('normalizes the telephone type to tel', () => {
      const textField = mountWithContext(
        <TextField {...defaultProps} type="telephone" />,
      );
      expect(textField).toContainReactComponent('input', {type: 'tel'});
    });
  });

  describe('onChange', () => {
    it('does not call onChange when the value changes but is not committed, but updates the value in the input', () => {
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value="" onChange={onChange} />,
      );

      const value = faker.random.alphaNumeric();
      textField.find('input')!.trigger('onInput', {currentTarget: {value}});

      expect(onChange).not.toHaveBeenCalled();
      expect(textField).toContainReactComponent('input', {value});
    });

    it('does not call onChange when the value changes and is committed, but matches the current prop value', () => {
      const value = faker.random.alphaNumeric();
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value={value} onChange={onChange} />,
      );

      textField.find('input')!.trigger('onInput', {currentTarget: {value: ''}});
      textField.find('input')!.trigger('onInput', {currentTarget: {value}});

      textField.find('input')!.trigger('onBlur', {currentTarget: {value}});

      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange when the value changes and is committed, and does not match the current prop value', () => {
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value="" onChange={onChange} />,
      );

      const value = faker.random.alphaNumeric();
      textField.find('input')!.trigger('onInput', {currentTarget: {value}});
      textField.find('input')!.trigger('onChange', {currentTarget: {value}});

      expect(onChange).toHaveBeenCalledWith(value);
    });
  });

  describe('label', () => {
    it('renders a placeholder by default', () => {
      const label = 'Email';
      const textField = mountWithContext(
        <TextField {...defaultProps} label={label} />,
      );
      expect(textField).toContainReactComponent('input', {
        placeholder: label,
      });
    });

    it('hides the placeholder once a value is entered', () => {
      const label = 'Email';
      const textField = mountWithContext(
        <TextField {...defaultProps} label={label} />,
      );

      textField.find('input')!.trigger('onInput', {
        currentTarget: {value: faker.random.alphaNumeric()},
      });

      expect(textField).not.toContainReactComponent('input', {
        placeholder: label,
      });
    });

    it('hides the placeholder once a value is entered and removed', () => {
      const label = 'Email';
      const textField = mountWithContext(
        <TextField {...defaultProps} label={label} />,
      );

      textField.find('input')!.trigger('onInput', {
        currentTarget: {value: 'snowdevil@shopify.com'},
      });
      textField.find('input')!.trigger('onInput', {
        currentTarget: {value: ''},
      });

      expect(textField).not.toContainReactComponent('input', {
        placeholder: label,
      });
    });

    it.todo('calls `labelled.onFocus when focusing the textfield`');

    it.todo('calls `labelled.onBlur when removing focus from the textfield`');
    it.todo(
      'calls `labelled.onChange with a value when typing a value in the field`',
    );
    it.todo(
      'calls `labelled.onChange with an empty value when typing and the field is empty`',
    );
  });

  describe('autofocus', () => {
    const rawCreateElement = document.createElement;
    const focusSpy = jest.fn();
    const createElementSpy = jest.spyOn(document, 'createElement');

    beforeEach(() => {
      createElementSpy.mockImplementation((...args) => {
        const result = rawCreateElement.apply(document, args);
        if (args[0].toLocaleLowerCase() === 'input') {
          result.focus = focusSpy;
        }
        return result;
      });
    });

    afterEach(() => {
      focusSpy.mockReset();
    });

    afterAll(() => {
      createElementSpy.mockRestore();
    });

    it('does not focus inputs by default', () => {
      mountWithContext(<TextField {...defaultProps} />);

      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('focuses on the input when autofocus is specified', () => {
      mountWithContext(<TextField {...defaultProps} autofocus />);

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('controlledValue', () => {
    it('is preferred as the value when provided', () => {
      const value = faker.random.words();
      const controlledValue = faker.random.words();

      const textField = mountWithContext(
        <TextField
          {...defaultProps}
          value={value}
          controlledValue={controlledValue}
        />,
      );

      expect(textField).toContainReactComponent('input', {
        value: controlledValue,
      });
    });
  });

  describe('accessibilityDescription', () => {
    it('omits the hidden description element when accessibilityDescription is not specified', () => {
      const id = faker.random.alphaNumeric();
      const textField = mountWithContext(
        <TextField {...defaultProps} id={id} />,
      );

      expect(textField).not.toContainReactComponent(Text, {
        id: `${id}-description`,
      });
    });

    it('renders a hidden element containing accessibilityDescription text', () => {
      const id = faker.random.alphaNumeric();
      const description = faker.random.words();
      const textField = mountWithContext(
        <TextField
          {...defaultProps}
          id={id}
          accessibilityDescription={description}
        />,
      );

      const descriptionElement = textField.find(Text, {
        id: `${id}-description`,
      });
      expect(descriptionElement).toContainReactText(description);
    });

    it('associates the input with the hidden accessibilityDescription element', () => {
      const id = faker.random.alphaNumeric();
      const description = faker.random.words();
      const textField = mountWithContext(
        <TextField
          {...defaultProps}
          id={id}
          accessibilityDescription={description}
        />,
      );

      expect(textField).toContainReactComponent('input', {
        id,
        'aria-describedby': `${id}-description`,
      });
    });

    it('includes error element id in describedy associations', () => {
      const id = faker.random.alphaNumeric();
      const description = faker.random.words();
      const error = faker.random.words();
      const textField = mountWithContext(
        <TextField
          {...defaultProps}
          id={id}
          accessibilityDescription={description}
          error={error}
        />,
      );

      expect(textField).toContainReactComponent('input', {
        id,
        'aria-describedby': `${id}-description ${errorId(id)}`,
      });
    });
  });

  describe('forward refs', () => {
    it('passes input element to ref functions', () => {
      const id = faker.random.alphaNumeric();
      const refCallback = jest.fn();

      const textField = mountWithContext(
        <TextField {...defaultProps} id={id} ref={refCallback} />,
      );

      expect(refCallback).toHaveBeenCalledWith(
        textField.find('input')!.instance,
      );
    });

    it('assigns input element to ref.current on ref instances', () => {
      const id = faker.random.alphaNumeric();
      const fakeRef = {current: null};

      const textField = mountWithContext(
        <TextField {...defaultProps} id={id} ref={fakeRef} />,
      );

      expect(fakeRef.current).toBe(textField.find('input')!.instance);
    });
  });
});
