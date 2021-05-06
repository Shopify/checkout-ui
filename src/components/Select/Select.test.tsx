import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {InlineError} from '../InlineError';

import {Select, PLACEHOLDER_VALUE} from './Select';

const defaultProps = {
  label: 'Country',
  options: [
    {
      value: 'CA',
      label: 'Canada',
    },
    {
      value: 'US',
      label: 'United States',
    },
    {
      value: 'UK',
      label: 'United Kingdom',
    },
  ],
};

describe('<Select />', () => {
  it('renders a select and label', () => {
    const select = mountWithContext(<Select {...defaultProps} />);
    expect(select).toContainReactComponent('select');
    expect(select).toContainReactComponent('label');
  });

  it('renders a select with a pre-selected value when the value prop is provided', () => {
    const value = 'UK';
    const select = mountWithContext(<Select {...defaultProps} value={value} />);
    expect(select).toContainReactComponent('select', {value});
  });

  it('calls the onChange prop with the selected value when the selected value changes', () => {
    const onChangeSpy = jest.fn();
    const select = mountWithContext(
      <Select {...defaultProps} onChange={onChangeSpy} />,
    );
    select.find('select')!.trigger('onChange', {
      target: {value: 'UK'},
    });
    expect(onChangeSpy).toHaveBeenCalledWith('UK');
  });

  it('renders an error message when the error prop is provided', () => {
    const error = 'Select a country';
    const id = faker.random.alphaNumeric();
    const select = mountWithContext(
      <Select {...defaultProps} id={id} error={error} />,
    );

    expect(select).toContainReactComponent(InlineError, {
      controlID: id,
      children: error,
    });
  });

  it('renders a disabled select when the disabled prop is true', () => {
    const select = mountWithContext(<Select {...defaultProps} disabled />);
    expect(select).toContainReactComponent('select', {disabled: true});
  });

  it('renders a disabled option when the placeholder is provided and selected', () => {
    const placeholder = 'Select a country';
    const select = mountWithContext(
      <Select {...defaultProps} placeholder={placeholder} />,
    );

    expect(select).toContainReactComponent('option', {
      disabled: true,
      value: PLACEHOLDER_VALUE,
      children: placeholder,
    });
  });

  it('renders a disabled option when the placeholder is provided and not selected', () => {
    const placeholder = 'Select a country';
    const select = mountWithContext(
      <Select
        {...defaultProps}
        placeholder={placeholder}
        value={defaultProps.options[0].value}
      />,
    );

    expect(select).toContainReactComponent('option', {
      disabled: true,
      value: PLACEHOLDER_VALUE,
      children: placeholder,
    });
  });

  it('renders a disabled option when the readonly prop is true', () => {
    const select = mountWithContext(<Select {...defaultProps} readonly />);

    expect(select).toContainReactComponent('option', {
      disabled: true,
    });
  });

  it('renders a hidden and disabled option when the placeholder is provided, selected and similar to the label', () => {
    const select = mountWithContext(
      <Select {...defaultProps} placeholder={defaultProps.label} />,
    );

    expect(select).toContainReactComponent('option', {
      disabled: true,
      value: PLACEHOLDER_VALUE,
      hidden: true,
    });
    expect(select).not.toContainReactComponent('option', {
      children: defaultProps.label,
    });
  });

  it("doesn't render a hidden and disabled option when the placeholder is provided, not selected and similar to the label", () => {
    const select = mountWithContext(
      <Select
        {...defaultProps}
        placeholder={defaultProps.label}
        value={defaultProps.options[0].value}
      />,
    );

    expect(select).not.toContainReactComponent('option', {
      disabled: true,
      value: PLACEHOLDER_VALUE,
      hidden: true,
    });
  });

  describe('autocomplete', () => {
    it('sets the select autocomplete attribute to "off" when autocomplete is false', () => {
      const select = mountWithContext(
        <Select {...defaultProps} autocomplete={false} />,
      );
      expect(select).toContainReactComponent('select', {autoComplete: 'none'});
    });

    it('sets the select autocomplete attribute to "on" when autocomplete is true', () => {
      const select = mountWithContext(
        <Select {...defaultProps} autocomplete />,
      );
      expect(select).toContainReactComponent('select', {autoComplete: 'on'});
    });

    it('sets the select autocomplete attribute to a string representation of an autocomplete descriptor', () => {
      const select = mountWithContext(
        <Select
          {...defaultProps}
          autocomplete={{group: 'billing', field: 'country'}}
        />,
      );
      expect(select).toContainReactComponent('select', {
        autoComplete: 'billing country',
      });
    });
  });
});
