import React from 'react';

import {mountWithContext} from '../../test-utilities';
import {TextField} from '../TextField';
import {Select} from '../Select';

import {FormLayout, FormLayoutGroup} from './FormLayout';

describe('<FormLayout />', () => {
  it('renders its children', () => {
    const selectCountryProps = {
      id: 'select',
      name: 'country',
      label: 'Country',
      options: [
        {
          value: 'CA',
          label: 'Canada',
        },
        {
          value: 'US',
          label: 'United States',
        },
        {
          value: 'UK',
          label: 'United Kingdom',
        },
      ],
    };

    const selectProvinceProps = {
      id: 'select',
      name: 'province',
      label: 'Province',
      options: [
        {
          value: 'QC',
          label: 'Quebec',
        },
        {
          value: 'ON',
          label: 'Ontario',
        },
        {
          value: 'PEI',
          label: 'Prince Edward Island',
        },
      ],
    };

    const formLayout = mountWithContext(
      <FormLayout>
        <FormLayoutGroup>
          <Select {...selectCountryProps} />
          <Select {...selectProvinceProps} />
        </FormLayoutGroup>
        <TextField name="address1" id="address1" label="Address" />
        <TextField
          name="address2"
          id="address2"
          label="Apartment, suite, etc."
        />
      </FormLayout>,
    );
    expect(formLayout).toContainReactComponentTimes(FormLayoutGroup, 1);
    expect(formLayout).toContainReactComponentTimes(TextField, 2);
  });
});
