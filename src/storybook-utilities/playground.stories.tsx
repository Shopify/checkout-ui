import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';

import {
  BlockStack,
  Bookend,
  Button,
  ButtonGroup,
  Checkbox,
  FormLayoutGroup,
  FormLayout,
  Heading,
  HeadingGroup,
  Image,
  InlineStack,
  Link,
  Radio,
  Select,
  Separator,
  SkeletonText,
  Text,
  TextBlock,
  TextContainer,
  TextField,
  /* Tiles,
 Tile */
} from '..';

import {themeWithKnobs} from '.';

const meta = {
  title: 'Playground',
  decorators: [withKnobs, themeWithKnobs()],
};

export default meta;

function Content() {
  return <div style={{backgroundColor: 'lightgrey'}}>Content block</div>;
}

export const argoComponents = () => (
  <BlockStack spacing="xloose">
    <Heading>BlockStack</Heading>
    <BlockStack spacing="xtight">
      <Content />
      <Content />
      <Content />
      <Content />
    </BlockStack>
    <Separator />
    <Heading>Bookend</Heading>
    <Bookend trailing>
      <TextField label="Name" />
      <Button>Hello, world!</Button>
    </Bookend>
    <Separator />
    <Heading>ButtonGroup</Heading>
    <ButtonGroup>
      <Button>Hello, world!</Button>
      <Button>Hello, world!</Button>
      <Button>Hello, world!</Button>
    </ButtonGroup>
    <Separator />
    <Heading>Checkbox</Heading>
    <BlockStack>
      <Checkbox id="checkbox1" name="checkboxchoices">
        Save this information for next time
      </Checkbox>
      <Checkbox id="checkbox2" name="checkboxchoices">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, dolores
        aut harum accusantium nihil excepturi nemo iusto dolore impedit officia
        est consectetur sint neque voluptatibus? Amet ut excepturi culpa?
        Mollitia?
      </Checkbox>
      <Checkbox id="checkbox3" name="checkboxchoices">
        <Text emphasized>Lorem ipsum dolor sit amet</Text>
        <Text>consectetur adipisicing elit</Text>
      </Checkbox>
    </BlockStack>
    <Separator />
    <Heading>FormLayout</Heading>
    <FormLayout>
      <FormLayoutGroup>
        <Select
          id="select"
          name="country"
          label="Country"
          options={[
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
          ]}
        />
        <Select
          id="select"
          name="province"
          label="Province"
          options={[
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
          ]}
        />
      </FormLayoutGroup>
      <TextField label="Address" name="address1" id="address1" />
      <TextField label="Apartment, suite, etc." name="address2" id="address2" />
    </FormLayout>
    <Separator />
    <Heading>Heading</Heading>
    <HeadingGroup>
      <Heading level={1}>Hello, world!</Heading>
      <Heading level={2}>Hello, world!</Heading>
      <Heading level={3}>Hello, world!</Heading>
    </HeadingGroup>
    <Separator />
    <Heading>Image</Heading>
    <div style={{width: 512}}>
      <Image
        source="http://placekitten.com/g/512/256"
        sources={[
          {source: 'http://placekitten.com/g/512/256', resolution: 1},
          {source: 'http://placekitten.com/g/1024/512', resolution: 2},
        ]}
        aspectRatio={1}
        fit="contain"
        bordered
        description="placekitten.com"
      />
    </div>
    <Separator />
    <Heading>InlineStack</Heading>
    <InlineStack>
      <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content /> <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content /> <Content />
      <Content />
      <Content />
    </InlineStack>
    <Separator />
    <Heading>Link</Heading>
    <InlineStack>
      <Link to="https://shopify.com" external={false}>
        Internal link
      </Link>
      <Link to="https://shopify.com" external>
        External link
      </Link>
      <Link to={undefined}>Link without Url</Link>
    </InlineStack>
    <Separator />
    <Heading>Radio</Heading>
    <div style={{width: '250px'}}>
      <BlockStack>
        <Radio id="radio1" name="radiochoices">
          Save this information for next time
        </Radio>
        <Radio id="radio2" name="radiochoices">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
          dolores aut harum accusantium nihil excepturi nemo iusto dolore
          impedit officia est consectetur sint neque voluptatibus? Amet ut
          excepturi culpa? Mollitia?
        </Radio>
        <Radio id="radio3" name="radiochoices">
          <Text emphasized>Lorem ipsum dolor sit amet</Text>
          <Text>consectetur adipisicing elit</Text>
        </Radio>
      </BlockStack>
    </div>
    <Separator />
    <Heading>Select</Heading>
    <Select
      {...{
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
      }}
    />
    <Separator />
    <Heading>Separator</Heading>
    <BlockStack>
      <Content />
      <Separator />
      <Content />
    </BlockStack>
    <Separator />
    <Heading>SkeletonText</Heading>
    <SkeletonText lines={3} />
    <Separator />
    <Heading>Text</Heading>
    <BlockStack>
      <Text>Default</Text>
      <Text subdued>Subdued</Text>
      <Text emphasized>Emphasized</Text>
    </BlockStack>
    <Separator />
    <Heading>TextBlock</Heading>
    <TextContainer>
      <TextBlock>Default</TextBlock>
      <TextBlock subdued>Subdued</TextBlock>
      <TextBlock emphasized>Emphasized</TextBlock>
    </TextContainer>
    <Separator />
    <Heading>TextContainer</Heading>
    <TextContainer>
      <ExampleText />
      <ExampleText />
      <ExampleText />
      <ExampleText />
    </TextContainer>
    <Separator />
    <Heading>Tiles</Heading>
    {/*
    <Tiles maxPerLine={2}>
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
      <ExampleTile />
    </Tiles>
    */}
  </BlockStack>
);

/* function ExampleTile() {
  return (
    <Tile>
      <div
        style={{
          backgroundColor: 'lightgrey',
          border: '1px #000 solid',
          padding: '1em',
        }}
      >
        Content block
      </div>
    </Tile>
  );
} */

function ExampleText() {
  return (
    <TextBlock>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae enim
      veniam natus facilis. Nemo nisi assumenda alias dolore saepe quia! Sed
      perspiciatis veritatis nesciunt vitae nobis distinctio quod illo neque?
    </TextBlock>
  );
}
