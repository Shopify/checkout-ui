import React from 'react';
import {mount} from '@quilted/react-testing/dom';
import faker from 'faker';

import {HiddenForAccessibility} from '../HiddenForAccessibility';

import {Image, Media} from './Image';

describe('<Image />', () => {
  const source = faker.image.imageUrl();

  describe('sources', () => {
    it('renders a picture element with sources with an img fallback', () => {
      const description = faker.random.words();
      const image = mount(
        <Image
          source={source}
          sources={[{source}]}
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

    it('reduces multiple sources with the same viewportSize into a single srcSet', () => {
      const image = mount(
        <Image
          source={source}
          sources={[
            {source, viewportSize: 'small', resolution: 1},
            {source, viewportSize: 'small', resolution: 2},
          ]}
          loading="lazy"
        />,
      );

      expect(image).toContainReactComponent('source', {
        srcSet: `${source} 1x, ${source} 2x`,
        media: Media.Small,
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
  });

  describe('decorative', () => {
    it('wraps the image with <HiddenForAccessibility />', () => {
      const image = mount(<Image source={source} decorative />);
      expect(image).toContainReactComponent(HiddenForAccessibility);
    });

    it('by default the image is not wrapped with <HiddenForAccessibility />', () => {
      const image = mount(<Image source={source} />);
      expect(image).not.toContainReactComponent(HiddenForAccessibility);
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
