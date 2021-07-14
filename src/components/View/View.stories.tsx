import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {Heading} from '../Heading';
import {BlockStack} from '../BlockStack';
import {TextBlock} from '../TextBlock';
import {TextContainer} from '../TextContainer';
import {Divider} from '../Divider';

import {View} from './View';

const meta = {
  component: View,
  title: 'checkout-web-ui/View',
  decorators: [withKnobs, themeWithKnobs()],
};

export default meta;

const defaultProps = {
  border: 'base',
  padding: 'base',
} as const;

export const background = () => (
  <View {...defaultProps} background="surfacePrimary">
    primary
    <View {...defaultProps} background="surfaceSecondary">
      secondary
      <View {...defaultProps} background="surfaceTertiary">
        tertiary
        <View {...defaultProps} background="transparent">
          transparent
        </View>
      </View>
    </View>
  </View>
);

export const backgroundImage = () => (
  <BlockStack>
    <Heading level={3}>Background image</Heading>
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      padding="extraLoose"
    />
    <Divider />
    <TextContainer spacing="none">
      <Heading level={3}>Background repeat</Heading>
    </TextContainer>
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundRepeat
      padding="extraLoose"
    />
    <Divider />
    <TextContainer spacing="none">
      <Heading level={3}>Background position</Heading>
      <TextBlock subdued>bottom - center - left - right - top</TextBlock>
    </TextContainer>
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundPosition="bottom"
      padding="extraLoose"
    />
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundPosition="center"
      padding="extraLoose"
    />
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundPosition="left"
      padding="extraLoose"
    />
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundPosition="right"
      padding="extraLoose"
    />
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundPosition="top"
      padding="extraLoose"
    />
    <Divider />
    <TextContainer spacing="none">
      <Heading level={3}>Background fit</Heading>
      <TextBlock subdued>contain - cover</TextBlock>
    </TextContainer>
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundFit="contain"
      padding="extraLoose"
    />
    <View
      {...defaultProps}
      backgroundImage="https://via.placeholder.com/200/eee?text=background"
      backgroundFit="cover"
      padding="extraLoose"
    />
    <Divider />
    <TextContainer spacing="none">
      <Heading level={3}>Responsive background image</Heading>
    </TextContainer>
    <View
      {...defaultProps}
      backgroundImage={{
        base: 'https://via.placeholder.com/200/eee?text=base',
        small: 'https://via.placeholder.com/750/eee?text=small',
        medium: 'https://via.placeholder.com/1000/eee?text=medium',
        large: 'https://via.placeholder.com/1200/eee?text=large',
      }}
      padding="extraLoose"
    />
  </BlockStack>
);

export const maxInlineSize = () => (
  <View {...defaultProps} maxInlineSize={0.5}>
    50%
    <View {...defaultProps} maxInlineSize={200}>
      200px
    </View>
  </View>
);

export const border = () => (
  <View {...defaultProps} border="base">
    solid
    <View {...defaultProps} border="dotted">
      dotted
      <View {...defaultProps} border="none">
        none
      </View>
    </View>
  </View>
);

export const borderWidth = () => (
  <View {...defaultProps} borderWidth="base">
    base
    <View {...defaultProps} borderWidth="medium">
      medium
    </View>
  </View>
);

export const borderRadius = () => (
  <View {...defaultProps} borderRadius="tight">
    tight
    <View {...defaultProps} borderRadius="base">
      base
      <View {...defaultProps} borderRadius="loose">
        loose
        <View {...defaultProps} borderRadius="fullyRounded">
          fully rounded
          <View {...defaultProps} borderRadius="none">
            none
          </View>
        </View>
      </View>
    </View>
  </View>
);

export const borderColor = () => (
  <View {...defaultProps} borderColor="base">
    base
    <View {...defaultProps} borderColor="emphasized">
      emphasized
    </View>
  </View>
);

export const padding = () => (
  <View {...defaultProps} padding="extraTight">
    extraTight
    <View {...defaultProps} padding="tight">
      tight
      <View {...defaultProps} padding="base">
        base
        <View {...defaultProps} padding="loose">
          loose
          <View {...defaultProps} padding="extraLoose">
            extraLoose
            <View {...defaultProps} padding="none">
              none
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export const logical = () => (
  <View
    {...defaultProps}
    padding={['base', 'extraTight']}
    borderRadius={['base', 'tight']}
    border={['dotted', 'base']}
    borderWidth={['base', 'medium']}
  >
    2 directions
    <View
      {...defaultProps}
      padding={['loose', 'extraLoose', 'tight', 'extraTight']}
      borderRadius={['tight', 'none', 'base', 'tight']}
      border={['base', 'dotted', 'none', 'base']}
      borderWidth={['base', 'medium', 'medium', 'base']}
    >
      4 directions
    </View>
  </View>
);

export const responsive = () => (
  <View
    maxInlineSize={{
      base: 200,
      small: 300,
      medium: 400,
      large: 800,
    }}
    background={{
      base: 'surfacePrimary',
      small: 'surfaceSecondary',
      medium: 'surfaceTertiary',
      large: 'transparent',
    }}
    border={{
      base: 'base',
      small: 'none',
      medium: 'dotted',
      large: 'base',
    }}
    borderWidth={{medium: 'base', large: 'medium'}}
    padding={{
      base: 'extraTight',
      small: 'base',
      medium: 'loose',
      large: 'extraLoose',
    }}
  >
    <TextBlock>
      Default:{' '}
      <code>extraTight padding / base border / surfacePrimary background</code>
      <br /> Media Small:{' '}
      <code>base padding / no border / surfaceSecondary background</code>
      <br /> Media Medium:{' '}
      <code>
        loose padding / base dotted border / surfaceTertiary background
      </code>
      <br /> Media Large:{' '}
      <code>
        extraLoose padding / medium base border / transparent background
      </code>
    </TextBlock>
  </View>
);

export const display = () => (
  <>
    <View {...defaultProps}>
      These <View display="inline">are</View>{' '}
      <View display="inline">inline</View> views
    </View>
    <br />
    <View {...defaultProps}>
      These <View display="block">are</View> <View display="block">block</View>{' '}
      views
    </View>
  </>
);

export const visibility = () => (
  <>
    <TextBlock>
      There is a visually hidden View inside the box and its content is
      accessible to screen readers.
    </TextBlock>
    <View {...defaultProps}>
      <View visibility="hidden">visually hidden content</View>
    </View>
  </>
);

export const accessibilityVisibility = () => (
  <View {...defaultProps} accessibilityVisibility="hidden">
    This content is not accessible to screen readers
  </View>
);
