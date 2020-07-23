import React, {useEffect, useState} from 'react';
import {mount} from '@quilted/react-testing/dom';

import {useTransition} from './transition';

jest.useFakeTimers();

describe('useTransition', () => {
  it('returns entering transition steps from exited to entered when transitionIn is true', () => {
    const spy = jest.fn();

    function EnteringTransition() {
      const [transitionIn, setTransitionIn] = useState(false);
      const transition = useTransition(transitionIn);

      useEffect(() => {
        setTransitionIn(true);
      }, []);

      useEffect(() => {
        spy(transition);
      });

      return null;
    }

    const enteringTransition = mount(<EnteringTransition />);

    enteringTransition.act(() => {
      jest.runAllTimers();
    });

    expect(spy.mock.calls).toMatchObject([
      ['exited'],
      ['enter'],
      ['entering'],
      ['entered'],
    ]);
  });

  it('returns exiting transition steps from entered to exited when transitionIn is false', () => {
    const spy = jest.fn();

    function ExitingTransition() {
      const [transitionIn, setTransitionIn] = useState(true);
      const transition = useTransition(transitionIn);

      useEffect(() => {
        setTransitionIn(false);
      }, []);

      useEffect(() => {
        spy(transition);
      });

      return null;
    }

    const exitingTransition = mount(<ExitingTransition />);

    exitingTransition.act(() => {
      jest.runAllTimers();
    });

    expect(spy.mock.calls).toMatchObject([
      ['entered'],
      ['exit'],
      ['exiting'],
      ['exited'],
    ]);
  });
});
