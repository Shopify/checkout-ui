import React from 'react';

import {mountWithContext} from '../test-utilities';

import {useFocusTrap} from './focusTrap';

jest.useFakeTimers();

describe('useFocusTrap', () => {
  const rawCreateElement = document.createElement;
  const focusSpy = jest.fn();
  const createElementSpy = jest.spyOn(document, 'createElement');

  beforeEach(() => {
    createElementSpy.mockImplementation((...args) => {
      const result = rawCreateElement.apply(document, args);
      if (args[0].toLocaleLowerCase() === 'div') {
        result.focus = focusSpy;
      }
      return result;
    });
  });

  afterEach(() => {
    focusSpy.mockReset();
  });

  afterAll(() => {
    createElementSpy.mockRestore();
  });

  it('focuses the element attached to the reference', () => {
    function Component() {
      const ref = useFocusTrap();

      return <div ref={ref}>Hello</div>;
    }

    const component = mountWithContext(<Component />);

    component.act(() => {
      jest.runAllTimers();
    });

    expect(focusSpy).toHaveBeenCalled();
  });
});
