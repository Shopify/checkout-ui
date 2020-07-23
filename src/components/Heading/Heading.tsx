import React, {PropsWithChildren, ReactHTML} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {useAutoHeadingLevel} from '@quilted/react-auto-headings';
import {HeadingProps} from '@shopify/argo-checkout';

import {useThemeConfiguration} from '../Theme';
import {utilityDefaultTextColorEmphasized} from '../../utilities/legacy';
import typographyStyles from '../../utilities/typography-styles.css';

import styles from './Heading.css';

export function Heading({
  id,
  children,
  role,
  level: explicitLevel,
}: PropsWithChildren<HeadingProps>) {
  const {headingLevel1, headingLevel2, headingLevel3} = useThemeConfiguration();

  const semanticLevel = useAutoHeadingLevel();
  const visualLevel = explicitLevel ?? semanticLevel ?? 0;

  const Element: keyof ReactHTML =
    role === 'presentation' || semanticLevel == null
      ? 'p'
      : (`h${semanticLevel}` as any);

  const className = classNames(
    styles.Heading,
    visualLevel && styles[variationName('h', visualLevel)],
    visualLevel >= 2 && utilityDefaultTextColorEmphasized,
    visualLevel === 1 &&
      headingLevel1.typographyStyle &&
      typographyStyles[headingLevel1.typographyStyle],
    visualLevel === 2 &&
      headingLevel2.typographyStyle &&
      typographyStyles[headingLevel2.typographyStyle],
    visualLevel === 3 &&
      headingLevel3.typographyStyle &&
      typographyStyles[headingLevel3.typographyStyle],
  );

  return (
    <Element id={id} tabIndex={id ? -1 : undefined} className={className}>
      {children}
    </Element>
  );
}
