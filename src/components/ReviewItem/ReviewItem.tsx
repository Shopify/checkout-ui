import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {createIdCreator, useId} from '../../utilities/id';
import {utilityDefaultBorderColor} from '../../utilities/legacy';
import {useThemeConfiguration} from '../Theme';
import {HeadingGroup} from '../HeadingGroup';
import {Link, View, Heading, Text} from '..';

import styles from './ReviewItem.css';

export interface Props {
  label: string;
  to?: string;
  linkLabel?: string;
  linkAccessibilityLabel?: string;
  noWrap?: boolean;
}

const createId = createIdCreator('ReviewBlock');

export function ReviewItem({
  children,
  label,
  to,
  linkLabel,
  linkAccessibilityLabel,
  noWrap,
}: PropsWithChildren<Props>) {
  const {
    reviewBlock: {spacing = 'none', divider},
  } = useThemeConfiguration();

  const className = classNames(
    styles.ReviewItem,
    spacing !== 'none' && styles.isContainer,
    utilityDefaultBorderColor,
    divider === 'toContainerEdge' && styles.dividerToEdge,
  );

  return (
    <div role="row" className={className} key={label}>
      <div
        className={classNames(
          styles.Wrapper,
          noWrap && styles['Wrapper-noWrap'],
        )}
      >
        <div role="rowheader" className={styles.Label}>
          <Text subdued>{label}</Text>
        </div>
        <div role="cell" className={styles.Content}>
          {children}
        </div>
      </div>
      {to ? (
        <div role="cell">
          <Link to={to} accessibilityLabel={linkAccessibilityLabel}>
            <Text size="small">{linkLabel}</Text>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export interface ReviewBlockProps {
  title?: string;
  titleHidden?: boolean;
}

export function ReviewBlock({
  children,
  title,
  titleHidden,
}: PropsWithChildren<ReviewBlockProps>) {
  const id = useId(undefined, createId);
  const {
    reviewBlock: {background = 'transparent', spacing = 'none'},
  } = useThemeConfiguration();

  const className = classNames(
    styles.ReviewBlock,
    background && styles[variationName('ReviewBlock-background', background)],
    spacing === 'none' && styles.isContainer,
    utilityDefaultBorderColor,
  );

  const titleMarkup = <Heading id={id}>{title}</Heading>;

  return (
    <>
      {titleHidden ? (
        <View visibility="hidden">{titleMarkup}</View>
      ) : (
        titleMarkup
      )}

      <HeadingGroup>
        <div aria-labelledby={id} role="table" className={className}>
          {children}
        </div>
      </HeadingGroup>
    </>
  );
}
