import React, {PropsWithChildren} from 'react';

import {mountWithContext} from '../../test-utilities';

import {Labelled, Props} from './Labelled';
import {useLabelled} from './hook';
import {LabelledContext} from './context';

const defaultProps: PropsWithChildren<Props> = {
  children: <Child />,
  label: '',
  htmlFor: '',
  empty: true,
};

describe('<Labelled />', () => {
  it('renders the children', async () => {
    const labelled = mountWithContext(<Labelled {...defaultProps} />);
    expect(labelled).toContainReactComponent(Child);
  });

  it('wraps children with a LabelledContext.Provider', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" />,
    );
    expect(labelled).toProvideReactContext(LabelledContext);
  });

  it('renders a floating label when the value is prefilled', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" empty={false} />,
    );

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: true,
      }),
    );
  });

  it('does not render a floating label on focus when empty', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" />,
    );

    // Gain focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onFocus');
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: false,
      }),
    );
  });

  it('renders a floating label once a value is entered', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" />,
    );

    // Enter value
    labelled.act(() => {
      labelled.setProps({empty: false});
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: true,
      }),
    );
  });

  it('renders a floating label when focused, then the value is removed', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} empty={false} label="Email" />,
    );

    // Gain focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onFocus');
    });

    // Remove value
    labelled.act(() => {
      labelled.setProps({empty: true});
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: true,
      }),
    );
  });

  it('does not render a floating label when not focused and the value is removed', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} empty={false} label="Email" />,
    );

    // Remove value
    labelled.act(() => {
      labelled.setProps({empty: true});
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: false,
      }),
    );
  });

  it('does not render a floating label when focused, then a value is entered, then removed, then the focus is lost', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" />,
    );

    // Gain focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onFocus');
    });

    // Enter value
    labelled.act(() => {
      labelled.setProps({empty: false});
    });

    // Remove value
    labelled.act(() => {
      labelled.setProps({empty: true});
    });

    // Lose focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onBlur');
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: false,
      }),
    );
  });

  it('renders a floating label when focused, then a value is entered, then the focus is lost', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" />,
    );

    // Gain focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onFocus');
    });

    // Enter value
    labelled.act(() => {
      labelled.setProps({empty: false});
    });

    // Lose focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onBlur');
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: true,
      }),
    );
  });

  it('renders a floating label when focused, then a value is entered, then lost focus, then focused, then the value removed', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label="Email" />,
    );

    // Gain focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onFocus');
    });

    // Enter value
    labelled.act(() => {
      labelled.setProps({empty: false});
    });

    // Lose focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onBlur');
    });

    // Gain focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onFocus');
    });

    // Remove value
    labelled.act(() => {
      labelled.setProps({empty: true});
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        floating: true,
      }),
    );
  });
});

function Child({value}: {value?: string}) {
  const {onBlur, onFocus} = useLabelled();

  return (
    <input
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={() => {}}
    />
  );
}
