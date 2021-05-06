import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../../../test-utilities';
import {CheckboxControl} from '../../../Checkbox';
import {RadioControl} from '../../../RadioControl';
import {View} from '../../../View';
import {OptionList, Props as OptionListProps} from '../../OptionList';

import {Option, Props} from './Option';

const defaultProps: Props = {
  id: faker.random.uuid(),
  label: faker.random.word(),
};

const defaultOptionListProps: OptionListProps = {
  id: faker.random.uuid(),
  selectedItems: [],
  onChange: () => null,
  children: <div />,
};

describe('<Option />', () => {
  it('triggers onChange when input is selected', () => {
    const id = faker.random.uuid();
    const onChangeSpy = jest.fn();
    const optionList = mountWithContext(
      <OptionList {...defaultOptionListProps} onChange={onChangeSpy}>
        <Option {...defaultProps} id={id} />
      </OptionList>,
    );

    optionList.find(Option)!.find(RadioControl)!.trigger('onChange');

    expect(onChangeSpy).toHaveBeenCalledWith([id]);
  });

  it('input is active if selected', () => {
    const id = faker.random.uuid();

    const optionList = mountWithContext(
      <OptionList {...defaultOptionListProps} selectedItems={[id]}>
        <Option {...defaultProps} id={id} />
      </OptionList>,
    );

    expect(optionList.find(Option)).toContainReactComponent('input', {
      checked: true,
    });
  });

  it('renders a RadioControl if allow multiple is false', () => {
    const optionList = mountWithContext(
      <OptionList {...defaultOptionListProps}>
        <Option {...defaultProps} />
      </OptionList>,
    );

    expect(optionList.find(Option)).toContainReactComponent(RadioControl);
  });

  it('renders a CheckboxControl if allow multiple is true', () => {
    const optionList = mountWithContext(
      <OptionList {...defaultOptionListProps} allowMultiple>
        <Option {...defaultProps} />
      </OptionList>,
    );

    expect(optionList.find(Option)).toContainReactComponent(CheckboxControl);
  });

  it('renders visually hidden View when label and childrens are set', () => {
    const labelContent = faker.random.word();

    const optionList = mountWithContext(
      <OptionList {...defaultOptionListProps}>
        <Option {...defaultProps} label={labelContent}>
          Childrens
        </Option>
      </OptionList>,
    );

    expect(optionList.find(View, {visibility: 'hidden'})).toContainReactText(
      labelContent,
    );
  });

  describe('allowMultiple', () => {
    it('allows the selection of multiple options', () => {
      const firstItem = faker.random.uuid();
      const secondItem = faker.random.uuid();

      const optionList = mountWithContext(
        <OptionList
          {...defaultOptionListProps}
          allowMultiple
          selectedItems={[firstItem, secondItem]}
        >
          <Option {...defaultProps} id={firstItem} />
          <Option {...defaultProps} id={secondItem} />
        </OptionList>,
      );

      const [firstOption, secondOption] = optionList.findAll(Option);

      expect(firstOption).toContainReactComponent(CheckboxControl, {
        checked: true,
      });

      expect(secondOption).toContainReactComponent(CheckboxControl, {
        checked: true,
      });
    });

    it('toggles the selection of already selection options', () => {
      const selected = faker.random.uuid();
      const onChangeSpy = jest.fn();

      const optionList = mountWithContext(
        <OptionList
          {...defaultOptionListProps}
          allowMultiple
          selectedItems={[selected]}
          onChange={onChangeSpy}
        >
          <Option {...defaultProps} id={selected} />
        </OptionList>,
      );

      optionList.find(Option)!.find(CheckboxControl)!.trigger('onChange');

      expect(onChangeSpy).toHaveBeenCalledWith([]);
    });
  });

  describe('controlHidden', () => {
    it('shows control by default', () => {
      const optionList = mountWithContext(
        <OptionList {...defaultOptionListProps}>
          <Option {...defaultProps} />
        </OptionList>,
      );

      expect(optionList.find(Option)).toContainReactComponent(RadioControl);
    });

    it('hides control when true', () => {
      const optionList = mountWithContext(
        <OptionList {...defaultOptionListProps} controlHidden>
          <Option {...defaultProps} />
        </OptionList>,
      );

      expect(optionList.find(Option)).not.toContainReactComponent(RadioControl);
    });
  });
});
