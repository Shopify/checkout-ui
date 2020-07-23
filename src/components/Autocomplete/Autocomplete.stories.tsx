import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {Text} from '../Text';

import {
  Autocomplete,
  AutocompleteOptions,
  AutocompleteOption,
} from './Autocomplete';

const meta = {
  component: Autocomplete,
  title: 'Autocomplete',
  decorators: [withKnobs, themeWithKnobs('textFields')],
};

export default meta;

function Basic() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const onChange = (value: string) => {
    setValue(value);

    if (value === '') {
      setOptions([]);
      return;
    }

    setOptions(
      [...Array(50).keys()]
        .map((i) => `${i + 1} Saint Urbain Street, Montreal, QC, Canada`)
        .filter((option) => option.startsWith(value))
        .slice(0, 5),
    );
  };

  const onSelectOption = (value: string) => {
    setValue(value);
    setOptions([]);
  };

  return (
    <Autocomplete
      id="address"
      label="Address"
      name="address"
      onChange={onChange}
      onSelectOption={onSelectOption}
      options={options}
      value={value}
      ariaLabel="Close Predictions"
      title="Suggestions"
    >
      <AutocompleteOptions>
        {options &&
          options.map((option) => (
            <AutocompleteOption key={option}>
              <Text emphasized>
                <strong>{value}</strong>
              </Text>
              {option.slice(value.length)}
            </AutocompleteOption>
          ))}
      </AutocompleteOptions>
    </Autocomplete>
  );
}

export const basic = () => <Basic />;
