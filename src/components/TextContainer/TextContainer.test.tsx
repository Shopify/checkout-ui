import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {TextContainer} from './TextContainer';

const child = <p>Hey</p>;

describe('TextContainer', () => {
  it('renders a single element', () => {
    const textContainer = mount(<TextContainer>{child}</TextContainer>);

    expect(textContainer).toContainReactComponentTimes('p', 1);
  });

  it('renders multiple elements', () => {
    const textContainer = mount(
      <TextContainer>
        {child}
        {child}
      </TextContainer>,
    );

    expect(textContainer).toContainReactComponentTimes('p', 2);
  });

  it('renders nested TextContainers', () => {
    const textContainer = mount(
      <TextContainer>
        {child}
        {child}
        <TextContainer>
          {child}
          {child}
        </TextContainer>
      </TextContainer>,
    );

    expect(textContainer).toContainReactComponentTimes('p', 4);
  });
});
