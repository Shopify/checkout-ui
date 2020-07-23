import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../../../../test-utilities';
import {OptionList, Props as OptionListProps} from '../../../OptionList';
import {OptionDetails} from '..';

const defaultOptionListProps: OptionListProps = {
  id: faker.random.uuid(),
  selectedItems: [],
  onChange: () => null,
  children: <div />,
};

describe('<OptionDetails />', () => {
  it('renders children if selected', () => {
    const id = faker.random.uuid();

    function Children() {
      return <div>Children</div>;
    }

    const accordion = mountWithContext(
      <OptionList {...defaultOptionListProps} selectedItems={[id]}>
        <OptionDetails controlledBy={id}>
          <Children />
        </OptionDetails>
      </OptionList>,
    );

    expect(accordion.find(OptionDetails)).toContainReactComponent(Children);
  });

  it('does not render children if not selected', () => {
    function Children() {
      return <div>Children</div>;
    }

    const accordion = mountWithContext(
      <OptionList {...defaultOptionListProps} selectedItems={['123']}>
        <OptionDetails controlledBy="234">
          <Children />
        </OptionDetails>
      </OptionList>,
    );

    expect(accordion.find(OptionDetails)).not.toContainReactComponent(Children);
  });
});
