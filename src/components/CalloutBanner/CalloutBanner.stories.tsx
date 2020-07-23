import React from 'react';

import {Text} from '../Text';
import {themeWithKnobs} from '../../storybook-utilities';
import {BlockStack} from '../BlockStack';

import {CalloutBanner} from './CalloutBanner';

const meta = {
  component: CalloutBanner,
  title: 'CalloutBanner',
  decorators: [themeWithKnobs('headingLevel3')],
};

export default meta;

export const title = () => (
  <CalloutBanner title="Special offer today only">
    <Text>Add the Dinghy Skeleton Cruiser to your order and save 15%</Text>
  </CalloutBanner>
);

export const withoutTitle = () => (
  <CalloutBanner>
    <Text>
      Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
      ends in <Text emphasized>04:48</Text>
    </Text>
  </CalloutBanner>
);

export const border = () => (
  <CalloutBanner border="none">
    <Text>
      Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
      ends in <Text emphasized>04:48</Text>
    </Text>
  </CalloutBanner>
);

export const background = () => (
  <CalloutBanner background="transparent">
    <Text>
      Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
      ends in <Text emphasized>04:48</Text>
    </Text>
  </CalloutBanner>
);

export const alignment = () => (
  <BlockStack>
    <CalloutBanner alignment="leading">
      <Text>
        Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
        ends in <Text emphasized>04:48</Text>
      </Text>
    </CalloutBanner>
    <CalloutBanner>
      <Text>
        Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
        ends in <Text emphasized>04:48</Text>
      </Text>
    </CalloutBanner>
    <CalloutBanner alignment="trailing">
      <Text>
        Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
        ends in <Text emphasized>04:48</Text>
      </Text>
    </CalloutBanner>
  </BlockStack>
);

export const spacing = () => (
  <CalloutBanner title="Special offer today only" spacing="none">
    <Text>
      Add the Dinghy Skeleton Cruiser to your order and save 15%. This offer
      ends in <Text emphasized>04:48</Text>
    </Text>
  </CalloutBanner>
);
