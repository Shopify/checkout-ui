import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {View} from '../View';

import {Image, MEDIA_MAP} from './Image';

describe('<Image />', () => {
  const source = faker.image.imageUrl();

  describe('sources', () => {
    it('renders a picture element with sources with an img fallback', () => {
      const description = faker.random.words();
      const image = mount(
        <Image
          source={source}
          sources={{base: source}}
          description={description}
          loading="lazy"
        />,
      );

      expect(image).toContainReactComponent('picture');
      expect(image).toContainReactComponent('source', {
        srcSet: source,
      });
      expect(image).toContainReactComponent('img', {
        src: source,
        alt: description,
        loading: 'lazy',
      });
    });

    it('reduces multiple sources with the same breakpoint into a single srcSet', () => {
      const image = mount(
        <Image
          source={source}
          sources={{
            small: [
              {source, resolution: 1},
              {source, resolution: 2},
            ],
          }}
          loading="lazy"
        />,
      );

      expect(image).toContainReactComponent('source', {
        srcSet: `${source} 1x, ${source} 2x`,
        media: MEDIA_MAP.get('small'),
      });
    });

    it('renders an img element only when no sources are provided', () => {
      const image = mount(<Image source={source} />);

      expect(image).not.toContainReactComponent('picture');
      expect(image).not.toContainReactComponent('source');
      expect(image).toContainReactComponent('img', {
        src: source,
      });
    });

    it('renders sources in descending breakpoint width order', () => {
      const image = mount(
        <Image
          source={source}
          sources={{
            small: [{source}, {source, resolution: 2}],
            large: [{source}, {source, resolution: 2}],
            medium: source,
          }}
        />,
      );

      const [largeSource, mediumSource, smallSource] = image.findAll('source');
      expect(largeSource.prop('media')).toBe(MEDIA_MAP.get('large'));
      expect(mediumSource.prop('media')).toBe(MEDIA_MAP.get('medium'));
      expect(smallSource.prop('media')).toBe(MEDIA_MAP.get('small'));
    });

    it('accepts different types of sources', () => {
      const sourceArray = faker.image.imageUrl();
      const sourceString = faker.image.imageUrl();
      const sourceObject = faker.image.imageUrl();

      const image = mount(
        <Image
          source={source}
          sources={{
            base: [{source: sourceArray, resolution: 1}],
            small: sourceString,
            medium: {source: sourceObject},
          }}
        />,
      );

      expect(image).toContainReactComponent('source', {
        srcSet: `${sourceArray} 1x`,
        media: MEDIA_MAP.get('base'),
      });
      expect(image).toContainReactComponent('source', {
        srcSet: sourceString,
        media: MEDIA_MAP.get('small'),
      });
      expect(image).toContainReactComponent('source', {
        srcSet: sourceObject,
        media: MEDIA_MAP.get('medium'),
      });
    });
  });

  describe('decorative', () => {
    it('wraps the image with <View accessibilityVisibility="hidden" />', () => {
      const image = mount(<Image source={source} decorative />);
      expect(image).toContainReactComponent(View, {
        accessibilityVisibility: 'hidden',
      });
    });

    it('by default the image is not wrapped with <View accessibilityVisibility="hidden" />', () => {
      const image = mount(<Image source={source} />);
      expect(image).not.toContainReactComponent(View, {
        accessibilityVisibility: 'hidden',
      });
    });
  });

  describe('aspectRatio', () => {
    it('wraps the image with placeholder container', () => {
      const image = mount(<Image source={source} aspectRatio={16 / 9} />);
      expect(image).toContainReactComponent('div', {
        style: {paddingBottom: `calc(100% / ${16 / 9})`},
      });
    });

    it('by default the image does not have any container', () => {
      const image = mount(<Image source={source} />);
      expect(image).not.toContainReactComponent('div');
    });
  });
});
