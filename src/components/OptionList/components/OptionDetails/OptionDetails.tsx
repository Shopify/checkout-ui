import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {useOptionList} from '../../hooks';
import {Collapsible} from '../../../Collapsible';
import styles from '../../OptionList.css';
import {useThemeConfiguration} from '../../../Theme';

export interface Props {
  controlledBy: string;
  children?: React.ReactNode;
}

export function OptionDetails({controlledBy, children}: Props) {
  const {selectedItems, id: optionListId} = useOptionList();
  const {
    optionList: {detailsBackground},
  } = useThemeConfiguration();

  const isSelected = selectedItems.includes(controlledBy);

  if (!children) {
    return null;
  }

  return (
    <Collapsible
      open={isSelected}
      id={`${optionListId}-${controlledBy}-collapsible`}
    >
      <div
        className={classNames(
          styles.Details,
          detailsBackground &&
            styles[variationName('Details-background', detailsBackground)],
        )}
      >
        {children}
      </div>
    </Collapsible>
  );
}
