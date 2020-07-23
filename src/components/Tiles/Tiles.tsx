import React, {CSSProperties, PropsWithChildren} from 'react';
import {variationName, classNames} from '@shopify/css-utilities';
import {TilesProps} from '@shopify/argo-checkout';

import {View} from '../View';
import {rem} from '../../utilities/units';

import styles from './Tiles.css';

interface ExtendedCSSProperties extends CSSProperties {
  '--tile-width'?: string;
  '--tiles-breakpoint'?: string;
}

export function Tiles({
  children,
  maxPerLine,
  breakAt,
  alignment,
  spacing,
}: PropsWithChildren<TilesProps>) {
  const className = classNames(
    styles.Tiles,
    spacing && styles[variationName('spacing', spacing)],
    alignment && styles[variationName('alignment', alignment)],
    maxPerLine ? undefined : styles.doesNotWrap,
    breakAt ? undefined : styles.doesNotBreak,
  );

  const tileWidth = maxPerLine ? `${100 / maxPerLine}%` : undefined;
  const tileBreakPoint = breakAt ? rem(breakAt) : undefined;

  const style: ExtendedCSSProperties = {
    '--tile-width': tileWidth /* stylelint-disable-line value-keyword-case */,
    '--tiles-breakpoint': tileBreakPoint /* stylelint-disable-line value-keyword-case */,
  };

  return (
    /* View is to avoid problems with negative margins when nested inside other layouts */
    <View>
      <div className={className} style={style}>
        {children}
      </div>
    </View>
  );
}
