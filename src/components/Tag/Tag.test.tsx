import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';
import {Text} from '../Text';

import {Tag} from './Tag';

describe('<Tag />', () => {
  it('renders a basic tag without close icon', () => {
    const str = faker.random.word();
    const tag = mountWithContext(
      <Tag>
        <Text>{str}</Text>
      </Tag>,
    );
    expect(tag).toContainReactComponent(Text, {
      children: str,
    });
    expect(tag).not.toContainReactComponent(Icon, {source: 'close'});
    expect(tag.findAll(Icon)).toHaveLength(0);
  });

  it('renders a tag with a close icon if there is an onRemove method', () => {
    const str = faker.random.word();
    const onRemove = jest.fn();
    const tag = mountWithContext(
      <Tag onRemove={onRemove}>
        <Text>{str}</Text>
      </Tag>,
    );
    expect(tag).toContainReactComponent(Icon, {
      source: 'close',
    });
  });

  it('calls onRemove when button is clicked', () => {
    const str = faker.random.word();
    const onRemove = jest.fn();
    const tag = mountWithContext(
      <Tag onRemove={onRemove}>
        <Text>{str}</Text>
      </Tag>,
    );
    tag.find('button')!.trigger('onClick');
    expect(onRemove).toHaveBeenCalled();
  });

  it('renders a tag with an icon if there is an icon prop', () => {
    const str = faker.random.word();
    const icon = 'delivered';
    const tag = mountWithContext(
      <Tag icon={icon}>
        <Text>{str}</Text>
      </Tag>,
    );
    expect(tag).toContainReactComponent(Icon, {
      source: 'delivered',
    });
    expect(tag.findAll(Icon)).toHaveLength(1);
  });
});
