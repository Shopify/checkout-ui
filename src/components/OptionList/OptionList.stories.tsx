import React, {useState} from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {themeWithKnobs} from '../../storybook-utilities';
import {TextBlock} from '../TextBlock';
import {TextContainer} from '../TextContainer';

import {
  OptionList,
  Option,
  OptionDetails,
  OptionSecondaryContent,
  OptionPrimaryContent,
} from '.';

const meta = {
  component: OptionList,
  title: 'OptionList',
  decorators: [withKnobs, themeWithKnobs('optionList')],
};

export default meta;

function Basic() {
  const [selected, setSelected] = useState(['item_1']);

  return (
    <OptionList id="basic" selectedItems={selected} onChange={setSelected}>
      <Option
        id="item_1"
        label="Item 1"
        details={
          <OptionDetails controlledBy="item_1">First item</OptionDetails>
        }
      />

      <Option
        id="item_2"
        label="Item 2"
        details={
          <OptionDetails controlledBy="item_2">Second item</OptionDetails>
        }
      />

      <Option id="item_3" label="Item 3" />
    </OptionList>
  );
}

function WithTitle() {
  const [selected, setSelected] = useState(['item_1']);

  return (
    <OptionList
      id="withTitle"
      title="Choose a payment method"
      selectedItems={selected}
      onChange={setSelected}
    >
      <Option
        id="item_1"
        label="Item 1"
        details={
          <OptionDetails controlledBy="item_1">First item</OptionDetails>
        }
      />

      <Option
        id="item_2"
        label="Item 2"
        details={
          <OptionDetails controlledBy="item_2">Second item</OptionDetails>
        }
      />
    </OptionList>
  );
}

function WithHiddenTitle() {
  const [selected, setSelected] = useState(['item_1']);

  return (
    <OptionList
      id="withTitle"
      title="Choose a payment method"
      titleHidden
      selectedItems={selected}
      onChange={setSelected}
    >
      <Option
        id="item_1"
        label="Item 1"
        details={
          <OptionDetails controlledBy="item_1">First item</OptionDetails>
        }
      />

      <Option
        id="item_2"
        label="Item 2"
        details={
          <OptionDetails controlledBy="item_2">Second item</OptionDetails>
        }
      />
    </OptionList>
  );
}

function WithPrimaryAndSecondaryContent() {
  const [selected, setSelected] = useState(['item_1']);

  return (
    <OptionList
      id="withAccessory"
      selectedItems={selected}
      onChange={setSelected}
    >
      <Option id="item_1" label="Free shipping. $0.00">
        <OptionPrimaryContent>Free shipping</OptionPrimaryContent>
        <OptionSecondaryContent>
          <TextBlock emphasized>Free</TextBlock>
        </OptionSecondaryContent>
      </Option>

      <Option id="item_2" label="Standard shipping. $19.00">
        <OptionPrimaryContent>Standard shipping</OptionPrimaryContent>
        <OptionSecondaryContent>
          <TextBlock emphasized>$19.00</TextBlock>
        </OptionSecondaryContent>
      </Option>

      <Option id="item_3" label="Paypal">
        <OptionPrimaryContent>
          <img
            src="https://cdn.shopify.com/s/assets/checkout/offsite-gateway-logos/paypal@2x-768388b0667bef1aa9a7cf02fa1cc2184c2915a90d4cdd62dde223f74f2acbfc.png"
            alt=""
            height="24"
          />
        </OptionPrimaryContent>
        <OptionSecondaryContent>
          <TextContainer spacing="none" alignment="trailing">
            <TextBlock emphasized>Free</TextBlock>
            <TextBlock subdued>Ready for pickup</TextBlock>
          </TextContainer>
        </OptionSecondaryContent>
      </Option>

      <Option id="item_4" label="Store name 1 accessible content">
        <OptionPrimaryContent>
          <TextBlock emphasized>Store name 1</TextBlock>
          <TextBlock subdued>
            490 Rue De La Gauchetière O, Montréal, QC
          </TextBlock>
        </OptionPrimaryContent>
        <OptionSecondaryContent>
          <TextContainer spacing="none" alignment="trailing">
            <TextBlock emphasized>Free</TextBlock>
            <TextBlock subdued>Ready for pickup</TextBlock>
          </TextContainer>
        </OptionSecondaryContent>
      </Option>

      <Option id="item_5" label="Store Name 2 accessible content">
        <OptionPrimaryContent>
          <TextContainer>
            <TextBlock emphasized>Store name 2</TextBlock>
            <TextBlock subdued>150 Elgin St, Ottawa, ON</TextBlock>
            <TextBlock>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              hic, repudiandae ipsam earum molestiae exercitationem sunt
              deleniti reprehenderit enim adipisci consequuntur explicabo
              tempora officia nemo consequatur ut sint voluptate sequi?
            </TextBlock>
            <TextBlock>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
              tenetur autem ipsam itaque repellendus a maxime ex. Et
              reprehenderit aliquid odit blanditiis perferendis commodi
              molestias, itaque voluptates eaque reiciendis nam.
            </TextBlock>
          </TextContainer>
        </OptionPrimaryContent>
        <OptionSecondaryContent>
          <TextContainer spacing="none" alignment="trailing">
            <TextBlock emphasized>Free</TextBlock>
            <TextBlock subdued>Ready for pickup</TextBlock>
          </TextContainer>
        </OptionSecondaryContent>
      </Option>
    </OptionList>
  );
}

function WithMultipleSelection() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      allowMultiple
      id="withAccessory"
      selectedItems={selected}
      onChange={setSelected}
    >
      <Option
        id="item_1"
        label="Item 1"
        details={
          <OptionDetails controlledBy="item_1">First item</OptionDetails>
        }
      />

      <Option
        id="item_2"
        label="Item 2"
        details={
          <OptionDetails controlledBy="item_2">Second item</OptionDetails>
        }
      />
    </OptionList>
  );
}

export const basic = () => <Basic />;
export const withTitle = () => <WithTitle />;
export const withHiddenTitle = () => <WithHiddenTitle />;
export const withPrimaryAndSecondaryContent = () => (
  <WithPrimaryAndSecondaryContent />
);
export const withMultipleSelection = () => <WithMultipleSelection />;
