import React, {ComponentProps} from 'react';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';
import {Button} from '../Button';

import {Banner} from './Banner';

const defaultProps: ComponentProps<typeof Banner> = {
  title: 'There was an error',
};

describe('<Banner />', () => {
  describe('title', () => {
    it('render its children', () => {
      const title = 'There was an error.';
      const banner = mountWithContext(<Banner title={title} />);
      expect(banner).toContainReactText(title);
    });
  });

  describe('status', () => {
    it('renders the right <Icon />', () => {
      const status = 'critical';
      const banner = mountWithContext(
        <Banner {...defaultProps} status={status} />,
      );
      expect(banner).toContainReactComponent(Icon, {
        source: status,
      });
    });
  });

  describe('collapsible', () => {
    it('renders a collapsible button if collapsible', () => {
      const banner = mountWithContext(<Banner {...defaultProps} collapsible />);

      expect(banner).toContainReactComponent(Button, {
        plain: true,
      });
    });

    it('displays chevronDown collapsible button icon by default', () => {
      const banner = mountWithContext(<Banner {...defaultProps} collapsible />);

      expect(banner).toContainReactComponent(Icon, {
        source: 'chevronDown',
      });
    });

    it('displays chevronUp collapsible button icon on press', () => {
      const banner = mountWithContext(<Banner {...defaultProps} collapsible />);

      banner.find(Button)?.trigger('onPress');

      expect(banner).toContainReactComponent(Icon, {
        source: 'chevronUp',
      });
    });

    it('hides the children by default', () => {
      function Child() {
        return <div />;
      }

      const banner = mountWithContext(
        <Banner {...defaultProps} collapsible>
          <Child />
        </Banner>,
      );

      expect(banner).not.toContainReactComponent(Child);
    });

    it('displays the children on press', () => {
      function Child() {
        return <div />;
      }

      const banner = mountWithContext(
        <Banner {...defaultProps} collapsible>
          <Child />
        </Banner>,
      );

      banner.find(Button)?.trigger('onPress');
      expect(banner).toContainReactComponent(Child);
    });
  });

  describe('iconHidden', () => {
    it('renders the <Icon /> by default', () => {
      const banner = mountWithContext(<Banner {...defaultProps} />);
      expect(banner).toContainReactComponent(Icon);
    });

    it('does not renders the <Icon /> when iconHidden is set', () => {
      const banner = mountWithContext(<Banner {...defaultProps} iconHidden />);
      expect(banner).not.toContainReactComponent(Icon);
    });
  });
});
