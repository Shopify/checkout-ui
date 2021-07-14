/* eslint-disable @shopify/jsx-no-hardcoded-content */
import React from 'react';
import {render} from 'react-dom';
import {Context} from '@shopify/checkout-ui-react/argo';
import {
  Heading,
  BlockStack,
  Layout,
  Banner,
  Button,
  MoneyLine,
  Thumbnail,
  View,
  MoneyLines,
} from '@shopify/checkout-ui-react';

export default function App() {
  return (
    <Context>
      <Layout>
        <BlockStack>
          <Banner iconHidden>
            <Layout spacing="loose" blockAlignment="center">
              <Thumbnail
                description="product"
                source="https://via.placeholder.com/64x64/eee"
              />
              <View>
                <Heading>My awesome product</Heading>
                <MoneyLines title="Cost summary">
                  <MoneyLine value="$19.99" />
                </MoneyLines>
              </View>
              <Button>Buy now</Button>
            </Layout>
          </Banner>
        </BlockStack>
      </Layout>
    </Context>
  );
}

render(<App />, document.querySelector('#app'));
