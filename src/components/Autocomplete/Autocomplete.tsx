import React, {
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {classNames} from '@shopify/css-utilities';

import {BlockStack} from '../BlockStack';
import {Field} from '../TextField';
import {Labelled} from '../Labelled';
import {useThemeConfiguration} from '../Theme';
import {Popper} from '../Popper';
import {Icon} from '../Icon';
import {InlineError} from '../InlineError';
import {isEmptyString} from '../../utilities/strings';
import {isFocused} from '../../utilities/focus';

import styles from './Autocomplete.css';

export interface Props {
  error?: string;
  id: string;
  label: string;
  name: string;
  onChange?(option: any): void;
  options: any[];
  onSelectOption?(option: any): void;
  value: string;
  ariaLabel: string;
  title: string;
  children?: ReactNode;
}

export function Autocomplete({
  error,
  id,
  label,
  name,
  onChange,
  options,
  onSelectOption,
  value,
  ariaLabel,
  title,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const fieldRef = useRef<HTMLInputElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const {
    textFields: {labelPosition, background = 'surfaceTertiary'},
  } = useThemeConfiguration();

  const errorMarkup = error && (
    <InlineError controlID={id}>{error}</InlineError>
  );

  const handleOpen = () => {
    if (open) {
      return;
    }

    // Prevents opening the autocomplete when the address field is filled
    // via browser autofill.
    if (fieldRef.current == null || !isFocused(fieldRef.current)) return;

    setOpen(true);
  };

  const handleClose = useCallback(() => {
    if (!open) {
      return;
    }

    setOpen(false);
  }, [open]);

  const handleChange = (newValue: string) => {
    if (newValue === '') {
      handleClose();
    } else {
      handleOpen();
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleOptionMouseOver = (index: number) => {
    setSelected(index);
  };

  const handleOptionMouseDown = (index: number) => {
    handleClose();

    if (onSelectOption) {
      onSelectOption(options[index]);
    }
  };

  const changeSelectedOption = (diff: number) => {
    if (!open) {
      return;
    }

    setSelected((selected) => {
      if (selected + diff >= options.length) {
        return 0;
      } else if (selected + diff < 0) {
        return options.length - 1;
      }

      return selected + diff;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        // Prevent cursor move
        event.preventDefault();
        changeSelectedOption(1);
        handleOpen();
        break;
      case 'ArrowUp':
        // Prevent cursor move
        event.preventDefault();
        changeSelectedOption(-1);
        handleOpen();
        break;
      case 'Enter':
        // Prevent form validation
        event.preventDefault();
        handleClose();
        if (onSelectOption) {
          onSelectOption(options[selected]);
        }
        break;
      case 'Escape':
        if (open) {
          handleClose();
        }
        break;
      case 'Tab':
        if (event.shiftKey) {
          handleClose();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
          event.preventDefault();
        }

        break;
    }
  };

  const autocompleteOptions = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AutocompleteOptions) {
      return React.cloneElement(
        child,
        {id: `${id}-options`},
        React.Children.toArray(child.props.children).map((child, index) => {
          if (
            typeof child === 'object' &&
            'type' in child &&
            child.type === AutocompleteOption
          ) {
            return React.cloneElement(child, {
              id: `${id}-option-${index}`,
              isSelected: selected === index,
              onMouseDown: () => {
                handleOptionMouseDown(index);
                fieldRef.current?.focus();
              },
              onMouseOver: () => handleOptionMouseOver(index),
            });
          }
        }),
      );
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !fieldRef.current?.contains(event.target) &&
        !popperRef.current?.contains(event.target)
      ) {
        handleClose();
      } else if (event.target !== fieldRef.current) {
        fieldRef.current?.focus();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClose]);

  const autocompleteFooter = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AutocompleteFooter) {
      return child;
    }
  });

  const fieldFocused = Boolean(fieldRef.current && isFocused(fieldRef.current));
  const closeButtonFocused = Boolean(
    closeButtonRef.current && isFocused(closeButtonRef.current),
  );
  const renderPopper =
    open && options.length > 0 && (fieldFocused || closeButtonFocused);

  return (
    <>
      <BlockStack spacing="tight">
        <Labelled
          label={label}
          htmlFor={id}
          isEmpty={isEmptyString(value)}
          position={labelPosition}
          background={background}
        >
          <Field
            ariaActiveDescendant={open ? `${id}-option-${selected}` : undefined}
            ariaAutocomplete="list"
            ariaControls={`${id}-options`}
            ariaExpanded={renderPopper}
            autocomplete={!open}
            error={error}
            id={id}
            label={label}
            name={name}
            onInput={handleChange}
            onFocus={handleOpen}
            onKeyDown={handleKeyDown}
            ref={fieldRef}
            role="combobox"
            value={value}
          />
        </Labelled>
        {errorMarkup}
      </BlockStack>
      {renderPopper && (
        <Popper activator={fieldRef.current} sameWidth placement="bottom">
          <div className={styles.Autocomplete} ref={popperRef}>
            <div className={styles.Header}>
              <h3 className={styles.Title}>{title}</h3>
              <button
                type="button"
                className={styles.Close}
                onClick={() => {
                  handleClose();
                  fieldRef.current?.focus();
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Tab') {
                    if (event.shiftKey) {
                      fieldRef.current?.focus();
                      event.preventDefault();
                    } else {
                      handleClose();
                      fieldRef.current?.focus();
                    }
                  }
                }}
                ref={closeButtonRef}
              >
                <Icon
                  size="default"
                  source="close"
                  color="subdued"
                  accessibilityLabel={ariaLabel}
                />
              </button>
            </div>
            {autocompleteOptions}
            {autocompleteFooter}
          </div>
        </Popper>
      )}
    </>
  );
}

export interface AutocompleteOptionsProps {
  children?: ReactNode;
  id?: string;
}

export function AutocompleteOptions({children, id}: AutocompleteOptionsProps) {
  return (
    <ul
      className={styles.Options}
      id={id}
      onMouseDown={(event) => {
        // Prevent blur
        event.preventDefault();
      }}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="listbox"
    >
      {children}
    </ul>
  );
}

export interface AutocompleteOptionProps {
  children?: ReactNode;
  id?: string;
  isSelected?: any;
  onMouseDown?: any;
  onMouseOver?: any;
}

export function AutocompleteOption({
  children,
  id,
  isSelected,
  onMouseDown,
  onMouseOver,
}: AutocompleteOptionProps) {
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <li
      aria-selected={isSelected}
      className={classNames(styles.Option, {
        [styles.selected]: isSelected,
      })}
      id={id}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="option"
    >
      {children}
    </li>
  );
}

export interface AutocompleteFooterProps {
  children?: ReactNode;
}

export function AutocompleteFooter({children}: AutocompleteFooterProps) {
  return <div className={styles.Footer}>{children}</div>;
}
