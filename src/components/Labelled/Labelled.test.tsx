import React from 'react';

import {mountWithContext} from '../../test-utilities';

import {Labelled, Props} from './Labelled';
import {useLabelled} from './hook';
import {LabelledContext} from './context';

const defaultProps: Props = {
  children: <div />,
  label: '',
  htmlFor: '',
  isEmpty: true,
};

describe('<Labelled />', () => {
  it('renders the children', async () => {
    const labelled = mountWithContext(
      <Labelled {...defaultProps}>
        <Child />
      </Labelled>,
    );
    expect(labelled).toContainReactComponent(Child);
  });

  it('wraps children with a LabelledContext.Provider', async () => {
    const label = 'Email';
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label={label} />,
    );
    expect(labelled).toProvideReactContext(LabelledContext);
  });

  it('hides the floating label if no value is entered', async () => {
    const label = 'Email';
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label={label} />,
    );

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        isFloating: false,
      }),
    );
  });

  it('renders a floating label once a value is entered', async () => {
    const label = 'Email';
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label={label}>
        <Child />
      </Labelled>,
    );

    labelled.act(() => {
      labelled.find('input')?.trigger('oninput' as any, {
        target: {
          value: 'snowdevil@shopify.com',
        },
      });
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        isFloating: true,
      }),
    );
  });

  it('displays a floating label once a value is entered and removed', async () => {
    const label = 'Email';
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label={label}>
        <Child />
      </Labelled>,
    );

    // Enter value
    labelled.act(() => {
      labelled.find('input')?.trigger('oninput' as any, {
        target: {
          value: 'snowdevil@shopify.com',
        },
      });
    });

    // Remove value
    labelled.act(() => {
      labelled.find('input')?.trigger('oninput' as any, {
        target: {
          value: '',
        },
      });
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        isFloating: true,
      }),
    );
  });

  it('hides a floating label once a value is entered, removed and focus is lost', async () => {
    const label = 'Email';
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label={label}>
        <Child />
      </Labelled>,
    );

    // Enter value
    labelled.act(() => {
      labelled.find('input')?.trigger('oninput' as any, {
        target: {
          value: 'snowdevil@shopify.com',
        },
      });
    });

    // Remove value
    labelled.act(() => {
      labelled.find('input')?.trigger('oninput' as any, {
        target: {
          value: '',
        },
      });
    });

    // Lose focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onBlur', {
        target: {
          value: '',
        },
      });
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        isFloating: false,
      }),
    );
  });

  it('displays a floating label once a value is entered and focus is lost', async () => {
    const label = 'Email';
    const labelled = mountWithContext(
      <Labelled {...defaultProps} label={label}>
        <Child />
      </Labelled>,
    );

    // Enter value
    labelled.act(() => {
      labelled.find('input')?.trigger('oninput' as any, {
        target: {
          value: 'snowdevil@shopify.com',
        },
      });
    });

    // Lose focus
    labelled.act(() => {
      labelled.find('input')?.trigger('onBlur', {
        target: {
          value: '',
        },
      });
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        isFloating: true,
      }),
    );
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('displays a floating label if the field is initially empty but its value gets updated', async () => {
    const asynchValue = '150 Elgin';
    const labelled = mountWithContext(
      <Labelled {...defaultProps}>
        <Child value="" />
      </Labelled>,
    );

    // TODO - Failing test, review how we want to test children with async values. Recent Preact changes skip setProperty for children and key props
    // might be the culprit of this specific behaviour. https://github.com/preactjs/preact/pull/2213
    labelled.act(() => {
      labelled.setProps({
        isEmpty: false,
        children: <Child value={asynchValue} />,
      });
    });

    expect(labelled).toContainReactComponent('input', {
      value: asynchValue,
    });

    expect(labelled).toProvideReactContext(
      LabelledContext,
      expect.objectContaining({
        isFloating: true,
      }),
    );
  });
});

function Child({value}: {value?: string}) {
  const {onBlur, onChange, onFocus} = useLabelled();

  return (
    <input
      value={value}
      onBlur={onBlur}
      onChange={({target}) => {
        onChange(!target.value || target.value === '');
      }}
      onFocus={onFocus}
    />
  );
}
