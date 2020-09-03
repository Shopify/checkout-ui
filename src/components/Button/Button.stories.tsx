import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {ButtonGroup} from '../ButtonGroup';

import {Button} from './Button';

const meta = {
  component: Button,
  title: 'Button',
  decorators: [withKnobs, themeWithKnobs('primaryButton', 'secondaryButton')],
};

export default meta;

export const allButtons = () => (
  <ButtonGroup>
    <Button>Default</Button>
    <Button secondary>Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button to="/">With URL prop</Button>
    <Button subdued>Subdued</Button>
    <Button plain>Plain</Button>
  </ButtonGroup>
);

function ToggleLoader() {
  const [loading, setLoading] = useState(false);

  const defaultProps = {
    loading,
    loadingLabel: 'Processing…',
    onPress: () => setLoading(true),
  };

  return (
    <ButtonGroup>
      <Button {...defaultProps}>Default</Button>
      <Button secondary {...defaultProps}>
        Secondary
      </Button>
      <Button disabled {...defaultProps}>
        Disabled
      </Button>
      <Button to="/" {...defaultProps}>
        With URL prop
      </Button>
      <Button subdued {...defaultProps}>
        Subdued
      </Button>
      <Button plain {...defaultProps}>
        Plain
      </Button>
      <Button plain onPress={() => setLoading(false)}>
        Stop loading
      </Button>
    </ButtonGroup>
  );
}

export const loading = () => <ToggleLoader />;
