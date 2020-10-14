import React, {useEffect} from 'react';
import {mount} from '@quilted/react-testing/dom';

import {useMounted} from './mounted';

describe('useMounted', () => {
  it('returns true if component is mounted', () => {
    const spy = jest.fn();

    function Mounted() {
      const mounted = useMounted();

      useEffect(() => {
        spy(mounted);
      }, [mounted]);

      return null;
    }

    mount(<Mounted />);

    expect(spy.mock.calls).toMatchObject([[{current: true}]]);
  });

  it('returns false if component is unmounted', () => {
    const spy = jest.fn();

    function Unmounted() {
      const mounted = useMounted();

      useEffect(() => {
        spy(mounted);
      }, [mounted]);

      return null;
    }

    const unmountedComponent = mount(<Unmounted />);
    unmountedComponent.unmount();

    expect(spy.mock.calls).toMatchObject([[{current: false}]]);
  });
});
