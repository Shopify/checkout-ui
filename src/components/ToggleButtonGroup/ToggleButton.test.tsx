import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';

import {ToggleButton, ToggleButtonGroup, Props} from './index';

const defaultProps: Props = {
  id: faker.random.uuid(),
  selectedItem: faker.random.uuid(),
  onChange: () => null,
};

describe('<ToggleButton />', () => {
  it('renders its children', () => {
    const id = faker.random.uuid();

    function Children() {
      return <div>children</div>;
    }
    const toggleButtonGroup = mountWithContext(
      <ToggleButtonGroup {...defaultProps}>
        <ToggleButton id={id}>
          <Children />
        </ToggleButton>
      </ToggleButtonGroup>,
    );

    expect(toggleButtonGroup).toContainReactComponent(Children);
  });

  describe('onChange', () => {
    it('triggers onChange when button is selected', () => {
      const id = faker.random.uuid();
      const onChangeSpy = jest.fn();
      const toggleButtonGroup = mountWithContext(
        <ToggleButtonGroup {...defaultProps} onChange={onChangeSpy}>
          <ToggleButton id={id} />
        </ToggleButtonGroup>,
      );

      toggleButtonGroup.find('button')!.trigger('onClick');

      expect(onChangeSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('aria-pressed', () => {
    it('aria-pressed corresponds to not selected', () => {
      const id = faker.random.uuid();
      const toggleButtonGroup = mountWithContext(
        <ToggleButtonGroup {...defaultProps}>
          <ToggleButton id={id} />
        </ToggleButtonGroup>,
      );

      expect(toggleButtonGroup).toContainReactComponent('button', {
        'aria-pressed': false,
      });
    });

    it('aria-pressed corresponds to selected', () => {
      const id = faker.random.uuid();
      const toggleButtonGroup = mountWithContext(
        <ToggleButtonGroup {...defaultProps} selectedItem={id}>
          <ToggleButton id={id} />
        </ToggleButtonGroup>,
      );

      expect(toggleButtonGroup).toContainReactComponent('button', {
        'aria-pressed': true,
      });
    });
  });
});
