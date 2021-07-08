# `@shopify/checkout-ui-react`

This library provides reference implementations of the UI components available in Checkout. These components are copied from a private Shopify repo periodically to serve primarily as a reference implementation.

This library is intended to be used to help produce WYSIWYG editors for Shopify checkout extensions that will use [Checkout UI Extensions](https://github.com/Shopify/ui-extensions/tree/main/packages/checkout-ui-extensions) at runtime. Since Checkout UI Extensions components do not actually render to the DOM, these components help demonstrate the necessary styles and event handling for the UI components that Checkout UI Extensions maps to. These are the exact same components used at Shopify to render a Checkout UI extension.

More components are available in this package than are provided by Checkout UI Extensions. The set of components we provide will grow over time (and if you see anything in this library you would love to add, please [raise an issue in the UI Extensions repo](https://github.com/Shopify/ui-extensions/issues/new)), but this library includes all of the UI components we use throughout checkout as a convenience for us at Shopify in generating this package. Any components, properties, or other functionality that you see in this package that does not match the [component APIs provided by Checkout UI Extensions](https://github.com/Shopify/ui-extensions/blob/main/packages/checkout-ui-extensions/documentation/components.md) is considered unstable, and may be removed or changed at any time without notice. Additionally, components in this library have no documentation; refer to the Checkout UI Extensions component documentation for details on the usage of the many components and props provided by this library.

## Installation

`@shopify/checkout-ui-react` is provided as npm package.

```sh
yarn add @shopify/checkout-ui-react
#or
npm install @shopify/checkout-ui-react
```

## Technical details

This library is authored with [React](https://reactjs.org). However, the Checkout UI Extensions host that Shopify provides aliases all React APIs to [Preact](https://preactjs.com), a lightweight alternative to React. If you are using these components directly, we recommend you do the same (see the [webpack section below](#webpack) for details).

The UI components in this library require a few pieces of [React context](https://reactjs.org/docs/context.html), and some [global styles](https://github.com/Shopify/checkout-ui/blob/main/src/style.css). To make this easier for you, we’ve included a single `Context` component you can wrap around your React application that will provide all of these global requirements. You can import this component from `@shopify/checkout-ui-react/ui-extensions`:

```tsx
import React from 'react';
import {Context} from '@shopify/checkout-ui-react/ui-extensions';
import {Text} from '@shopify/checkout-ui-react';

export default function App() {
  return (
    <Context>
      <AppUi />
    </Context>
  );
}

function AppUi() {
  return <Text>I can safely use UI components now!</Text>;
}
```

### webpack

Shopify uses [webpack](https://webpack.js.org) to bundle code for running in the browser. This package provides a function you can use to augment an existing webpack configuration with all that is necessary to properly build this library. This includes additional configuration for handling the JavaScript build outputs for this library, as well as CSS, SVGs, and other assets.

```js
// in webpack.config.js

const {addWebpackConfig} = require('@shopify/checkout-ui-react/webpack');

module.exports = addWebpackConfig({
  // Your own webpack config goes here
});

// `addWebpackConfig` accepts some options to customize the build
module.exports = addWebpackConfig(
  {
    // Your own webpack config goes here
  },
  {
    // disable the automatic `preact` aliasing:
    preact: false,
    // whether build is for development or production. Defaults to `NODE_ENV === "development"`
    development: true,
  },
);
```

If you are not using webpack to bundle your application, you will need to replicate the [handling of various file types](https://github.com/Shopify/checkout-ui/blob/main/src/webpack-config.ts) in the build tool you are using. Additionally, unlike with Shopify’s Polaris component library, this library does not offer plain HTML/ CSS assets.

## Contributing

As noted above, this repo is periodically updated from a private Shopify repo that is the source of truth. As a result, no contributions are currently being accepted for this library.

## License

MIT &copy; [Shopify](https://shopify.com/), see [LICENSE.md](LICENSE.md) for details.

<a href="http://www.shopify.com/"><img src="https://cdn.shopify.com/assets2/brand-assets/shopify-logo-main-8ee1e0052baf87fd9698ceff7cbc01cc36a89170212ad227db3ff2706e89fd04.svg" alt="Shopify" width="200" /></a>
