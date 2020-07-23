import React from 'react';

import {mountWithContext} from '../../test-utilities';

import {CalloutBanner} from '.';

describe('<CalloutBanner />', () => {
  it('renders the title and children', () => {
    const title = 'Special Offer';
    const description = 'Buy this thing!';
    const callout = mountWithContext(
      <CalloutBanner title={title}>
        <p>{description}</p>
      </CalloutBanner>,
    );

    expect(callout).toContainReactText(title);
    expect(callout).toContainReactText(description);
  });
});
