import React, {ComponentPropsWithRef} from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Heading} from '../Heading';

import {Modal} from './Modal';

const Child = () => <div />;

describe('<Modal />', () => {
  const defaultProps = {
    title: faker.random.words(2),
    children: <Child />,
    open: true,
    onClose: () => {},
  };
  const defaultPropsWithSource = {
    ...defaultProps,
    children: undefined,
    source: faker.internet.url(),
  };
  const defaultPropsWithBlocking = {
    ...defaultProps,
    onClose: undefined,
  };

  describe('open prop', () => {
    it('renders the modal when the open prop is true', async () => {
      const modal = await mountWithContext(<Modal {...defaultProps} />);
      expect(modal).toContainReactComponent(Child);
    });

    it("doesn't render the modal when the open prop is false", async () => {
      const modal = await mountWithContext(
        <Modal {...defaultProps} open={false} />,
      );

      expect(modal).not.toContainReactComponent(Child);
    });
  });

  it('renders an iframe is the src prop is passed', async () => {
    const modal = await mountWithContext(<Modal {...defaultPropsWithSource} />);
    expect(modal).toContainReactComponent('iframe', {
      src: defaultPropsWithSource.source,
      title: defaultPropsWithSource.title,
    });
  });

  it('renders its children if no src prop is passed', async () => {
    const modal = await mountWithContext(<Modal {...defaultProps} />);
    expect(modal).not.toContainReactComponent('iframe');
    expect(modal).toContainReactComponent(Child);
  });

  it('renders a header with Heading if the title prop is passed', async () => {
    const modal = await mountWithContext(<Modal {...defaultProps} />);

    expect(modal).toContainReactComponent('header');
    expect(modal).toContainReactComponent(Heading);
    expect(modal).toContainReactText(defaultProps.title);
  });

  it('does not render a Heading if titleHidden', async () => {
    const modal = await mountWithContext(
      <Modal {...defaultProps} titleHidden />,
    );

    expect(modal).not.toContainReactComponent(Heading);
  });

  it('still renders a close button if titleHidden', async () => {
    const modal = await mountWithContext(
      <Modal {...defaultProps} titleHidden />,
    );

    const header = modal.find('header');
    expect(header).toContainReactComponent('button');
  });

  describe('when the escape key is pressed', () => {
    it('calls onClose callback', async () => {
      const onCloseSpy = jest.fn();
      const modal = await mountWithContext(
        <Modal {...defaultProps} onClose={onCloseSpy} />,
      );
      const event = new KeyboardEvent('keydown', {key: 'Escape'} as any);
      modal.act(() => document.dispatchEvent(event));

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the close button is clicked', () => {
    it('calls onClose callback', async () => {
      const onCloseSpy = jest.fn();
      const modal = await mountWithContext(
        <Modal {...defaultProps} onClose={onCloseSpy} />,
      );
      const header = modal.find('header');
      header?.find('button')?.trigger('onClick');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });

    // Skipped until we figure out how to test async events
    // as the `iframeHeight` is reset on `transitionend`
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('resets the iFrameHeight', async () => {
      const expectedHeight = 100;
      const fakeEvent = {
        target: {
          contentWindow: {document: {body: {scrollHeight: expectedHeight}}},
        },
      };
      const modal = await mountWithContext(
        <Modal {...defaultPropsWithSource} />,
      );

      modal.find('iframe')?.trigger('onLoad', fakeEvent as any);

      expect(modal.find('iframe')!.prop('style')).toMatchObject({
        height: expectedHeight,
      });

      modal.find('header button')?.trigger('onClick');
      modal.setProps({open: false});
      modal.setProps({open: true});

      expect(modal.find('iframe')!.prop('style')).toBeUndefined();
    });
  });

  describe('when the backdrop is clicked', () => {
    it('calls onClose callback', async () => {
      const onCloseSpy = jest.fn();
      const modal = await mountWithContext(
        <Modal {...defaultProps} onClose={onCloseSpy} />,
      );
      const backdrop = modal.findWhere<ComponentPropsWithRef<'div'>>(
        (node: any) => node?.props.className?.includes('Backdrop'),
      );

      backdrop?.trigger('onClick');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('blocking prop', () => {
    it("doesn't render the close button", async () => {
      const modal = await mountWithContext(
        <Modal {...defaultPropsWithBlocking} blocking />,
      );

      expect(modal).not.toContainReactComponent('header button');
    });

    it("doesn't close the modal when the escape key is pressed", async () => {
      const modal = await mountWithContext(
        <Modal {...defaultPropsWithBlocking} blocking />,
      );
      const event = new KeyboardEvent('keydown', {key: 'Escape'} as any);
      modal.act(() => document.dispatchEvent(event));

      expect(modal).toContainReactComponent(Child);
    });
  });

  describe('blockSize prop', () => {
    it("doesn't add the onLoad prop when present", async () => {
      const modal = await mountWithContext(
        <Modal blockSize="fill" {...defaultPropsWithSource} />,
      );
      const iframe = modal.find('iframe');

      expect(iframe?.prop('onLoad')).toBeUndefined();
    });

    it('adds the onLoad prop when absent', async () => {
      const modal = await mountWithContext(
        <Modal {...defaultPropsWithSource} />,
      );
      const iframe = modal.find('iframe');

      expect(iframe?.prop('onLoad')).not.toBeUndefined();
    });
  });

  describe('maxInlineSize prop', () => {
    it('sets a max-width to the dialog', async () => {
      const modal = await mountWithContext(
        <Modal maxInlineSize={0.9} {...defaultProps} />,
      );

      expect(modal).toContainReactComponent('div', {
        style: {maxWidth: '90%'},
      });
    });
  });
});
