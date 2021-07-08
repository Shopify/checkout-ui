import React, {ReactNode, useState} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {IconProps} from '@shopify/checkout-ui-extensions';

import {Collapsible} from '../Collapsible';
import {InlineStack} from '../InlineStack';
import {HeadingGroup} from '../HeadingGroup';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {
  colorSurfacePrimary,
  colorSurfaceSecondary,
  colorSurfaceTertiary,
  utilityDefaultBorderColor,
} from '../../utilities/legacy';

import styles from './Shell.css';

export type ShellHeaderPosition = 'start' | 'inline' | 'inlineSecondary';

export type ShellSubheaderPosition = 'start' | 'inline';
export type ShellFooterPosition = 'inline' | 'end';

export interface ShellProps {
  children?: ReactNode;
  headerPosition?: ShellHeaderPosition;
  subheaderPosition?: ShellSubheaderPosition;
  footerPosition?: ShellFooterPosition;
  subheaderHidden?: boolean;
}

export function Shell({
  children,
  headerPosition,
  subheaderPosition,
  footerPosition,
  subheaderHidden,
}: ShellProps) {
  return (
    <div
      className={classNames(
        styles.Shell,
        headerPosition &&
          styles[variationName('headerPosition', headerPosition)],
        subheaderPosition &&
          styles[variationName('subheaderPosition', subheaderPosition)],
        footerPosition &&
          styles[variationName('footerPosition', footerPosition)],
        subheaderHidden && styles.subheaderHidden,
      )}
    >
      {children}
    </div>
  );
}

export type ShellHeaderAlignment = 'start' | 'center' | 'end';
export type ShellHeaderBlockPadding = 'balanced' | 'weightedStart';

export interface ShellHeaderProps {
  children?: ReactNode;
  alignment: ShellHeaderAlignment;
  blockPadding: ShellHeaderBlockPadding;
  background?: string;
}

export type ShellSubheaderAlignment = 'start' | 'center' | 'end';

export interface ShellSubheaderProps {
  children?: ReactNode;
  alignment: ShellSubheaderAlignment;
}

export function ShellSubheader({children, alignment}: ShellSubheaderProps) {
  return (
    <div
      className={classNames(
        styles.Subheader,
        styles[variationName('Subheader-alignment', alignment)],
      )}
    >
      <div className={styles.SubheaderInner}>{children}</div>
    </div>
  );
}

export type ShellActionsDisplay = 'inline' | 'block';

export type ShellSectionBackground =
  | 'surfacePrimary'
  | 'surfaceSecondary'
  | 'surfaceTertiary'
  | 'transparent';
export type ShellSectionInlineSize = 'toContainerEdge' | 'contentSize';
export type ShellSectionBlockSize = 'toContainerEdge' | 'contentSize';

export interface ShellSectionProps {
  children?: ReactNode;
  secondary?: boolean;
  bordered?: boolean;
  background?: ShellSectionBackground;
  inlineSize?: ShellSectionInlineSize;
  blockSize?: ShellSectionBlockSize;
  backgroundImage?: string;
}

export function ShellSection({
  bordered,
  background,
  inlineSize,
  blockSize,
  children,
  secondary,
  backgroundImage,
}: ShellSectionProps) {
  const Element = secondary ? 'aside' : 'div';
  const style = backgroundImage
    ? {
        backgroundImage: `url(${JSON.stringify(backgroundImage)})`,
      }
    : undefined;

  return (
    <HeadingGroup>
      <Element
        className={classNames(
          styles.Section,
          bordered && styles['Section-bordered'],
          background && backgroundToLegacyClassName(background),
          background && styles[variationName('Section-background', background)],
          inlineSize && styles[variationName('Section-inlineSize', inlineSize)],
          blockSize && styles[variationName('Section-blockSize', blockSize)],
          secondary && styles['Section-secondary'],
        )}
        style={inlineSize === 'toContainerEdge' ? style : undefined}
      >
        <div
          className={styles.SectionInner}
          style={inlineSize === 'contentSize' ? style : undefined}
        >
          {children}
        </div>
      </Element>
    </HeadingGroup>
  );
}

export interface ShellSectionContentProps {
  children?: ReactNode;
}

export function ShellSectionContent({children}: ShellSectionContentProps) {
  return (
    <div className={styles.SectionContent}>
      <div className={styles.SectionContentInner}>{children}</div>
    </div>
  );
}

export interface ShellFooterProps {
  children?: ReactNode;
}

export function ShellFooter({children}: ShellFooterProps) {
  return (
    <HeadingGroup>
      <footer role="contentinfo" className={styles.Footer}>
        <div className={styles.FooterInner}>{children}</div>
      </footer>
    </HeadingGroup>
  );
}

export interface ShellDisclosureProps {
  children?: ReactNode;
  detail?: ReactNode;
  icon: NonNullable<IconProps['source']>;
  labels: {open: string; closed: string};
  bordered?: boolean;
  background: ShellSectionBackground;
}

// TODO: a11y
export function ShellDisclosure({
  children,
  detail,
  labels,
  icon,
  bordered,
  background,
}: ShellDisclosureProps) {
  const [open, setOpen] = useState(false);

  const {text, icon: disclosureIcon} = open
    ? {
        text: labels.closed,
        icon: <Icon source="chevronUp" size="small" appearance="interactive" />,
      }
    : {
        text: labels.open,
        icon: (
          <Icon source="chevronDown" size="small" appearance="interactive" />
        ),
      };

  const contentId = 'disclosure_content';

  return (
    <aside
      className={classNames(
        styles.Disclosure,
        bordered && styles['Disclosure-bordered'],
        background && backgroundToLegacyClassName(background),
        background &&
          styles[variationName('Disclosure-background', background)],
      )}
    >
      <button
        type="button"
        className={classNames(
          styles.DisclosureButton,
          utilityDefaultBorderColor,
        )}
        onClick={() => setOpen((open) => !open)}
        aria-pressed={open}
        aria-controls={contentId}
        aria-expanded={open}
      >
        <span className={styles.DisclosureLayout}>
          <InlineStack spacing="tight" alignment="center">
            <Icon source={icon} size="large" appearance="interactive" />
            <Text>{text}</Text>
            {disclosureIcon}
          </InlineStack>
          {detail}
        </span>
      </button>
      <Collapsible open={open} id={contentId}>
        <div
          className={classNames(
            styles.DisclosureContent,
            utilityDefaultBorderColor,
          )}
        >
          <div className={styles.DisclosureContentInner}>{children}</div>
        </div>
      </Collapsible>
    </aside>
  );
}

function backgroundToLegacyClassName(background: ShellSectionBackground) {
  switch (background) {
    case 'surfacePrimary':
      return colorSurfacePrimary;
    case 'surfaceSecondary':
      return colorSurfaceSecondary;
    case 'surfaceTertiary':
      return colorSurfaceTertiary;
  }
}
