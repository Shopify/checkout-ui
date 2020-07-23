import React from 'react';

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

      autocomplete.find(Field)?.trigger('onInput', 'address');

      expect(onChangeSpy.mock.calls).toMatchObject([['address']]);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
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

    it('is hidden when the close button is clicked', () => {
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
