import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {Bookend} from '../../../Bookend';
import {Text} from '../../../Text';
import {Heading} from '../../../Heading';
import {RadioControl} from '../../../RadioControl';
import {CheckboxControl} from '../../../Checkbox';
import {useThemeConfiguration} from '../../../Theme';
import {useOptionList} from '../../hooks';
import styles from '../../OptionList.css';

export interface Props {
  id: string;
  label: string;
  accessibilityLabel?: string;
  details?: React.ReactNode;
  children?: React.ReactNode;
}

export function Option({
  id,
  label,
  accessibilityLabel,
  details,
  children,
}: Props) {
  const {
    id: optionListId,
    selectedItems,
    allowMultiple,
    controlHidden,
    onChange,
  } = useOptionList();
  const Control = allowMultiple ? CheckboxControl : RadioControl;
  const checked = selectedItems.includes(id);
  const {
    optionList: {spacing = 'none', typographyStyle},
  } = useThemeConfiguration();

  const className = classNames(
    styles.Option,
    spacing !== 'none' && styles.isContainer,
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

  return controlHidden ? (
    <div className={className}>
      <div className={styles.OptionLabel}>
        {children ? (
          <Bookend trailing>{children}</Bookend>
        ) : (
          <Heading>
            <Text emphasized={typographyStyle == null} style={typographyStyle}>
              {label}
            </Text>
          </Heading>
        )}
      </div>
      {details}
    </div>
  ) : (
    <div className={className}>
      <label
        htmlFor={`${optionListId}-${id}`}
        className={classNames(
          styles.OptionLabel,
          styles['OptionLabel-cursorPointer'],
        )}
        aria-label={accessibilityLabel}
        {...(details && {
          'aria-controls': `${optionListId}-${id}-collapsible`,
          'aria-expanded': checked,
        })}
      >
        <Bookend leading>
          <Control
            id={`${optionListId}-${id}`}
            name={`${optionListId}`}
            checked={checked}
            onChange={() => {
              onChange(getNewSelections());
            }}
          />
          {children ? (
            <Bookend trailing>{children}</Bookend>
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
