import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {InlineError} from '../InlineError';

import {Checkbox} from './Checkbox';

const defaultProps = {
  children: 'Save this information for next time',
};

describe('<Checkbox />', () => {
  it('renders an un-checked checkbox and label', () => {
    const checkbox = mountWithContext(<Checkbox {...defaultProps} />);
    expect(checkbox).toContainReactComponent('input', {
      checked: false,
      type: 'checkbox',
    });

    expect(checkbox.find('label')).toContainReactText(
      'Save this information for next time',
    );
  });

  it('renders a checked checkbox when the checked prop is provided and set to true', () => {
    const checkbox = mountWithContext(<Checkbox {...defaultProps} checked />);
    expect(checkbox).toContainReactComponent('input', {
      checked: true,
      type: 'checkbox',
    });
  });

  it('renders a checked checkbox when the value prop is provided and set to true', () => {
    const checkbox = mountWithContext(<Checkbox {...defaultProps} value />);
    expect(checkbox).toContainReactComponent('input', {
      checked: true,
      type: 'checkbox',
    });
  });

  it('renders a disabled checkbox when the disabled prop is provided and set to true', () => {
    const checkbox = mountWithContext(<Checkbox {...defaultProps} disabled />);
    expect(checkbox).toContainReactComponent('input', {
      disabled: true,
      type: 'checkbox',
    });
  });

  it('calls the onChange callback when the checkbox is checked and unchecked', () => {
    const onChangeSpy = jest.fn();
    const checkbox = mountWithContext(
      <Checkbox {...defaultProps} onChange={onChangeSpy} />,
    );
    checkbox.find('input')!.trigger('onChange', {
      currentTarget: {checked: true},
    });
    expect(onChangeSpy).toHaveBeenCalledWith(true);

    checkbox.find('input')!.trigger('onChange', {
      currentTarget: {checked: false},
    });
    expect(onChangeSpy).toHaveBeenCalledWith(false);
  });

  describe('error', () => {
    it('renders an error message when the error prop is provided', () => {
      const error = 'Error message';
      const id = faker.random.alphaNumeric();
      const checkbox = mountWithContext(
        <Checkbox {...defaultProps} id={id} error={error} />,
      );

      expect(checkbox).toContainReactComponent(InlineError, {
        controlID: id,
        children: error,
      });
    });

    it('creates an ID automatically that associates an error with the input', () => {
      const error = 'Error message';
      const checkbox = mountWithContext(
        <Checkbox {...defaultProps} error={error} />,
      );
      const id = checkbox.find('input')?.prop('id');

      expect(id).not.toBeUndefined();
      expect(checkbox).toContainReactComponent(InlineError, {
        controlID: checkbox.find('input')?.prop('id'),
        children: error,
      });
    });
  });

  describe('accessibilityLabel', () => {
    it('adds an aria-label to the label when the accessibilityLabel is set', () => {
      const accessibilityLabelContent = 'Accessibility content';

      const checkbox = mountWithContext(
        <Checkbox
          {...defaultProps}
          accessibilityLabel={accessibilityLabelContent}
        />,
      );

      expect(checkbox).toContainReactComponent('label', {
        'aria-label': accessibilityLabelContent,
      });
    });

    it('does not add aria-label to the label when accessibilityLabel is not set', () => {
      const accessibilityLabelContent = 'Accessibility content';

      const checkbox = mountWithContext(
        <Checkbox {...defaultProps}>Default content</Checkbox>,
      );

      expect(checkbox).not.toContainReactComponent('label', {
        'aria-label': accessibilityLabelContent,
      });
    });
  });
});
