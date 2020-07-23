import 'preact/debug';
import '@quilted/react-testing/matchers';
import '@quilted/react-testing/dom-matchers';
import {unmountAll} from '@quilted/react-testing/dom';
import {ensureMocksReset} from '@shopify/jest-dom-mocks';

if (typeof window !== 'undefined') {
  Object.defineProperties(window, {
    matchMedia: {
      value: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
      }),
      writable: true,
    },
  });
}

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  ensureMocksReset();
  unmountAll();
});
