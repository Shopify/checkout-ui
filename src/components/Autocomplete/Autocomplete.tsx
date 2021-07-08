import React, {
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {
  InternalProps as TextFieldInternalProps,
  TextFieldInternal,
} from '../TextField';
import {useThemeConfiguration} from '../Theme';
import {Popper} from '../Popper';
import {Icon} from '../Icon';
import {isFocused} from '../../utilities/focus';

import styles from './Autocomplete.css';

export interface Props extends TextFieldInternalProps {
  options: any[];
  onSelectOption?(option: any): void;
  ariaLabel: string;
  title: string;
}

export function Autocomplete({
  error,
  id,
  label,
  name,
  onInput,
  onChange,
  options,
  onSelectOption,
  value,
  ariaLabel,
  title,
  children,
  required,
  autocomplete,
  disabled,
  readonly,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const fieldRef = useRef<HTMLInputElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const {
    controls: {background: controlsBackground},
    textFields: {background: textFieldsBackground},
  } = useThemeConfiguration();

  const background =
    textFieldsBackground || controlsBackground || 'surfaceTertiary';

  const handleOpen = () => {
    if (open) {
      return;
    }

    if (options.length === 0) {
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

  const handleInput = (newValue: string) => {
    if (newValue === '') {
      handleClose();
    } else {
      handleOpen();
    }

    onInput?.(newValue);
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
      case 'Down':
        // Prevent cursor move
        event.preventDefault();
        changeSelectedOption(1);
        handleOpen();
        break;
      case 'ArrowUp':
      case 'Up':
        // Prevent cursor move
        event.preventDefault();
        changeSelectedOption(-1);
        handleOpen();
        break;
      case 'Enter':
        if (open) {
          // Prevent form validation
          event.preventDefault();
          handleClose();

          if (onSelectOption) {
            onSelectOption(options[selected]);
          }
        } else {
          onChange?.(event.currentTarget.value);
        }
        break;
      case 'Escape':
      case 'Esc':
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

  useEffect(
    () => {
      if (options.length === 0) {
        // Prevents the loss of focus
        if (open && fieldRef.current && !isFocused(fieldRef.current)) {
          fieldRef.current.focus();
        }
      } else if (!open && fieldRef.current && isFocused(fieldRef.current)) {
        handleOpen();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.length],
  );

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

  const autocompleteClassName = classNames(
    styles.Autocomplete,
    background && styles[variationName('background', background)],
  );

  return (
    <>
      <TextFieldInternal
        label={label}
        ariaActiveDescendant={open ? `${id}-option-${selected}` : undefined}
        ariaAutocomplete="list"
        ariaControls={`${id}-options`}
        ariaExpanded={renderPopper}
        required={required}
        autocomplete={!open && autocomplete}
        error={error}
        id={id}
        name={name}
        onInput={handleInput}
        onChange={onChange}
        onFocus={handleOpen}
        onKeyDown={handleKeyDown}
        ref={fieldRef}
        role="combobox"
        controlledValue={value}
        disabled={disabled}
        readonly={readonly}
      />
      {renderPopper && (
        <Popper
          activator={fieldRef.current}
          sameInlineSize
          minInlineSize={320}
          preventOverflow
          placement="blockEnd"
          offset={7}
        >
          <div className={autocompleteClassName} ref={popperRef}>
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
                  size="base"
                  source="close"
                  appearance="subdued"
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
