import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';

import {Section, SectionContext} from './Section';

describe('<Section />', () => {
  it('renders its children', () => {
    const children = faker.random.words();
    const section = mountWithContext(<Section>{children}</Section>);

    expect(section).toContainReactText(children);
  });

  it('wraps children with SectionContext of level 1', () => {
    const section = mountWithContext(<Section />);

    expect(section).toProvideReactContext(SectionContext, {
      level: 1,
    });
  });

  it('renders the Heading not wrapped in a HeadingGroup', () => {
    const heading = faker.random.words();
    const section = mountWithContext(
      <Section>
        <Heading>{heading}</Heading>
      </Section>,
    );

    expect(section).not.toContainReactComponent(HeadingGroup);
    expect(section).toContainReactComponent(Heading, {
      children: heading,
    });
  });

  describe('nested <Section />', () => {
    it('renders the Heading wrapped in a HeadingGroup', () => {
      const heading = faker.random.words();
      const section = mountWithContext(
        <Section>
          <Section>
            <Heading>{heading}</Heading>
          </Section>
        </Section>,
      );

      expect(section.find(HeadingGroup)).toContainReactComponent(Heading, {
        children: heading,
      });
    });

    it('wraps the nested Section children with SectionContext of level 2', () => {
      const children = faker.random.words();
      const section = mountWithContext(
        <Section>
          <Section>
            <Heading>{children}</Heading>
          </Section>
        </Section>,
      );

      expect(section.find(Section)).toProvideReactContext(SectionContext, {
        level: 2,
      });
    });
  });
});
