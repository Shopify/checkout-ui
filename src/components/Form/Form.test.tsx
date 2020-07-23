import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {VisuallyHidden} from '../VisuallyHidden';

import {Form} from './Form';

describe('<Form />', () => {
  it('defaults to an empty action, POST method, and no validation', () => {
    const form = mountWithContext(<Form onSubmit={noop} />);
    expect(form).toContainReactComponent('form', {
      action: '',
      method: 'POST',
      noValidate: true,
    });
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn();
    const form = mountWithContext(<Form onSubmit={onSubmit} />);

    form.find('form')!.trigger('onSubmit', createSubmitEvent());

    expect(onSubmit).toHaveBeenCalled();
  });

  it('prevents default when the form is submitted', () => {
    const event = createSubmitEvent();
    const form = mountWithContext(<Form onSubmit={noop} />);

    form.find('form')!.trigger('onSubmit', event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  describe('implicitSubmit', () => {
    it('renders a visually hidden submit with the submit label by default', () => {
      const expectedLabel = 'Submit';
      const form = mountWithContext(<Form onSubmit={noop} />, {
        translate: (key) => (key === 'submit' ? expectedLabel : 'abc'),
      });

      expect(form.find(VisuallyHidden)).toContainReactComponent('button', {
        type: 'submit',
        children: expectedLabel,
        tabIndex: -1,
        'aria-hidden': true,
      });
    });

    it('renders a visually hidden submit with a custom label', () => {
      const expectedLabel = 'Complete purchase';
      const form = mountWithContext(
        <Form onSubmit={noop} implicitSubmit={expectedLabel} />,
      );

      expect(form.find(VisuallyHidden)).toContainReactComponent('button', {
        type: 'submit',
        children: expectedLabel,
      });
    });

    it('does not render a visually hidden submit when false', () => {
      const form = mountWithContext(
        <Form onSubmit={noop} implicitSubmit={false} />,
      );
      expect(form).not.toContainReactComponent(VisuallyHidden);
      expect(form).not.toContainReactComponent('button', {type: 'submit'});
    });

    it('disables the submit when disabled is true', () => {
      const form = mountWithContext(<Form onSubmit={noop} disabled />);
      expect(form.find(VisuallyHidden)).toContainReactComponent('button', {
        type: 'submit',
        disabled: true,
      });
    });
  });
});

function createSubmitEvent() {
  return {preventDefault: jest.fn()};
}

function noop() {}
