import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../../../storybook-utilities';
import {Text} from '../../../Text';
import {Thumbnail} from '../../../Thumbnail';
import {TextBlock} from '../../../TextBlock';
import {Icon} from '../../../Icon';
import {InlineStack} from '../../../InlineStack';

import {ResourceItem, ResourceItemContent} from './ResourceItem';

const meta = {
  component: ResourceItem,
  title: 'checkout-web-ui/ResourceItem',
  decorators: [
    withKnobs,
    themeWithKnobs(),
    (story: () => JSX.Element) => <div role="table">{story()}</div>,
  ],
};

export default meta;

export const defaultState = () => {
  return (
    <ResourceItem>
      <ResourceItemContent primary>
        <Text emphasized>T-shirt</Text>
      </ResourceItemContent>
      <ResourceItemContent>
        <Text>$10.00</Text>
      </ResourceItemContent>
    </ResourceItem>
  );
};

export const withoutPrimaryContent = () => {
  return (
    <ResourceItem>
      <ResourceItemContent>
        <Text emphasized>T-shirt</Text>
      </ResourceItemContent>
      <ResourceItemContent>
        <Text>$10.00</Text>
      </ResourceItemContent>
    </ResourceItem>
  );
};

export const multipleContent = () => {
  return (
    <ResourceItem>
      <ResourceItemContent>
        <Thumbnail description="some media source" badge={1} />
      </ResourceItemContent>
      <ResourceItemContent primary>
        <TextBlock emphasized>T-shirt</TextBlock>
        <TextBlock size="small" subdued>
          Blue
        </TextBlock>
        <TextBlock appearance="success">
          <InlineStack alignment="center" spacing="extraTight">
            <Icon source="checkmark" size="default" />
            <Text size="small">Available</Text>
          </InlineStack>
        </TextBlock>
      </ResourceItemContent>
      <ResourceItemContent>
        <Text emphasized>$10.00</Text>
      </ResourceItemContent>
    </ResourceItem>
  );
};
