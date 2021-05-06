import React, {useState} from 'react';

import {TextBlock} from '../TextBlock';

import {ToggleButton} from './ToggleButton';
import {ToggleButtonGroup} from './ToggleButtonGroup';

const meta = {
  component: ToggleButton,
  title: 'checkout-web-ui/ToggleButton',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

function SelectionToggle() {
  const [selected, setSelected] = useState('');

  return (
    <ToggleButtonGroup
      id="id"
      selectedItem={selected}
      onChange={(id) => {
        setSelected(id);
      }}
    >
      <ToggleButton id="first">
        <TextBlock>Hello</TextBlock>
      </ToggleButton>
      <ToggleButton id="second">
        <TextBlock>Hello</TextBlock>
      </ToggleButton>
      <ToggleButton id="third">
        <TextBlock>Hello</TextBlock>
      </ToggleButton>
      <ToggleButton id="fourth">
        <TextBlock>
          Hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
          error repellendus iusto ad numquam illum eum excepturi officia impedit
          rem sequi nesciunt voluptatibus inventore libero! Ex delectus
          voluptate sequi atque?
        </TextBlock>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export const selectionToggle = () => <SelectionToggle />;
