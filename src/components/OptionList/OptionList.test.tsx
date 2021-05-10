import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {View} from '../View';

import {OptionListContext} from './context';
import {OptionList, Props} from './OptionList';

const defaultProps: Props = {
  id: faker.random.uuid(),
  selectedItems: [faker.random.uuid()],
  onChange: () => null,
  children: <div />,
};

describe('<OptionList />', () => {
  it('renders its children', () => {
    function Children() {
      return <div>children</div>;
    }

    const accordion = mountWithContext(
      <OptionList {...defaultProps}>
        <Children />
      </OptionList>,
    );

    expect(accordion).toContainReactComponent(Children);
  });

  it('wraps children with OptionListContext', () => {
    const id = faker.random.uuid();
    const selectedItems = [faker.random.uuid()];
    const onChange = () => null;
    const allowMultiple = false;
    const controlHidden = false;

    const accordion = mountWithContext(
      <OptionList
        {...defaultProps}
        id={id}
        selectedItems={selectedItems}
        onChange={onChange}
        allowMultiple={allowMultiple}
      />,
    );

    expect(accordion).toProvideReactContext(OptionListContext, {
      id,
      selectedItems,
      onChange,
      allowMultiple,
      controlHidden,
    });
  });

  it('renders a title if provided', () => {
    const title = faker.random.word();

    const accordion = mountWithContext(
      <OptionList {...defaultProps} title={title} />,
    );

    expect(accordion).toContainReactComponent('legend');
    expect(accordion.find('legend')).toContainReactText(title);
  });

  it('renders a hidden title if provided when titleHidden prop is set to true', () => {
    const title = faker.random.word();

    const accordion = mountWithContext(
      <OptionList {...defaultProps} title={title} titleHidden />,
    );

    expect(
      accordion.find(View, {visibility: 'hidden'}),
    ).toContainReactComponent('legend');
    expect(accordion.find('legend')).toContainReactText(title);
  });
});
