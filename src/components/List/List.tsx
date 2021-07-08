import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {ListItemProps, ListProps} from '@shopify/checkout-ui-extensions';

import styles from './List.css';

export function List({
  spacing = 'base',
  marker = 'bullet',
  children,
}: PropsWithChildren<ListProps>) {
  const className = classNames(
    styles.List,
    spacing && styles[variationName('spacing', spacing)],
    marker && styles[variationName('marker', marker)],
  );

  const isOrderedList = marker === 'number';

  /*
  VoiceOver and Safari (Webkit) (macOS and iOS) remove list element
  semantics when list-style: none is used.
  https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
  */
  const role = marker === 'none' ? 'list' : undefined;

  const Element = isOrderedList ? 'ol' : 'ul';

  return (
    /* Needed to properly reset margins on ul / ol elements and not interfere
     * with layout components that use `*` selector to create gaps between children. */
    /* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */
    <div>
      <Element className={className} role={role}>
        {children}
      </Element>
    </div>
  );
}

export function ListItem({children}: PropsWithChildren<ListItemProps>) {
  return <li className={styles.ListItem}>{children}</li>;
}
