import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {Text} from '../Text';

import {Divider} from './Divider';

describe('<Divider />', () => {
  it('renders a single line by default', () => {
    const divider = mount(<Divider />);

    expect(divider).toContainReactComponent('div');
  });

  it('renders children', () => {
    const text = faker.lorem.words(2);
    const divider = mount(
      <Divider>
        <Text>{text}</Text>
      </Divider>,
    );

    expect(divider).toContainReactComponent(Text, {
      children: text,
    });
  });
});
