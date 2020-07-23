import React from 'react';

import {useOptionList} from '../../hooks';
import styles from '../../OptionList.css';

export interface Props {
  controlledBy: string;
  children?: React.ReactNode;
}

export function OptionDetails({controlledBy, children}: Props) {
  const {selectedItems} = useOptionList();

  if (!children || !selectedItems.includes(controlledBy)) {
    return null;
  }

  return <div className={styles.Details}>{children}</div>;
}
