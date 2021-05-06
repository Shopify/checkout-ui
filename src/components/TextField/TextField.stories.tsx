import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {FormLayout} from '../FormLayout';
import {InlineStack} from '../InlineStack';
import {Tooltip} from '../Tooltip';
import {Icon} from '../Icon';

import {TextField} from './TextField';

const meta = {
  component: TextField,
  title: 'checkout-web-ui/TextField',
  decorators: [withKnobs, themeWithKnobs('textFields')],
};

export default meta;

export const defaultState = () => <TextField label="Name" />;

export const inputTypeNumber = () => (
  <TextField label="Quantity" type="number" />
);

export const inputTypeEmail = () => <TextField label="Email" type="email" />;

export const inputTypeTelephone = () => (
  <TextField label="Phone number" type="telephone" />
);

export const prefilledContent = () => (
  <TextField label="Group" value="Shopifolk" />
);

export const errorState = () => <TextField label="Name" error="Enter a name" />;

export const multiline = () => (
  <FormLayout>
    <TextField label="Review" multiline />
    <TextField label="Review" multiline={2} />
    <TextField label="Review" multiline={3} />
    <TextField label="Review" multiline={4} />
  </FormLayout>
);

export const withPrefix = () => (
  <FormLayout>
    <TextField label="Amount" prefix="$" />
    <TextField label="Amount" prefix="USD" />
    <TextField label="Amount (prefilled)" prefix="$" value="7" />
    <TextField
      label="Amount (prefilled)"
      prefix="USD"
      multiline={5}
      value="77"
    />
  </FormLayout>
);

export const withSuffix = () => (
  <FormLayout>
    <TextField label="Amount" suffix="$" />
    <TextField label="Amount" suffix="CAD" />
    <TextField label="Amount" suffix="CAD" multiline={5} />
  </FormLayout>
);

export const withIcon = () => (
  <FormLayout>
    <TextField label="Phone number" icon="mobile" />
    <TextField label="Phone number" icon="mobile" multiline={5} />
  </FormLayout>
);

export const withTooltip = () => (
  <FormLayout>
    <TextField label="Address">
      <InlineStack alignment="center" spacing="tight">
        <Tooltip content="In case we need to contact you about your order">
          <Icon
            source="questionFill"
            size="large"
            appearance="subdued"
            accessibilityLabel="More information"
          />
        </Tooltip>
      </InlineStack>
    </TextField>
    <TextField label="Notes" multiline={5}>
      <InlineStack alignment="center" spacing="tight">
        <Tooltip content="In case we need to contact you about your order">
          <Icon
            source="questionFill"
            size="large"
            appearance="subdued"
            accessibilityLabel="More information"
          />
        </Tooltip>
      </InlineStack>
    </TextField>
  </FormLayout>
);

export const accessibilityDescription = () => (
  <FormLayout>
    <TextField
      label="Email"
      accessibilityDescription="Contact information - Shop 1"
    />
  </FormLayout>
);

export const disabled = () => (
  <FormLayout>
    <TextField label="Order number" disabled />
  </FormLayout>
);

export const readonly = () => <TextField label="Order number" readonly />;
