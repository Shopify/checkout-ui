import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';

import {Thumbnail, Props} from '.';

const defaultProps: Props = {
  description: faker.lorem.words(2),
};

describe('<Thumbnail />', () => {
  describe('badge', () => {
    it('renders a badge when provided as a string', () => {
      const badge = 'New';
      const thumbnail = mountWithContext(
        <Thumbnail {...defaultProps} badge={badge} />,
      );

      expect(thumbnail).toContainReactComponent('span', {
        children: badge,
      });
    });

    it('renders a badge when provided as a number', () => {
      const badge = 1;
      const thumbnail = mountWithContext(
        <Thumbnail {...defaultProps} badge={badge} />,
      );

      expect(thumbnail).toContainReactComponent('span', {
        children: badge,
      });
    });
  });

  describe('source & description', () => {
    it('renders an <img /> with a src and alt when provided with source and description', () => {
      const source = faker.internet.url();
      const description = faker.lorem.words(2);
      const thumbnail = mountWithContext(
        <Thumbnail source={source} description={description} />,
      );

      expect(thumbnail).toContainReactComponent('img', {
        src: source,
        alt: description,
      });
    });

    it('renders a placeholder Icon if source is not provided', () => {
      const thumbnail = mountWithContext(<Thumbnail {...defaultProps} />);

      expect(thumbnail).toContainReactComponent(Icon, {
        source: 'camera',
      });
    });
  });

  describe('sources', () => {
    it('renders a <img /> with srcset when provided with sources', () => {
      const source = faker.internet.url();
      const sources: Props['sources'] = [
        {source: faker.internet.url(), resolution: 1},
        {source: faker.internet.url(), resolution: 2},
        {source: faker.internet.url(), resolution: 3},
      ];
      const thumbnail = mountWithContext(
        <Thumbnail {...defaultProps} source={source} sources={sources} />,
      );

      expect(thumbnail).toContainReactComponent('img', {
        srcSet: sources
          .map(({source, resolution}) => `${source} ${resolution}x`)
          .join(', '),
      });
    });

    it('does not render a <img /> with srcset if sources are undefined', () => {
      const thumbnail = mountWithContext(<Thumbnail {...defaultProps} />);

      expect(thumbnail).not.toContainReactComponent('img', {
        srcSet: expect.anything(),
      });
    });
  });
});
