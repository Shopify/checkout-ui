import React from 'react';

import {AutoHeadingGroup} from '../../utilities/auto-headings';
import {mountWithContext} from '../../test-utilities';

import {Heading} from './Heading';

describe('<Heading />', () => {
  it('renders its children', () => {
    const text = 'Snowdevil';
    const heading = mountWithContext(<Heading>{text}</Heading>);

    expect(heading).toContainReactText(text);
  });

  it('uses a <p> when the role is set to presentation', () => {
    const heading = mountWithContext(
      <Heading role="presentation">Snowdevil</Heading>,
    );
    expect(heading).toContainReactComponent('p');
  });

  it('assigns an id and focusable tabIndex on the element when an id is set', () => {
    const id = 'MyId';
    const heading = mountWithContext(
      <Heading role="presentation" id={id}>
        Snowdevil
      </Heading>,
    );

    expect(heading).toContainReactComponent('p', {id, tabIndex: -1});
  });

  it('uses a heading based on the semantic heading level', () => {
    const headings = mountWithContext(
      <AutoHeadingGroup level={1}>
        <Heading id="one">Snowdevil</Heading>
        <AutoHeadingGroup>
          <Heading id="two">History</Heading>
        </AutoHeadingGroup>
      </AutoHeadingGroup>,
    );

    expect(headings).toContainReactComponent('h1', {id: 'one'});
    expect(headings).toContainReactComponent('h2', {id: 'two'});
  });
});
