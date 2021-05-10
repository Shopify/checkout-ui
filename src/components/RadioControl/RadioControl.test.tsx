import React from 'react';

import {mountWithContext} from '../../test-utilities';

import {RadioControl} from './RadioControl';

const defaultProps = {
  name: 'radio_button',
};

describe('<RadioControl />', () => {
  it('renders an un-checked radio', () => {
    const radio = mountWithContext(<RadioControl {...defaultProps} />);
    expect(radio).toContainReactComponent('input', {
      checked: false,
      type: 'radio',
    });
  });

  it('renders a checked radio when the checked prop is provided and set to true', () => {
    const radio = mountWithContext(<RadioControl {...defaultProps} checked />);
    expect(radio).toContainReactComponent('input', {
      checked: true,
      type: 'radio',
    });
  });

  it('renders a checked radio when the value prop is provided and set to true', () => {
    const radio = mountWithContext(<RadioControl {...defaultProps} value />);
    expect(radio).toContainReactComponent('input', {
      checked: true,
      type: 'radio',
    });
  });

  it('renders a disabled radio when the disabled prop is provided and set to true', () => {
    const radio = mountWithContext(<RadioControl {...defaultProps} disabled />);
    expect(radio).toContainReactComponent('input', {
      disabled: true,
      type: 'radio',
    });
  });

  it('calls the onChange callback when the radio is checked and unchecked', () => {
    const onChangeSpy = jest.fn();
    const radio = mountWithContext(
      <RadioControl {...defaultProps} onChange={onChangeSpy} />,
    );
    radio.find('input')!.trigger('onChange', {
      currentTarget: {checked: true},
    });
    expect(onChangeSpy).toHaveBeenCalledWith(true);

    radio.find('input')!.trigger('onChange', {
      currentTarget: {checked: false},
    });
    expect(onChangeSpy).toHaveBeenCalledWith(false);
  });
});
