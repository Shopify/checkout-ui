import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Portal} from '../Portal';

import {Modal} from './Modal';

describe('<Modal />', () => {
  const defaultIFrameSrc = faker.internet.url();

  describe('open prop', () => {
    it('renders the modal when the open prop is true', async () => {
      const modal = await mountWithContext(
        <Modal open src={defaultIFrameSrc} />,
      );
      expect(modal).toContainReactComponent(Portal);
    });

    it("doesn't render the modal when the open prop is undefined", async () => {
      const modal = await mountWithContext(<Modal src={defaultIFrameSrc} />);
      expect(modal).not.toContainReactComponent(Portal);
    });

    it('calls onClose when open changes from true to false', async () => {
      const onCloseSpy = jest.fn();
      const modal = await mountWithContext(
        <Modal onClose={onCloseSpy} src={defaultIFrameSrc} open />,
      );
      modal.setProps({open: false});

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('renders an iframe is the src prop is passed', async () => {
    const iFrameSrc = faker.internet.url();
    const iFrameName = faker.random.words(2);

    const modal = await mountWithContext(
      <Modal src={iFrameSrc} iFrameName={iFrameName} open />,
    );
    expect(modal).toContainReactComponent('iframe', {
      src: iFrameSrc,
      name: iFrameName,
    });
  });

  it('renders its children if no src prop is passed', async () => {
    const content = faker.random.words(2);
    const modal = await mountWithContext(
      <Modal open>
        <p>{content}</p>
      </Modal>,
    );
    expect(modal).not.toContainReactComponent('iframe');
    expect(modal).toContainReactText(content);
  });

  it('renders a header if the title prop is passed', async () => {
    const title = faker.random.words(2);
    const modal = await mountWithContext(
      <Modal src={defaultIFrameSrc} title={title} open />,
    );

    expect(modal).toContainReactComponent('header');
    expect(modal).toContainReactText(title);
  });

  describe('when the escape key is pressed', () => {
    it('closes the modal', async () => {
      const modal = await mountWithContext(
        <Modal src={defaultIFrameSrc} open />,
      );
      const event = new KeyboardEvent('keydown', {key: 'Escape'} as any);
      modal.act(() => document.dispatchEvent(event));

      expect(modal).not.toContainReactComponent(Portal);
    });

    it('calls onClose callback', async () => {
      const onCloseSpy = jest.fn();
      const modal = await mountWithContext(
        <Modal onClose={onCloseSpy} open>
          Hi
        </Modal>,
      );
      const event = new KeyboardEvent('keydown', {key: 'Escape'} as any);
      modal.act(() => document.dispatchEvent(event));

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the close button is clicked', () => {
    it('closes the modal', async () => {
      const modal = await mountWithContext(
        <Modal src={defaultIFrameSrc} title="A modal" open />,
      );
      modal.find('button')?.trigger('onClick');

      expect(modal).not.toContainReactComponent(Portal);
    });

    it('calls onClose callback', async () => {
      const onCloseSpy = jest.fn();
      const modal = await mountWithContext(
        <Modal title="A modal" onClose={onCloseSpy} open>
          Hi
        </Modal>,
      );
      modal.find('button')?.trigger('onClick');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('blocking prop', () => {
    it("doesn't render the close button", async () => {
      const modal = await mountWithContext(
        <Modal src={defaultIFrameSrc} title="A modal" open blocking />,
      );

      expect(modal).not.toContainReactComponent('button');
    });

    it("doesn't close the modal when the escape key is pressed", async () => {
      const modal = await mountWithContext(
        <Modal src={defaultIFrameSrc} open blocking />,
      );
      const event = new KeyboardEvent('keydown', {key: 'Escape'} as any);
      modal.act(() => document.dispatchEvent(event));

      expect(modal).toContainReactComponent(Portal);
    });
  });

  describe('long prop', () => {
    it("doesn't add the onLoad prop when present", async () => {
      const modal = await mountWithContext(
        <Modal src={defaultIFrameSrc} open long />,
      );
      const iframe = modal.find('iframe');

      expect(iframe?.prop('onLoad')).toBeUndefined();
    });

    it('adds the onLoad prop when absent', async () => {
      const modal = await mountWithContext(
        <Modal src={defaultIFrameSrc} open />,
      );
      const iframe = modal.find('iframe');

      expect(iframe?.prop('onLoad')).not.toBeUndefined();
    });
  });
});
