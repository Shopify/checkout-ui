import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {Thumbnail, Props} from '.';

const defaultProps: Props = {
  source: faker.internet.url(),
  description: faker.lorem.words(2),
};

describe('Thumbnail', () => {
  it('renders an <img /> with an src and an alt attributes', () => {
    const thumbnail = mount(<Thumbnail {...defaultProps} badge="1" />);

    expect(thumbnail).toContainReactComponent('img', {
      src: defaultProps.source,
      alt: defaultProps.description,
    });
  });

  it('renders a badge when provided as a string', () => {
    const thumbnail = mount(<Thumbnail {...defaultProps} badge="1" />);

    expect(thumbnail.find('span')).toContainReactText('1');
  });

  it('renders a badge when provided as a number', () => {
    const thumbnail = mount(<Thumbnail {...defaultProps} badge={0} />);

    expect(thumbnail.find('span')).toContainReactText('0');
  });

  it("doesn't render a badge when not provided", () => {
    const thumbnail = mount(<Thumbnail {...defaultProps} />);

    expect(thumbnail).not.toContainReactComponent('span');
  });
});
