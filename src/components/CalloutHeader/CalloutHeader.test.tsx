import React from 'react';
import {mount} from '@quilted/react-testing/dom';

import {
  CalloutHeader,
  CheckmarkCircleIcon,
  CancelledCircleIcon,
} from './CalloutHeader';

function Child() {
  return <div />;
}

describe('<CalloutHeader />', () => {
  it('renders its children', () => {
    const calloutHeader = mount(
      <CalloutHeader status="success">
        <Child />
        <Child />
      </CalloutHeader>,
    );

    expect(calloutHeader).toContainReactComponentTimes(Child, 2);
  });

  it('renders a checkmark icon', () => {
    const calloutHeader = mount(
      <CalloutHeader status="success">
        <Child />
      </CalloutHeader>,
    );

    expect(calloutHeader).toContainReactComponent(CheckmarkCircleIcon);
  });

  it('renders a cancelled icon', () => {
    const calloutHeader = mount(
      <CalloutHeader status="cancelled">
        <Child />
      </CalloutHeader>,
    );

    expect(calloutHeader).toContainReactComponent(CancelledCircleIcon);
  });
});
