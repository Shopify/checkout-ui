import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {Bookend} from '../../../Bookend';
import {VisuallyHidden} from '../../../VisuallyHidden';
import {Text} from '../../../Text';
import {RadioControl} from '../../../Radio';
import {CheckboxControl} from '../../../Checkbox';
import {useThemeConfiguration} from '../../../Theme';
import {useOptionList} from '../../hooks';
import styles from '../../OptionList.css';

export interface Props {
  id: string;
  label: string;
  details?: React.ReactNode;
  children?: React.ReactNode;
}

export function Option({id, label, details, children}: Props) {
  const {
    id: optionListId,
    selectedItems,
    allowMultiple,
    onChange,
  } = useOptionList();
  const Control = allowMultiple ? CheckboxControl : RadioControl;
  const checked = selectedItems.includes(id);
  const {
    optionList: {gap = 'none', typographyStyle},
  } = useThemeConfiguration();

  const className = classNames(
    styles.Option,
    gap !== 'none' && styles.isContainer,
  );

  function getNewSelections() {
    if (!allowMultiple) {
      return [id];
    }

    if (checked) {
      return selectedItems.filter((selectedItem) => selectedItem !== id);
    }

    return [...selectedItems, id];
  }

  return (
    <div className={className}>
      <label htmlFor={`${optionListId}-${id}`} className={styles.OptionLabel}>
        <Bookend leading>
          <Control
            id={`${optionListId}-${id}`}
            name={`${optionListId}`}
            checked={checked}
            onChange={() => onChange(getNewSelections())}
          />

          {label && children ? (
            <>
              <VisuallyHidden>{label}</VisuallyHidden>
              <div aria-hidden="true">
                <Bookend trailing>{children}</Bookend>
              </div>
            </>
          ) : (
            <Text emphasized={typographyStyle == null} style={typographyStyle}>
              {label}
            </Text>
          )}
        </Bookend>
      </label>
      {details}
    </div>
  );
}

export interface OptionPrimaryContentProps {
  children?: React.ReactNode;
}

export function OptionPrimaryContent({children}: OptionPrimaryContentProps) {
  return <div className={styles.PrimaryContent}>{children}</div>;
}

export interface OptionSecondaryContentProps {
  children?: React.ReactNode;
}

export function OptionSecondaryContent({
  children,
}: OptionSecondaryContentProps) {
  return <div className={styles.SecondaryContent}>{children}</div>;
}
