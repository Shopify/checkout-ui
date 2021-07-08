import React, {useEffect} from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {mountWithContext} from '../test-utilities';

import {
  isResponsiveValue,
  maybeResponsiveToArray,
  useResponsiveStyle,
  useResponsiveValue,
} from './responsiveValue';

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

describe('isResponsiveValue', () => {
  it('returns false when a value different of a responsive value is passed', () => {
    expect(isResponsiveValue(undefined)).toBe(false);
    expect(isResponsiveValue(null)).toBe(false);
    expect(isResponsiveValue('some value')).toBe(false);
    expect(isResponsiveValue({})).toBe(false);
    expect(isResponsiveValue({foo: 1, bar: 2})).toBe(false);
    expect(isResponsiveValue({base: 1, small: 2, medium: 3, foo: 4})).toBe(
      false,
    );
  });

  it('returns true when responsive value is passed', () => {
    expect(
      isResponsiveValue({
        small: 'some value',
      }),
    ).toBe(true);
    expect(
      isResponsiveValue({
        base: 1,
        small: 2,
        medium: 3,
        large: 4,
      }),
    ).toBe(true);
  });
});

describe('maybeResponsiveToArray', () => {
  it('returns an array containing the passed non-responsive value as the value for the "base" breakpoint', () => {
    expect(maybeResponsiveToArray('some value')).toStrictEqual([
      ['base', 'some value'],
    ]);
  });

  it('returns an array containing the entries of the responsive value as an array', () => {
    expect(
      new Set(
        maybeResponsiveToArray({
          base: 1,
          small: 2,
          medium: 3,
          large: 4,
        }),
      ),
    ).toStrictEqual(
      new Set([
        ['base', 1],
        ['small', 2],
        ['medium', 3],
        ['large', 4],
      ]),
    );

    expect(
      new Set(
        maybeResponsiveToArray({
          small: 2,
          medium: 3,
        }),
      ),
    ).toStrictEqual(
      new Set([
        ['small', 2],
        ['medium', 3],
      ]),
    );
  });
});

describe('useResponsiveStyle', () => {
  const spy = jest.fn();

  function Component({config}: {config: any}) {
    const value = useResponsiveStyle(config);

    useEffect(() => {
      spy(value);
    });

    return null;
  }

  beforeEach(() => {
    matchMedia.mock();
    matchMedia.setMedia(() => ({
      matches: true,
    }));
  });

  afterEach(() => {
    matchMedia.restore();
    spy.mockReset();
  });

  it('returns an empty object if passed value is undefined', () => {
    mountWithContext(
      <Component
        config={{
          color: {value: undefined},
        }}
      />,
    );

    expect(spy.mock.calls).toMatchObject([[{}]]);
  });

  it('returns a style object with the values', () => {
    mountWithContext(
      <Component
        config={{
          color: {value: 'red'},
          paddingLeft: {value: 1},
        }}
      />,
    );

    expect(spy.mock.calls).toMatchObject([[{color: 'red', paddingLeft: 1}]]);
  });

  it('returns a style object with the responsive value', () => {
    mountWithContext(
      <Component
        config={{
          color: {value: {base: 'red'}},
          paddingLeft: {value: {base: 1}},
        }}
      />,
    );

    expect(spy.mock.calls).toMatchObject([[{color: 'red', paddingLeft: 1}]]);
  });

  it('returns a style object with the transformed value', () => {
    mountWithContext(
      <Component
        config={{
          color: {value: 'red', transform: (value: string) => `dark${value}`},
          paddingLeft: {value: 1, transform: (value: string) => Number(value)},
        }}
      />,
    );

    expect(spy.mock.calls).toMatchObject([
      [{color: 'darkred', paddingLeft: 1}],
    ]);
  });
});
