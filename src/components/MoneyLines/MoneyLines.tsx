import React, {PropsWithChildren} from 'react';

import {MaybeVisuallyHidden} from '../VisuallyHidden';
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

  return (
    <>
      <MaybeVisuallyHidden condition={titleHidden}>
        <Heading id={headingId}>{title}</Heading>
      </MaybeVisuallyHidden>

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
