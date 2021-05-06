import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {CheckboxControl} from '../Checkbox';
import {RadioControl} from '../RadioControl';

import {ChoiceList, Choice} from './ChoiceList';

const defaultProps = {
  name: 'choice_list',
};
const id = '123';
const singleValue = id;
const multiValue = [id];
const labelContent = 'Label content';
const accessibilityLabel = 'Accessibility label content';

describe('<ChoiceList />', () => {
  it('renders a `RadioControl` component as the `Choice` when `value` is a single string', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={singleValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList).toContainReactComponent(RadioControl);
  });

  it('does not render a `RadioControl` component as the `Choice` when `value` is a single string', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={singleValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList).not.toContainReactComponent(CheckboxControl);
  });

  it('renders a `CheckboxControl` component as the `Choice` when `value` is a string array', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList).toContainReactComponent(CheckboxControl);
  });

  it('does not render a `RadioControl` component as the `Choice` when `value` is a string array', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList).not.toContainReactComponent(RadioControl);
  });

  it('passes its name down to its `RadioControl` component', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={singleValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(RadioControl)).toHaveReactProps({
      name: defaultProps.name,
    });
  });

  it('passes its onChange down to its `RadioControl` component', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={singleValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(RadioControl)).toHaveReactProps({
      onChange: expect.any(Function),
    });
  });

  it('sets a checked prop on its `RadioControl` component whose id equals the Choice value', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={singleValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(RadioControl)).toHaveReactProps({checked: true});
  });

  it('does not set a checked prop on its `RadioControl` component whose id does not equal the Choice value', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value="" onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(RadioControl)).toHaveReactProps({checked: false});
  });

  it('passes its name down to its `CheckboxControl` component', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(CheckboxControl)).toHaveReactProps({
      name: defaultProps.name,
    });
  });

  it('passes its onChange down to its `CheckboxControl` component', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(CheckboxControl)).toHaveReactProps({
      onChange: expect.any(Function),
    });
  });

  it('sets a checked prop on its `CheckboxControl` component whose id is contained in the Choice value', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(CheckboxControl)).toHaveReactProps({
      checked: true,
    });
  });

  it('does not set a checked prop on its `CheckboxControl` component whose id is not contained in the Choice value', () => {
    const choiceList = mountWithContext(
      <ChoiceList {...defaultProps} value={['']} onChange={noop}>
        <Choice id={id}>{labelContent}</Choice>
      </ChoiceList>,
    );

    expect(choiceList.find(CheckboxControl)).toHaveReactProps({
      checked: false,
    });
  });

  describe('<Choice />', () => {
    it('renders children as its label content', () => {
      const choiceList = mountWithContext(
        <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
          <Choice id={id}>{labelContent}</Choice>
        </ChoiceList>,
      );

      expect(choiceList.find('label')).toHaveReactProps({
        children: labelContent,
      });
    });

    it('sets an aria-label on the Choice label when accessibilityLabel is provided', () => {
      const choiceList = mountWithContext(
        <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
          <Choice id={id} accessibilityLabel={accessibilityLabel}>
            {labelContent}
          </Choice>
        </ChoiceList>,
      );

      expect(choiceList.find('label')).toHaveReactProps({
        'aria-label': accessibilityLabel,
      });
    });

    it('does not set an aria-label on the Choice label when accessibilityLabel is not provided', () => {
      const choiceList = mountWithContext(
        <ChoiceList {...defaultProps} value={multiValue} onChange={noop}>
          <Choice id={id}>{labelContent}</Choice>
        </ChoiceList>,
      );

      expect(choiceList.find('label')).not.toHaveReactProps({
        'aria-label': accessibilityLabel,
      });
    });

    it('calls its `onChange` handler with a string value when checked on a choicelist with a string value', () => {
      const onChangeSpy = jest.fn();
      const choiceList = mountWithContext(
        <ChoiceList {...defaultProps} value="" onChange={onChangeSpy}>
          <Choice id={id}>{labelContent}</Choice>
        </ChoiceList>,
      );
      choiceList.find(RadioControl)!.trigger('onChange', true);
      expect(onChangeSpy).toHaveBeenCalledWith(id);
    });

    it('calls its `onChange` handler with a string value when unchecked on a choicelist with a string value', () => {
      const onChangeSpy = jest.fn();
      const choiceList = mountWithContext(
        <ChoiceList
          {...defaultProps}
          value={singleValue}
          onChange={onChangeSpy}
        >
          <Choice id={id}>{labelContent}</Choice>
        </ChoiceList>,
      );
      choiceList.find(RadioControl)!.trigger('onChange', false);
      expect(onChangeSpy).toHaveBeenCalledWith('');
    });

    it('calls its `onChange` handler with a string array value when checked on a choicelist with a string array value', () => {
      const onChangeSpy = jest.fn();
      const choiceList = mountWithContext(
        <ChoiceList {...defaultProps} value={[]} onChange={onChangeSpy}>
          <Choice id={id}>{labelContent}</Choice>
        </ChoiceList>,
      );
      choiceList.find(CheckboxControl)!.trigger('onChange', true);
      expect(onChangeSpy).toHaveBeenCalledWith([id]);
    });

    it('calls its `onChange` handler with a string array value when unchecked on a choicelist with a string array value', () => {
      const onChangeSpy = jest.fn();
      const choiceList = mountWithContext(
        <ChoiceList {...defaultProps} value={multiValue} onChange={onChangeSpy}>
          <Choice id={id}>{labelContent}</Choice>
        </ChoiceList>,
      );
      choiceList.find(CheckboxControl)!.trigger('onChange', false);
      expect(onChangeSpy).toHaveBeenCalledWith([]);
    });
  });
});

function noop() {}
