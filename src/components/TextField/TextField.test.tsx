import React from 'react';
import faker from 'faker';

import {errorId} from '../../utilities/errors';
import {mountWithContext} from '../../test-utilities';
import {Text} from '../Text';
import {Icon} from '../Icon';
import {InlineError} from '../InlineError';
import {createTheme} from '../Theme';
import {Form} from '../Form';
import {View} from '../View';

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

  it('renders prefix on focus only when label is inside', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} prefix="$" />,
    );

    expect(textField).not.toContainReactComponent('div', {
      children: '$',
    });

    textField.find('input')!.trigger('onFocus');

    expect(textField).toContainReactComponent('div', {
      children: '$',
    });

    expect(textField).toContainReactComponent('input', {
      'aria-labelledby': 'text_field-label text_field-prefix',
    });
  });

  it('renders prefix always when label is outside', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} prefix="$" />,
      {theme: createTheme({textFields: {labelPosition: 'outside'}})},
    );

    expect(textField).toContainReactComponent('div', {
      children: '$',
    });
  });

  it('renders suffix', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} suffix="$" />,
    );

    expect(textField).toContainReactComponent('div', {
      children: '$',
    });
  });

  it('renders icon', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps} icon="mobile" />,
    );

    expect(textField).toContainReactComponent(Icon, {source: 'mobile'});
  });

  it('renders actions', () => {
    const textField = mountWithContext(
      <TextField {...defaultProps}>
        <button>x</button>
      </TextField>,
    );

    expect(textField).toContainReactComponent('button', {children: 'x'});
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
    textField
      .find('input' as any)!
      .trigger('oninput', {currentTarget: {value}});

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

  describe('form', () => {
    it('renders a form id when rendered in a nested form', () => {
      const testId = faker.random.word();
      const textField = mountWithContext(
        <Form onSubmit={noop}>
          <Form id={testId} onSubmit={noop}>
            <TextField {...defaultProps} />,
          </Form>
        </Form>,
      );
      expect(textField).toContainReactComponent('input', {
        form: testId,
      });
    });

    it('does not render a form id when rendered in a non-nested form', () => {
      const textField = mountWithContext(
        <Form onSubmit={noop}>
          <TextField {...defaultProps} />,
        </Form>,
      );
      expect(textField).toContainReactComponent('input', {
        form: undefined,
      });
    });
  });

  describe('onChange', () => {
    it('does not call onChange when the value changes but is not committed, but updates the value in the input', () => {
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value="" onChange={onChange} />,
      );

      const value = faker.random.alphaNumeric();
      textField
        .find('input' as any)!
        .trigger('oninput', {currentTarget: {value}});

      expect(onChange).not.toHaveBeenCalled();
      expect(textField).toContainReactComponent('input', {value});
    });

    it('does not call onChange when the value changes and is committed, but matches the current prop value', () => {
      const value = faker.random.alphaNumeric();
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value={value} onChange={onChange} />,
      );

      textField
        .find('input' as any)!
        .trigger('oninput', {currentTarget: {value: ''}});
      textField
        .find('input' as any)!
        .trigger('oninput', {currentTarget: {value}});

      textField.find('input')!.trigger('onBlur', {currentTarget: {value}});

      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onChange when the value changes and is committed, and does not match the current prop value', () => {
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value="" onChange={onChange} />,
      );

      const value = faker.random.alphaNumeric();
      textField
        .find('input' as any)!
        .trigger('oninput', {currentTarget: {value}});
      textField.find('input')!.trigger('onBlur', {currentTarget: {value}});

      expect(onChange).toHaveBeenCalledWith(value);
    });

    it('calls onChange when the TextField is focused and the enter key is pressed', () => {
      const onChange = jest.fn();
      const textField = mountWithContext(
        <TextField {...defaultProps} value="" onChange={onChange} />,
      );

      const value = faker.random.alphaNumeric();
      textField
        .find('input' as any)!
        .trigger('oninput', {currentTarget: {value}});
      textField
        .find('input')!
        .trigger('onKeyDown', {key: 'Enter', currentTarget: {value}});

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

      textField.find('input' as any)!.trigger('oninput', {
        currentTarget: {value: faker.random.alphaNumeric()},
      });

      expect(textField).not.toContainReactComponent('input', {
        placeholder: label,
      });
    });

    it('renders the placeholder once a value is entered and removed without focusing the field', () => {
      const label = 'Email';
      const textField = mountWithContext(
        <TextField {...defaultProps} label={label} />,
      );

      textField.find('input' as any)!.trigger('oninput', {
        currentTarget: {value: 'snowdevil@shopify.com'},
      });
      textField.find('input' as any)!.trigger('oninput', {
        currentTarget: {value: ''},
      });

      expect(textField).toContainReactComponent('input', {
        placeholder: label,
      });
    });

    it('hides the placeholder once a value is entered and removed after the field loses focus', () => {
      const label = 'Email';
      const textField = mountWithContext(
        <TextField {...defaultProps} label={label} />,
      );

      textField.find('input' as any)!.trigger('oninput', {
        currentTarget: {value: 'snowdevil@shopify.com'},
      });
      textField.find('input' as any)!.trigger('onBlur', {
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

  describe('maxLength', () => {
    it('renders an input field with maxLength', () => {
      const textField = mountWithContext(
        <TextField {...defaultProps} maxLength={10} />,
      );
      expect(textField).toContainReactComponent('input', {maxLength: 10});
      expect(textField).not.toContainReactComponent('textarea');
    });

    it('renders a textarea with maxLength', () => {
      const textField = mountWithContext(
        <TextField {...defaultProps} multiline maxLength={10} />,
      );
      expect(textField).toContainReactComponent('textarea', {maxLength: 10});
      expect(textField).not.toContainReactComponent('input');
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

      const descriptionElement = textField.find(View, {
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

  describe('multiline', () => {
    it('renders a textarea when the multiline prop is provided', () => {
      const textField = mountWithContext(
        <TextField {...defaultProps} multiline />,
      );
      expect(textField).toContainReactComponent('textarea');
      expect(textField).not.toContainReactComponent('input');
    });

    it('renders a textarea with rows when the multiline prop is a number', () => {
      const textField = mountWithContext(
        <TextField {...defaultProps} multiline={5} />,
      );
      expect(textField).toContainReactComponent('textarea', {rows: 5});
    });

    it('does not render a textarea with rows when the multiline prop is a 0', () => {
      const textField = mountWithContext(
        <TextField {...defaultProps} multiline={0} />,
      );
      expect(textField).not.toContainReactComponent('textarea', {rows: 0});
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

function noop() {}
