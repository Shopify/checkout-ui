import React, {ReactNode} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {utilityDefaultBorderColor} from '../../utilities/legacy';
import {useThemeConfiguration} from '../Theme';
import {HeadingGroup} from '../HeadingGroup';
import {
  Link,
  VisuallyHidden,
  HiddenForAccessibility,
  Heading,
  Text,
  TextBlock,
} from '..';

import styles from './ReviewItem.css';

export interface Props {
  children?: ReactNode;
  label: string;
  to?: string;
  linkLabel?: string;
  linkAriaLabel?: string;
}

const createId = createIdCreator('ReviewBlock');

export function ReviewItem({
  children,
  label,
  to,
  linkLabel,
  linkAriaLabel,
}: Props) {
  const {
    reviewBlock: {gap = 'none'},
  } = useThemeConfiguration();

  const className = classNames(
    styles.ReviewItem,
    gap !== 'none' && styles.isContainer,
    utilityDefaultBorderColor,
  );

  const linkContent = linkAriaLabel ? (
    <HiddenForAccessibility>{linkLabel}</HiddenForAccessibility>
  ) : (
    linkLabel
  );

  return (
    <div role="row" className={className} key={label}>
      <div className={styles.Wrapper}>
        <div role="rowheader" className={styles.Label}>
          <Text subdued>{label}</Text>
        </div>
        <div role="cell" className={styles.Content}>
          {children}
        </div>
      </div>
      {to && (
        <div role="cell">
          <Link to={to}>
            <Text size="small">{linkContent}</Text>
            {linkAriaLabel && <VisuallyHidden>{linkAriaLabel}</VisuallyHidden>}
          </Link>
        </div>
      )}
    </div>
  );
}

export function ReviewBlock({
  children,
  title,
  titleHidden,
}: {
  children?: ReactNode;
  title?: string;
  titleHidden?: boolean;
}) {
  const id = useId(undefined, createId);
  const {
    reviewBlock: {background = 'transparent', gap = 'none'},
  } = useThemeConfiguration();

  const className = classNames(
    styles.ReviewBlock,
    background && styles[variationName('ReviewBlock-background', background)],
    gap === 'none' && styles.isContainer,
    utilityDefaultBorderColor,
  );

  return (
    <>
      {titleHidden ? (
        <VisuallyHidden>
          <TextBlock id={id}>{title}</TextBlock>
        </VisuallyHidden>
      ) : (
        <Heading id={id}>{title}</Heading>
      )}
      <HeadingGroup>
        <div aria-labelledby={id} role="table" className={className}>
          {children}
        </div>
      </HeadingGroup>
    </>
  );
}
