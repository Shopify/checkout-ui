const PostCssNesting = require('postcss-nesting');
const PostCssAutoprefixer = require('autoprefixer');
const PostCssFunctions = require('postcss-functions');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-knobs/register'],
  webpackFinal: (config) => {
    config.module.rules = [];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['babel-preset-shopify/web', {typescript: true}],
          'babel-preset-shopify/react',
        ],
      },
      resolve: {
        alias: {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        },
      },
    });

    config.module.rules.push({
      test: /\.esnext$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: ['babel-preset-shopify/web', 'babel-preset-shopify/react'],
      },
      resolve: {
        alias: {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        },
      },
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]-[local]_[hash:base64:5]',
            },
            importLoaders: 1,
            sourceMap: false,
            onlyLocals: false,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              PostCssNesting(),
              PostCssAutoprefixer(),
              PostCssFunctions({
                functions: {
                  rem(target, root = '10px') {
                    if (target.includes('px')) {
                      return `${parseFloat(target) / parseFloat(root)}rem`;
                    } else {
                      throw new Error('Value must be in pixels.');
                    }
                  },
                  em(target, parent = '14px') {
                    if (target.includes('px')) {
                      return `${parseFloat(target) / parseFloat(parent)}em`;
                    } else {
                      throw new Error('Value must be in pixels.');
                    }
                  },
                },
              }),
            ],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /icons\/.*\.svg$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['babel-preset-shopify/web', {typescript: true}],
              'babel-preset-shopify/react',
            ],
          },
        },
        {
          loader: '@svgr/webpack',
          options: {babel: false},
        },
      ],
      resolve: {
        alias: {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        },
      },
    });

    config.module.rules.push({
      test: /images\/.*\.svg$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            emitFile: true,
          },
        },
      ],
    });

    config.resolve.extensions.unshift('.esnext', '.ts', '.tsx');
    config.resolve.mainFields = ['esnext', 'browser', 'module', 'main'];
    return config;
  },
};
