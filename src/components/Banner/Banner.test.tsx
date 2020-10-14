import React, {ComponentProps} from 'react';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {Bookend} from '../Bookend';

import {Banner} from './Banner';

const defaultProps: ComponentProps<typeof Banner> = {
  title: 'There was an error',
};

describe('<Banner />', () => {
  describe('children', () => {
    it('renders the children', () => {
      const banner = mountWithContext(
        <Banner {...defaultProps}>
          <Text>Hello</Text>
        </Banner>,
      );

      expect(banner).toContainReactComponent(Text);
      expect(banner).toContainReactComponent(Bookend, {
        trailing: false,
      });
    });
  });

  describe('title', () => {
    it('renders the title', () => {
      const title = 'There was an error.';
      const banner = mountWithContext(<Banner title={title} />);

      expect(banner).toContainReactText(title);
    });
  });

  describe('status', () => {
    it('renders the info <Icon /> by default', () => {
      const banner = mountWithContext(<Banner {...defaultProps} />);
      expect(banner).toContainReactComponent(Icon, {
        source: 'info',
      });
    });

    it('renders the success <Icon /> if status is success', () => {
      const status = 'success';
      const banner = mountWithContext(
        <Banner {...defaultProps} status={status} />,
      );
      expect(banner).toContainReactComponent(Icon, {
        source: status,
      });
    });

    it('renders the warning <Icon /> if status is warning', () => {
      const status = 'warning';
      const banner = mountWithContext(
        <Banner {...defaultProps} status={status} />,
      );
      expect(banner).toContainReactComponent(Icon, {
        source: status,
      });
    });

    it('renders the critical <Icon /> if status is critical', () => {
      const status = 'critical';
      const banner = mountWithContext(
        <Banner {...defaultProps} status={status} />,
      );
      expect(banner).toContainReactComponent(Icon, {
        source: status,
      });
    });

    it('sets the status live region role by default', () => {
      const banner = mountWithContext(<Banner {...defaultProps} />);
      expect(banner).toContainReactComponent('div', {
        role: 'status',
      });
    });

    it('sets the alert live region role if status is critical', () => {
      const status = 'critical';
      const banner = mountWithContext(
        <Banner {...defaultProps} status={status} />,
      );
      expect(banner).toContainReactComponent('div', {
        role: 'alert',
      });
    });
  });

  describe('collapsible', () => {
    it('renders a chevronDown button with the required aria attributes if collapsible', () => {
      const banner = mountWithContext(<Banner {...defaultProps} collapsible />);

      expect(banner).toContainReactComponent('button', {
        'aria-pressed': false,
        'aria-expanded': false,
      });
      expect(banner).toContainReactComponent(Icon, {
        source: 'chevronDown',
      });
      expect(banner).toContainReactComponent(Bookend, {
        trailing: true,
      });
    });

    it('hides the children if collapsible', () => {
      const banner = mountWithContext(
        <Banner {...defaultProps} collapsible>
          <Text>Hello</Text>
        </Banner>,
      );

      expect(banner).not.toContainReactComponent(Text);
    });

    it('renders a chevronUp button with the required aria attributes icon on button click if collapsible', () => {
      const banner = mountWithContext(<Banner {...defaultProps} collapsible />);

      banner.find('button')?.trigger('onClick');
      expect(banner).toContainReactComponent('button', {
        'aria-pressed': true,
        'aria-expanded': true,
      });
      expect(banner).toContainReactComponent(Icon, {
        source: 'chevronUp',
      });
      expect(banner).toContainReactComponent(Bookend, {
        trailing: true,
      });
    });

    it('renders the children on button click if collapsible', () => {
      const banner = mountWithContext(
        <Banner {...defaultProps} collapsible>
          <Text>Hello</Text>
        </Banner>,
      );

      banner.find('button')?.trigger('onClick');
      expect(banner).toContainReactComponent(Text);
    });
  });

  describe('iconHidden', () => {
    it('renders the <Icon /> by default', () => {
      const banner = mountWithContext(<Banner {...defaultProps} />);

      expect(banner).toContainReactComponent(Icon);
      expect(banner).toContainReactComponent(Bookend, {
        leading: true,
      });
    });

    it('does not render the <Icon /> if iconHidden', () => {
      const banner = mountWithContext(<Banner {...defaultProps} iconHidden />);

      expect(banner).not.toContainReactComponent(Icon);
      expect(banner).toContainReactComponent(Bookend, {
        leading: false,
      });
    });
  });

  describe('autofocus', () => {
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

    it('does not focus the banner by default', () => {
      mountWithContext(<Banner {...defaultProps} />);

      expect(focusSpy).not.toHaveBeenCalled();
    });

    it('focuses on the banner when autofocus is specified', () => {
      mountWithContext(<Banner {...defaultProps} autofocus />);

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('sets the tabIndex to -1', () => {
      const banner = mountWithContext(<Banner {...defaultProps} autofocus />);

      expect(banner).toContainReactComponent('div', {
        tabIndex: -1,
      });
    });
  });
});
