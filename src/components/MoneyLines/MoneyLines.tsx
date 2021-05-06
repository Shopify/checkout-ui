import React, {PropsWithChildren} from 'react';

import {View} from '../View';
import {Heading} from '../Heading';
import {createIdCreator} from '../../utilities/id';

import styles from './MoneyLines.css';

export interface Props {
  title: string;
  titleHidden?: boolean;
}

const createId = createIdCreator('MoneyLine-Heading');

export function MoneyLines({
  children,
  title,
  titleHidden = true,
}: PropsWithChildren<Props>) {
  const headingId = createId();

  const titleMarkup = <Heading id={headingId}>{title}</Heading>;

  return (
    <>
      {titleHidden ? (
        <View visibility="hidden">{titleMarkup}</View>
      ) : (
        titleMarkup
      )}

      <div
        className={styles.MoneyLines}
        role="table"
        aria-labelledby={headingId}
      >
        {children}
      </div>
    </>
  );
}
