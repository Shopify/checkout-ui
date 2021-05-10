import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';

import {ToggleButtonsContext} from './context';

import {ToggleButtonGroup, Props} from './index';

const defaultProps: Props = {
  id: faker.random.uuid(),
  selectedItem: faker.random.uuid(),
  onChange: () => null,
};

describe('<ToggleButtonGroup />', () => {
  it('renders its children', () => {
    function Children() {
      return <div>children</div>;
    }

    const toggleButtonGroup = mountWithContext(
      <ToggleButtonGroup {...defaultProps}>
        <Children />
      </ToggleButtonGroup>,
    );

    expect(toggleButtonGroup).toContainReactComponent(Children);
  });

  it('wraps children with ToggleButtonContext', () => {
    const onChange = () => null;
    const id = faker.random.uuid();
    const selectedItem = faker.random.uuid();

    const toggleButtonGroup = mountWithContext(
      <ToggleButtonGroup
        {...defaultProps}
        id={id}
        selectedItem={selectedItem}
        onChange={onChange}
      />,
    );

    expect(toggleButtonGroup).toProvideReactContext(ToggleButtonsContext, {
      selectedItem,
      onChange,
    });
  });
});
