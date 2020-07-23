import React from 'react';
import faker from 'faker';

import {TextContainer} from '../TextContainer';

import {Image} from './Image';

const meta = {
  component: Image,
  title: 'Image',
};

export default meta;

export const defaultState = () => (
  <Image source="http://placekitten.com/g/320/180" />
);

export const lazyLoading = () => (
  <Image
    source="http://placekitten.com/g/320/180"
    description="placekitten.com"
    loading="lazy"
  />
);

export const cover = () => (
  <div style={{width: 256}}>
    <Image
      source="http://placekitten.com/g/320/180"
      sources={[
        {source: 'http://placekitten.com/g/320/180', resolution: 1},
        {source: 'http://placekitten.com/g/640/360', resolution: 2},
      ]}
      aspectRatio={1}
      fit="cover"
      bordered
      description="placekitten.com"
    />
  </div>
);

export const contain = () => (
  <div style={{width: 256}}>
    <Image
      source="http://placekitten.com/g/320/180"
      sources={[
        {source: 'http://placekitten.com/g/320/180', resolution: 1},
        {source: 'http://placekitten.com/g/640/360', resolution: 2},
      ]}
      aspectRatio={1}
      fit="contain"
      bordered
      description="placekitten.com"
    />
  </div>
);

export const responsive = () => (
  <Image
    source="http://placekitten.com/g/320/180"
    sources={[
      {
        source: 'http://placekitten.com/g/320/180',
        resolution: 1,
        viewportSize: 'small',
      },
      {
        source: 'http://placekitten.com/g/640/360',
        resolution: 2,
        viewportSize: 'small',
      },
      {
        source: 'http://placekitten.com/g/640/360',
        resolution: 1,
        viewportSize: 'medium',
      },
      {
        source: 'http://placekitten.com/g/1280/720',
        resolution: 2,
        viewportSize: 'medium',
      },
      {
        source: 'http://placekitten.com/g/1280/720',
        resolution: 1,
        viewportSize: 'large',
      },
      {
        source: 'http://placekitten.com/g/2560/1440',
        resolution: 2,
        viewportSize: 'large',
      },
    ]}
    description="placekitten.com"
  />
);

export const aspectRatio = () => (
  <div style={{width: 320}}>
    <TextContainer>
      <Image source="http://placekitten.com/g/640/360" aspectRatio={3} />
      <p>{faker.lorem.paragraphs(3)}</p>
    </TextContainer>
  </div>
);
