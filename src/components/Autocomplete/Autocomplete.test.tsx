import React, {useState} from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Field} from '../TextField';
import {Labelled} from '../Labelled';

import {
  Autocomplete,
  Props,
  AutocompleteOptions,
  AutocompleteOption,
  AutocompleteFooter,
} from './Autocomplete';

jest.mock('../../utilities/focus', () => ({
  isFocused: jest.fn(),
}));

const {isFocused} = jest.requireMock('../../utilities/focus') as {
  isFocused: jest.Mock;
};

const defaultProps: Omit<Props, 'children'> = {
  id: 'address',
  label: 'Address',
  name: 'address',
  options: ['address 1', 'address 2'],
  value: '',
  title: 'Suggestions',
  ariaLabel: 'Close Predictions',
};

const autocompleteOptions = (options: string[]) => {
  return (
    <AutocompleteOptions>
      {options &&
        options.map((option: string) => (
          <AutocompleteOption key={option}>{option}</AutocompleteOption>
        ))}
    </AutocompleteOptions>
  );
};

describe('<Autocomplete />', () => {
  beforeEach(() => {
    isFocused.mockReset();
    isFocused.mockImplementation(() => true);
  });

  describe('<Labelled />', () => {
    it('renders a <Labelled />', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps} options={[]} />,
      );

      expect(autocomplete).toContainReactComponent(Labelled);
    });
  });

  describe('<Field />', () => {
    it('renders a <Field />', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps} options={[]} />,
      );

      expect(autocomplete).toContainReactComponent(Field, {
        id: 'address',
      });
    });

    it('renders a disabled <Field /> when the disabled prop is true', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps} disabled options={[]} />,
      );

      expect(autocomplete).toContainReactComponent(Field, {
        disabled: true,
      });
    });

    it('renders a readonly <Field /> when the readonly prop is true', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps} readonly options={[]} />,
      );

      expect(autocomplete).toContainReactComponent(Field, {
        readonly: true,
      });
    });

    it('sets the default aria-controls and aria-expanded properties', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps} options={[]} />,
      );

      expect(autocomplete).toContainReactComponent(Field, {
        id: 'address',
        ariaControls: 'address-options',
        ariaExpanded: false,
      });
    });

    it('sets the aria-controls, aria-activedescendant and aria-expanded when the input is focused', () => {
      const autocomplete = mountWithContext(<Autocomplete {...defaultProps} />);

      autocomplete.find(Field)?.trigger('onFocus');
      expect(autocomplete).toContainReactComponent(Field, {
        id: 'address',
        ariaControls: 'address-options',
        ariaActiveDescendant: 'address-option-0',
        ariaExpanded: true,
      });
    });

    it('calls the onChange callback when the Field onChange is called', () => {
      const onChangeSpy = jest.fn();
      const autocomplete = mountWithContext<Props>(
        <Autocomplete {...defaultProps} onChange={onChangeSpy} />,
      );

      autocomplete.find(Field)?.trigger('onChange', 'address');

      expect(onChangeSpy.mock.calls).toMatchObject([['address']]);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('calls the onChange callback when the enter key is pressed and AutocompleteOptions is closed', () => {
      const onChangeSpy = jest.fn();
      const autocomplete = mountWithContext<Props>(
        <Autocomplete {...defaultProps} onChange={onChangeSpy} />,
      );

      const value = faker.random.alphaNumeric();
      autocomplete
        .find('input' as any)!
        .trigger('oninput', {currentTarget: {value}});
      autocomplete.find('input')!.trigger('onKeyDown', {key: 'Escape'});
      autocomplete
        .find('input')!
        .trigger('onKeyDown', {key: 'Enter', currentTarget: {value}});

      expect(onChangeSpy).toHaveBeenCalledWith(value);
    });
  });

  describe('<AutocompleteOptions />', () => {
    it('renders when the input is focused', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      expect(autocomplete).toContainReactComponent(AutocompleteOptions, {
        children: expect.any(Array),
      });
    });

    it("doesn't render when no options", () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps} options={[]}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      expect(autocomplete).not.toContainReactComponent(AutocompleteOptions);
    });

    it('renders when the options change', () => {
      function Options() {
        const [options, setOptions] = useState<Props['options']>([]);

        const search = () => {
          setOptions(['address 1', 'address 2']);
        };

        return (
          <>
            <Autocomplete {...defaultProps} options={options}>
              {autocompleteOptions(defaultProps.options)}
            </Autocomplete>
            <button onClick={search} />
          </>
        );
      }

      const options = mountWithContext(<Options />);

      expect(options).not.toContainReactComponent(AutocompleteOptions);

      options.find('button')?.trigger('onClick');
      expect(options).toContainReactComponent(AutocompleteOptions, {
        children: expect.any(Array),
      });
    });

    it("doesn't render when the value is empty", () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onInput', '');
      expect(autocomplete).not.toContainReactComponent(AutocompleteOptions);
    });

    it('renders an <ul> with unique id', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      expect(autocomplete).toContainReactComponent('ul', {
        id: 'address-options',
      });
    });

    it('hides when the close button is clicked', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      autocomplete.find('button')?.trigger('onClick');
      expect(autocomplete).not.toContainReactComponent(AutocompleteOptions);
    });
  });

  describe('<AutocompleteOption />', () => {
    it('selects the first option when focus is on field', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      const [firstOption, secondOption] = autocomplete.findAll(
        AutocompleteOption,
      );

      expect(firstOption.prop('isSelected')).toStrictEqual(true);
      expect(secondOption.prop('isSelected')).toStrictEqual(false);
    });

    it('renders a <li> with unique id', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          {autocompleteOptions(defaultProps.options)}
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      const [firstOption, secondOption] = autocomplete.findAll(
        AutocompleteOption,
      );

      expect(firstOption).toContainReactComponent('li', {
        id: 'address-option-0',
      });
      expect(secondOption).toContainReactComponent('li', {
        id: 'address-option-1',
      });
    });
  });

  describe('<AutocompleteFooter />', () => {
    it('renders when the input is focused', () => {
      const autocomplete = mountWithContext(
        <Autocomplete {...defaultProps}>
          <AutocompleteFooter>This is a test footer</AutocompleteFooter>;
        </Autocomplete>,
      );

      autocomplete.find(Field)?.trigger('onFocus');
      expect(autocomplete).toContainReactComponent(AutocompleteFooter, {
        children: 'This is a test footer',
      });
    });
  });
});
