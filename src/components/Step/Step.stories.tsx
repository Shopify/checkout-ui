import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {Button} from '../Button';
import {themeWithKnobs} from '../../storybook-utilities';

import {
  Step,
  StepContent,
  StepActions,
  StepSection,
  StepSectionHeader,
  StepSectionShowcase,
  StepPrimaryAction,
  StepSecondaryAction,
  StepSectionContent,
} from './Step';

const meta = {
  component: Step,
  title: 'checkout-web-ui/Step',
  decorators: [withKnobs, themeWithKnobs('actions')],
};

export default meta;

const stepContent = <p>Content</p>;
const stepSectionContent = <p>Section content</p>;
const stepSectionShowcase = <p>Showcased content</p>;

export const noActions = () => (
  <Step>
    <StepContent>
      <p>Content</p>
    </StepContent>
  </Step>
);

export const withSections = () => (
  <Step>
    <StepContent>
      <StepSection title="Contact information">
        <StepSectionHeader
          title="Contact information"
          description="This is a description"
        />
        <StepSectionContent>{stepSectionContent}</StepSectionContent>
      </StepSection>
      <StepSection title="Shipping information">
        <StepSectionHeader
          title="Shipping information"
          description="This is a description"
        />
        <StepSectionContent>{stepSectionContent}</StepSectionContent>
      </StepSection>
      <StepSection>
        <StepSectionContent>
          <p>This is Section content without a Title</p>
        </StepSectionContent>
      </StepSection>
    </StepContent>
  </Step>
);

export const withSectionsAndShowcase = () => (
  <Step>
    <StepContent>
      <StepSection title="Contact information">
        <StepSectionShowcase>{stepSectionShowcase}</StepSectionShowcase>
        <StepSectionHeader
          title="Contact information"
          description="This is a description"
        />
        <StepSectionShowcase>{stepSectionShowcase}</StepSectionShowcase>
        <StepSectionContent>{stepSectionContent}</StepSectionContent>
        <StepSectionShowcase>{stepSectionShowcase}</StepSectionShowcase>
      </StepSection>
    </StepContent>
  </Step>
);

export const withGroupedSections = () => (
  <Step>
    <StepContent grouped>
      <StepSection title="Contact information">
        <StepSectionHeader
          title="Contact information"
          description="This is a description"
        />
        <StepSectionContent>{stepSectionContent}</StepSectionContent>
      </StepSection>
      <StepSection title="Shipping information">
        <StepSectionHeader
          title="Shipping information"
          description="This is a description"
        />
        <StepSectionContent>{stepSectionContent}</StepSectionContent>
      </StepSection>
      <StepSection>
        <StepSectionContent>
          <p>This is Section content without a Title</p>
        </StepSectionContent>
      </StepSection>
    </StepContent>
  </Step>
);

export const withGroupedSectionsAndShowcase = () => (
  <Step>
    <StepContent grouped>
      <StepSection title="Contact information">
        <StepSectionShowcase>{stepSectionShowcase}</StepSectionShowcase>
        <StepSectionHeader
          title="Contact information"
          description="This is a description"
        />
        <StepSectionContent>{stepSectionContent}</StepSectionContent>
        <StepSectionShowcase>{stepSectionShowcase}</StepSectionShowcase>
        <StepSectionShowcase>{stepSectionShowcase}</StepSectionShowcase>
      </StepSection>
    </StepContent>
  </Step>
);

export const primaryAction = () => (
  <Step>
    <StepContent>{stepSectionContent}</StepContent>
    <StepActions>
      <StepPrimaryAction>
        <Button fill to="/shipping">
          Continue to shipping
        </Button>
      </StepPrimaryAction>
    </StepActions>
  </Step>
);

export const primaryAndSecondaryActions = () => (
  <Step>
    <StepContent>{stepContent}</StepContent>
    <StepActions>
      <StepPrimaryAction>
        <Button fill to="/shipping">
          Continue to shipping
        </Button>
      </StepPrimaryAction>
      <StepSecondaryAction>
        <Button to="/cart" plain fill>
          Return to cart
        </Button>
      </StepSecondaryAction>
    </StepActions>
  </Step>
);
