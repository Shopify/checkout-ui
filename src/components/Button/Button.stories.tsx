import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {ButtonGroup} from '../ButtonGroup';
import {Heading} from '../Heading';
import {BlockStack} from '../BlockStack';
import {TextBlock} from '../TextBlock';
import {TextContainer} from '../TextContainer';
import {Divider} from '../Divider';
import {Banner} from '../Banner';
import {InlineStack} from '../InlineStack';
import {View} from '../View';

import {Button, Props} from './Button';

const meta = {
  component: Button,
  title: 'checkout-web-ui/Button',
  decorators: [withKnobs, themeWithKnobs('primaryButton', 'secondaryButton')],
  argTypes: {
    kind: {
      control: {
        type: 'select',
        options: [undefined, 'primary', 'secondary', 'plain'],
      },
    },
    appearance: {
      control: {
        type: 'select',
        options: [undefined, 'monochrome', 'critical'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: [undefined, 'base', 'large'],
      },
    },
  },
};

export default meta;

export const ButtonStory = (args: Props) => <Button {...args}>Button</Button>;

ButtonStory.args = {
  kind: 'primary',
  size: 'base',
  appearance: undefined,
  to: 'javascript:;',
  fill: false,
  loading: false,
  loadingLabel: 'Processing…',
  accessibilityLabel: '',
  disabled: false,
};

ButtonStory.story = {
  name: 'Button',
};

const content = 'Pay now';

export const AllButtons = () => (
  <BlockStack>
    <TextContainer spacing="none">
      <Heading level={3}>Type</Heading>
      <TextBlock subdued>primary - secondary - plain</TextBlock>
    </TextContainer>
    <ButtonGroup>
      <Button kind="primary">{content}</Button>
      <Button kind="secondary">{content}</Button>
      <Button kind="plain">{content}</Button>
    </ButtonGroup>

    <Divider />

    <TextContainer spacing="none">
      <Heading level={3}>Size</Heading>
      <TextBlock subdued>base - large - extraLarge</TextBlock>
    </TextContainer>
    <ButtonGroup>
      <Button>{content}</Button>
      <Button size="large">{content}</Button>
      <Button size="extraLarge">{content}</Button>
    </ButtonGroup>

    <TextContainer spacing="none">
      <Heading level={3}>Responsive size</Heading>
      <TextBlock subdued>
        Default: <code>extraLarge</code>
        <br /> Media small: <code>large</code>
        <br /> Media medium: <code>base</code>
        <br /> Media large: <code>base</code>
      </TextBlock>
    </TextContainer>
    <View>
      <Button
        size={{
          base: 'extraLarge',
          small: 'large',
          medium: 'base',
          large: 'base',
        }}
      >
        {content}
      </Button>
    </View>

    <Divider />

    <TextContainer spacing="none">
      <Heading level={3}>Appearance</Heading>
      <TextBlock subdued>monochrome - critical</TextBlock>
    </TextContainer>
    <ButtonGroup>
      <Button appearance="monochrome">{content}</Button>
      <Button kind="secondary" appearance="monochrome">
        {content}
      </Button>
      <Button kind="plain" appearance="monochrome">
        {content}
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button appearance="critical">{content}</Button>
      <Button kind="secondary" appearance="critical">
        {content}
      </Button>
      <Button kind="plain" appearance="critical">
        {content}
      </Button>
    </ButtonGroup>

    <Divider />

    <Heading level={3}>Disabled</Heading>
    <ButtonGroup>
      <Button disabled>{content}</Button>
      <Button kind="secondary" disabled>
        {content}
      </Button>
      <Button kind="plain" disabled>
        {content}
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button disabled appearance="monochrome">
        {content}
      </Button>
      <Button kind="secondary" disabled appearance="monochrome">
        {content}
      </Button>
      <Button kind="plain" disabled appearance="monochrome">
        {content}
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button disabled appearance="critical">
        {content}
      </Button>
      <Button kind="secondary" disabled appearance="critical">
        {content}
      </Button>
      <Button kind="plain" disabled appearance="critical">
        {content}
      </Button>
    </ButtonGroup>

    <Divider />

    <Heading level={3}>Loading</Heading>
    <ButtonGroup>
      <Button loading disabled>
        {content}
      </Button>
      <Button loading kind="secondary" disabled>
        {content}
      </Button>
      <Button loading kind="plain" disabled>
        {content}
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button loading disabled appearance="monochrome">
        {content}
      </Button>
      <Button loading kind="secondary" disabled appearance="monochrome">
        {content}
      </Button>
      <Button loading kind="plain" disabled appearance="monochrome">
        {content}
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button loading disabled appearance="critical">
        {content}
      </Button>
      <Button loading kind="secondary" disabled appearance="critical">
        {content}
      </Button>
      <Button loading kind="plain" disabled appearance="critical">
        {content}
      </Button>
    </ButtonGroup>

    <Divider />

    <TextContainer spacing="none">
      <Heading level={3}>Appearance</Heading>
      <TextBlock subdued>monochrome inside Banner</TextBlock>
    </TextContainer>
    <Banner status="info" title="This is a title">
      <InlineStack alignment="center">
        <Button kind="primary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="secondary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="plain" appearance="monochrome">
          {content}
        </Button>
      </InlineStack>
    </Banner>

    <Banner status="warning" title="This is a title">
      <InlineStack alignment="center">
        <Button kind="primary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="secondary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="plain" appearance="monochrome">
          {content}
        </Button>
      </InlineStack>
    </Banner>

    <Banner status="critical" title="This is a title">
      <InlineStack alignment="center">
        <Button kind="primary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="secondary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="plain" appearance="monochrome">
          {content}
        </Button>
      </InlineStack>
    </Banner>

    <Banner status="success" title="This is a title">
      <InlineStack alignment="center">
        <Button kind="primary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="secondary" appearance="monochrome">
          {content}
        </Button>
        <Button kind="plain" appearance="monochrome">
          {content}
        </Button>
      </InlineStack>
    </Banner>
  </BlockStack>
);
