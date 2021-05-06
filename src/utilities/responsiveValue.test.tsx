import React, {useEffect} from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {mountWithContext} from '../test-utilities';

import {useResponsiveValue} from './responsiveValue';

describe('useResponsiveValue', () => {
  const spy = jest.fn();

  function Component({values}: {values: any}) {
    const value = useResponsiveValue(values);

    useEffect(() => {
      spy(value);
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

  it('returns undefined if no breakpoint matches', () => {
    const values = {
      small: 'small',
    };

    matchMedia.setMedia(() => ({
      matches: false,
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[undefined]]);
  });

  it('returns base value if it maches base breakpoint', () => {
    const values = {
      base: 'base',
    };

    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 0px) and (max-width: 749px)',
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[values.base]]);
  });

  it('returns small value if it maches small breakpoint', () => {
    const values = {
      small: 'small',
    };

    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 750px) and (max-width: 999px)',
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[values.small]]);
  });

  it('returns medium value if it maches medium breakpoint', () => {
    const values = {
      medium: 'medium',
    };

    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 1000px) and (max-width: 1199px)',
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[values.medium]]);
  });

  it('returns large value if it maches large breakpoint', () => {
    const values = {
      large: 'large',
    };

    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 1200px)',
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[values.large]]);
  });

  it('returns closest value if no breakpoint matches', () => {
    const values = {
      small: 'small',
      large: 'large',
    };

    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 750px) and (max-width: 999px)',
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[values.small]]);
  });

  it('returns closest non undefined value', () => {
    const values = {
      small: 'small',
      medium: null,
      large: undefined,
    };

    matchMedia.setMedia((query) => ({
      matches: query === '(min-width: 1200px)',
    }));

    mountWithContext(<Component values={values} />);

    expect(spy.mock.calls).toMatchObject([[values.medium]]);
  });
});
