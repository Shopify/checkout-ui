import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';

import {Tabs} from './Tabs';

describe('<Tabs />', () => {
  describe('selected', () => {
    it('selects the corresponding tab and panel', () => {
      const index = 1;
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2']}
          selected={index}
          onChange={jest.fn()}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
        </Tabs>,
      );

      const buttons = tabs.findAll('button');
      const panels = tabs.findAll('div', {role: 'tabpanel'}) || [];

      expect(buttons[index].prop('aria-selected')).toBe(true);
      expect(panels[index].prop('hidden')).toBe(false);
      expect(buttons[0].prop('aria-selected')).toBe(false);
      expect(panels[0].prop('hidden')).toBe(true);
    });
  });

  describe('onChange', () => {
    it('is called with the corresponding index', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2']}
          selected={1}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
        </Tabs>,
      );

      tabs.find('button')?.trigger('onClick');

      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });
  });

  describe('keyboard events', () => {
    it('"Right" selects the next tab', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2', 'Tab 3']}
          selected={0}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
          <>Content for tab 3</>
        </Tabs>,
      );

      keydown(tabs, 'Right');

      expect(onChangeSpy).toHaveBeenCalledWith(1);
    });

    it('"Right" wraps to the first tab if on the last tab', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2', 'Tab 3']}
          selected={2}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
          <>Content for tab 3</>
        </Tabs>,
      );

      keydown(tabs, 'Right');

      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });

    it('"Left" selects the prev tab', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2', 'Tab 3']}
          selected={1}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
          <>Content for tab 3</>
        </Tabs>,
      );

      keydown(tabs, 'Left');

      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });

    it('"Left" wraps to the last tab if on the first tab', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2', 'Tab 3']}
          selected={0}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
          <>Content for tab 3</>
        </Tabs>,
      );

      keydown(tabs, 'Left');

      expect(onChangeSpy).toHaveBeenCalledWith(2);
    });

    it('"Home" selects the first tab', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2', 'Tab 3']}
          selected={2}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
          <>Content for tab 3</>
        </Tabs>,
      );

      keydown(tabs, 'Home');

      expect(onChangeSpy).toHaveBeenCalledWith(0);
    });

    it('"End" selects the last tab', () => {
      const onChangeSpy = jest.fn();
      const tabs = mountWithContext(
        <Tabs
          tabs={['Tab 1', 'Tab 2', 'Tab 3']}
          selected={0}
          onChange={onChangeSpy}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
          <>Content for tab 2</>
          <>Content for tab 3</>
        </Tabs>,
      );

      keydown(tabs, 'End');

      expect(onChangeSpy).toHaveBeenCalledWith(2);
    });
  });

  describe('<Tab />', () => {
    it('`icon` is rendered', () => {
      const tabs = mountWithContext(
        <Tabs
          tabs={[{label: 'Tab 1', icon: 'truck'}]}
          selected={0}
          onChange={jest.fn()}
          ariaLabel="Tabs test"
        >
          <>Content for tab 1</>
        </Tabs>,
      );

      expect(tabs).toContainReactComponent(Icon, {source: 'truck'});
    });
  });
});

function keydown(tabs: any, event: string) {
  const tabList = tabs.find('div', {role: 'tablist'})?.domNode;
  tabs.act(() =>
    tabList.dispatchEvent(new KeyboardEvent('keydown', {key: event} as any)),
  );
}
