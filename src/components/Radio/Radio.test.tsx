import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {VisuallyHidden} from '../VisuallyHidden';
import {HiddenForAccessibility} from '../HiddenForAccessibility';

import {Radio} from './Radio';

const defaultProps = {
  name: 'radio_button',
  children: 'Save this information for next time',
};

describe('<Radio />', () => {
  it('renders an un-checked radio and label', () => {
    const radio = mountWithContext(<Radio {...defaultProps} />);
    expect(radio).toContainReactComponent('input', {
      checked: false,
      type: 'radio',
    });

    expect(radio.find('label')).toContainReactText(
      'Save this information for next time',
    );
  });

  it('renders a checked radio when the checked prop is provided and set to true', () => {
    const radio = mountWithContext(<Radio {...defaultProps} checked />);
    expect(radio).toContainReactComponent('input', {
      checked: true,
      type: 'radio',
    });
  });

  it('renders a checked radio when the value prop is provided and set to true', () => {
    const radio = mountWithContext(<Radio {...defaultProps} value />);
    expect(radio).toContainReactComponent('input', {
      checked: true,
      type: 'radio',
    });
  });

  it('renders a disabled radio when the disabled prop is provided and set to true', () => {
    const radio = mountWithContext(<Radio {...defaultProps} disabled />);
    expect(radio).toContainReactComponent('input', {
      disabled: true,
      type: 'radio',
    });
  });

  it('calls the onChange callback when the radio is checked and unchecked', () => {
    const onChangeSpy = jest.fn();
    const radio = mountWithContext(
      <Radio {...defaultProps} onChange={onChangeSpy} />,
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

  describe('accessibilityLabel', () => {
    it('renders visually hidden content when the accessibilityLabel is set', () => {
      const accessibilityLabelContent = 'Accessibility content';

      const radio = mountWithContext(
        <Radio
          {...defaultProps}
          accessibilityLabel={accessibilityLabelContent}
        />,
      );

      expect(radio.find(VisuallyHidden)).toContainReactText(
        accessibilityLabelContent,
      );
    });

    it('hides the label for accessibility purposes when the accessibilityLabel is set', () => {
      const children = 'Basic label';

      const radio = mountWithContext(
        <Radio {...defaultProps} accessibilityLabel="Accessibility content">
          {children}
        </Radio>,
      );

      expect(radio.find(HiddenForAccessibility)).toContainReactText(children);
    });
  });
});
