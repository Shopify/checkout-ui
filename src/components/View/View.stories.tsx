import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {TextBlock} from '../TextBlock';

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
    <View {...defaultProps} borderWidth="thick">
      thick
    </View>
  </View>
);

export const borderRadius = () => (
  <View {...defaultProps} borderRadius="tight">
    tight
    <View {...defaultProps} borderRadius="base">
      base
      <View {...defaultProps} borderRadius="none">
        none
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
    borderWidth={['base', 'thick']}
  >
    2 directions
    <View
      {...defaultProps}
      padding={['loose', 'extraLoose', 'tight', 'extraTight']}
      borderRadius={['tight', 'none', 'base', 'tight']}
      border={['base', 'dotted', 'none', 'base']}
      borderWidth={['base', 'thick', 'thick', 'base']}
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
    borderWidth={{medium: 'base', large: 'thick'}}
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
        extraLoose padding / thick base border / transparent background
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
