import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Heading} from '../Heading';
import {HeadingGroup} from '../HeadingGroup';
import {TextBlock} from '../TextBlock';
import {TextContainer} from '../TextContainer';
import {useThemeConfiguration} from '../Theme';

import styles from './Step.css';

export interface Props {
  children?: ReactNode;
}

export function Step({children}: Props) {
  return <div className={styles.Step}>{children}</div>;
}

export interface StepContentProps {
  grouped?: boolean;
  children?: ReactNode;
}

export function StepContent({grouped, children}: StepContentProps) {
  const className = classNames(styles.Content, {[styles.isGrouped]: grouped});
  return <div className={className}>{children}</div>;
}

export interface StepSectionProps {
  title?: string;
  children?: ReactNode;
}

export function StepSection({children, title}: StepSectionProps) {
  return (
    <section aria-label={title} className={styles.Section}>
      {children}
    </section>
  );
}

export interface StepSectionHeaderProps {
  title: string;
  primary?: boolean;
  description?: string;
}

export const STEP_SECTION_PRIMARY_HEADER_ID = 'primary-header';

export function StepSectionHeader({
  title,
  primary,
  description,
}: StepSectionHeaderProps) {
  return (
    <TextContainer spacing="tight">
      {title ? (
        <Heading id={primary ? STEP_SECTION_PRIMARY_HEADER_ID : undefined}>
          {title}
        </Heading>
      ) : null}
      {description ? <TextBlock>{description}</TextBlock> : null}
    </TextContainer>
  );
}

export interface StepSectionContentProps {
  children?: ReactNode;
}

export function StepSectionContent({children}: StepSectionContentProps) {
  return <HeadingGroup>{children}</HeadingGroup>;
}

export interface StepSectionShowcaseProps {
  children?: ReactNode;
}

export function StepSectionShowcase({children}: StepSectionShowcaseProps) {
  return <div className={styles.Showcase}>{children}</div>;
}

export interface StepActionsProps {
  children?: ReactNode;
}

export function StepActions({children}: StepActionsProps) {
  const {
    actions: {display = 'inline'},
  } = useThemeConfiguration();

  const className = classNames(
    styles.Actions,
    styles[variationName('Actions-display', display)],
  );

  return <div className={className}>{children}</div>;
}

export interface StepPrimaryActionProps {
  children?: ReactNode;
}

export function StepPrimaryAction({children}: StepPrimaryActionProps) {
  return <div className={styles.PrimaryAction}>{children}</div>;
}

export interface StepSecondaryActionProps {
  children?: ReactNode;
}

export function StepSecondaryAction({children}: StepSecondaryActionProps) {
  return <div className={styles.SecondaryAction}>{children}</div>;
}
