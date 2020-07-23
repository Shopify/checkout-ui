import React, {useState} from 'react';

import {Button} from './Button';

const meta = {
  component: Button,
  title: 'Button',
};

export default meta;

export const allButtons = () => (
  <>
    <Button>Default</Button>
    <Button secondary>Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button to="/">With URL prop</Button>
    <Button subdued>Subdued</Button>
    <Button plain>Plain</Button>
  </>
);

function ToggleLoader() {
  const [loading, setLoading] = useState(false);

  const defaultProps = {
    loading,
    loadingLabel: 'Processing…',
    onPress: () => setLoading(true),
  };

  return (
    <>
      <Button {...defaultProps}>Default button</Button>
      <Button plain {...defaultProps}>
        Plain button
      </Button>
      <Button disabled {...defaultProps}>
        Disabled button
      </Button>
      <Button plain onPress={() => setLoading(false)}>
        Stop loading
      </Button>
    </>
  );
}

export const loading = () => <ToggleLoader />;
