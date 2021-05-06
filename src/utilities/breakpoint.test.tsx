import React, {useEffect} from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {mountWithContext} from '../test-utilities';

import {createMediaQueries, useBreakpoint} from './breakpoint';

describe('createMediaQueries', () => {
  it('creates media queries', () => {
    const mediaQueries = createMediaQueries();

    expect(mediaQueries).toStrictEqual([
      {breakpoint: 'base', query: '(min-width: 0px) and (max-width: 749px)'},
      {
        breakpoint: 'small',
        query: '(min-width: 750px) and (max-width: 999px)',
      },
      {
        breakpoint: 'medium',
        query: '(min-width: 1000px) and (max-width: 1199px)',
      },
      {breakpoint: 'large', query: '(min-width: 1200px)'},
    ]);
  });
});

describe('useBreakpoint', () => {
  const spy = jest.fn();

  function Component() {
    const breakpoint = useBreakpoint();

    useEffect(() => {
      spy(breakpoint);
    });

    return null;
  }

  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
    spy.mockReset();
  });

  it('does not match any breakpoint', () => {
    matchMedia.setMedia(() => ({
      matches: false,
    }));

    mountWithContext(<Component />);

    expect(spy.mock.calls).toMatchObject([[undefined]]);
  });

  it('matches base breakpoint', () => {
    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 0px) and (max-width: 749px)',
    }));

    mountWithContext(<Component />);

    expect(spy.mock.calls).toMatchObject([['base']]);
  });

  it('matches small breakpoint', () => {
    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 750px) and (max-width: 999px)',
    }));

    mountWithContext(<Component />);

    expect(spy.mock.calls).toMatchObject([['small']]);
  });

  it('matches medium breakpoint', () => {
    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 1000px) and (max-width: 1199px)',
    }));

    mountWithContext(<Component />);

    expect(spy.mock.calls).toMatchObject([['medium']]);
  });

  it('matches large breakpoint', () => {
    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 1200px)',
    }));
    mountWithContext(<Component />);

    expect(spy.mock.calls).toMatchObject([['large']]);
  });
});
