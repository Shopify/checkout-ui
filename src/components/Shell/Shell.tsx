import React, {ReactNode, useState, useRef} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {InlineStack} from '../InlineStack';
import {HeadingGroup} from '../HeadingGroup';
import {Icon, Props as IconProps} from '../Icon';
import {Text} from '../Text';
import {
  colorSurfacePrimary,
  colorSurfaceSecondary,
  colorSurfaceTertiary,
  utilityDefaultBorderColor,
} from '../../utilities/legacy';
import {useTransition} from '../../utilities/transition';

import styles from './Shell.css';

export type ShellHeaderPosition =
  | 'start'
  | 'fixed'
  | 'inline'
  | 'inlineSecondary';

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

export function ShellHeader({
  children,
  alignment,
  blockPadding,
  background,
}: ShellHeaderProps) {
  const style = background
    ? {
        backgroundImage: `url(${JSON.stringify(background)})`,
      }
    : undefined;

  return (
    <HeadingGroup>
      <header
        role="banner"
        style={style}
        className={classNames(
          styles.Header,
          styles[variationName('Header-alignment', alignment)],
          styles[variationName('Header-blockPadding', blockPadding)],
        )}
      >
        <div className={styles.HeaderInner}>{children}</div>
      </header>
    </HeadingGroup>
  );
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

export interface ShellHeadingProps {
  to?: string;
  logo?: {source: string; maxWidth?: number};
  children: string;
}

export function ShellHeading({to, logo, children}: ShellHeadingProps) {
  const content = logo?.source ? (
    <img
      src={logo.source}
      alt={children}
      // TODO: convert to rems
      style={logo.maxWidth ? {maxWidth: logo.maxWidth} : undefined}
      className={styles.Logo}
    />
  ) : (
    children
  );

  return to ? (
    <a className={styles.Heading} href={to}>
      {content}
    </a>
  ) : (
    <span className={styles.Heading}>{content}</span>
  );
}

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
}

export function ShellSection({
  bordered,
  background,
  inlineSize,
  blockSize,
  children,
  secondary,
}: ShellSectionProps) {
  const Element = secondary ? 'aside' : 'div';

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
      >
        <div className={styles.SectionInner}>{children}</div>
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
  const disclosureRef = useRef<HTMLDivElement | null>(null);

  const transition = useTransition(open, 'slow');

  const transitionStyles = {
    enter: () => ({height: 0}),
    entering: () => ({height: disclosureRef?.current?.clientHeight}),
    entered: () => ({height: 'auto'}),
    exit: () => ({height: disclosureRef?.current?.clientHeight}),
    exiting: () => ({height: 0}),
  };

  const {text, icon: disclosureIcon} = open
    ? {
        text: labels.closed,
        icon: <Icon source="chevronUp" size="small" color="interactive" />,
      }
    : {
        text: labels.open,
        icon: <Icon source="chevronDown" size="small" color="interactive" />,
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
            <Icon source={icon} size="large" color="interactive" />
            <Text>{text}</Text>
            {disclosureIcon}
          </InlineStack>
          {detail}
        </span>
      </button>
      {transition !== 'exited' && (
        <div
          className={classNames(
            styles.DisclosureContent,
            utilityDefaultBorderColor,
          )}
          style={{...transitionStyles[transition]()}}
          id={contentId}
        >
          <div className={styles.DisclosureContentInner} ref={disclosureRef}>
            {children}
          </div>
        </div>
      )}
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
