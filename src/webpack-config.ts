/* eslint @typescript-eslint/no-var-requires: off */

import * as path from 'path';

import type {Configuration} from 'webpack';

const SVG_ICONS_PATH_REGEX = /icons\/.*\.svg$/;
const IMAGE_PATH_REGEX = /\.(jpe?g|png|gif|svg)$/;
const LIBRARY_REGEX = /node_modules\/@shopify\/checkout-ui-react/;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  IgnoreTypeScriptExportWarnings,
} = require('@shopify/webpack-ignore-typescript-export-warnings-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFunctions = require('postcss-functions');
const postcssLogical = require('postcss-logical');
const postcssDirPseudoClass = require('postcss-dir-pseudo-class');

export function addWebpackConfig(
  config: Configuration,
  {preact = true, development = process.env.NODE_ENV === 'development'} = {},
): Configuration {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      // Adds .esnext extensions, which this library uses for optimized build
      // outputs
      extensions: [
        '.esnext',
        ...(config.resolve?.extensions ?? ['.mjs', '.js', '.json']),
      ],
      mainFields: [
        'esnext',
        ...((config.resolve?.mainFields as string[]) ?? [
          'browser',
          'module',
          'main',
        ]),
      ],
      alias: {
        ...config.resolve?.alias,
        ...(preact
          ? {react: 'preact/compat', 'react-dom': 'preact/compat'}
          : {}),
      },
    },
    module: {
      ...config.module,
      rules: [
        ...(config.module?.rules ?? []),
        {
          test: /\.esnext$/,
          include: LIBRARY_REGEX,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: false,
              sourceType: 'unambiguous',
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    corejs: 3,
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          include: LIBRARY_REGEX,
          use: [
            development
              ? {loader: 'style-loader'}
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {esModule: true},
                },
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  localIdentName: development
                    ? '[name]-[local]_[hash:base64:5]'
                    : '[hash:base64:5]',
                },
                importLoaders: 1,
                sourceMap: !development,
                onlyLocals: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss-checkout-ui',
                plugins: () => [
                  // @see https://github.com/csstools/postcss-preset-env
                  postcssPresetEnv({
                    stage: 3,
                    autoprefixer: {grid: true},
                    importFrom: [
                      path.join(
                        path.dirname(
                          require.resolve('@shopify/checkout-ui-react'),
                        ),
                        'src/style.css',
                      ),
                    ],
                    preserve: true,
                    // @see https://preset-env.cssdb.org/features
                    // @see https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
                    features: {
                      'nesting-rules': true,
                      'dir-pseudo-class': false,
                      'logical-properties-and-values': false,
                    },
                  }),
                  // PostCSS Preset Env uses caniuse to determine whether the plugins should run or not
                  // There are currently false positives that cause PostCSS Logical not to run, so we run it independently for now
                  // @see https://github.com/csstools/postcss-preset-env/issues/138
                  postcssLogical({preserve: true}),
                  postcssDirPseudoClass({preserve: true}),
                  postcssFunctions({
                    functions: {
                      rem(target: string, root = '10px') {
                        if (target.includes('px')) {
                          return `${parseFloat(target) / parseFloat(root)}rem`;
                        } else {
                          throw new Error('Value must be in pixels.');
                        }
                      },
                      em(target: string, parent = '14px') {
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
        },
        {
          include: LIBRARY_REGEX,
          test(resource: string) {
            return SVG_ICONS_PATH_REGEX.test(resource);
          },
          use: ['@svgr/webpack'],
        },
        {
          include: LIBRARY_REGEX,
          test(resource: string) {
            return (
              IMAGE_PATH_REGEX.test(resource) &&
              !SVG_ICONS_PATH_REGEX.test(resource)
            );
          },
          use: [
            {
              loader: 'file-loader',
              options: {
                emitFile: true,
              },
            },
            !development && {loader: 'image-webpack-loader'},
          ].filter(Boolean) as import('webpack').RuleSetLoader[],
        },
      ],
    },
    plugins: [
      ...(config.plugins ?? []),
      new IgnoreTypeScriptExportWarnings(),
      !hasMiniCssExtractPlugin(config) && new MiniCssExtractPlugin(),
    ].filter(Boolean),
  };
}

function hasMiniCssExtractPlugin(config: Configuration) {
  if (!config.plugins) {
    return false;
  }
  return config.plugins.some((plugin) => {
    return plugin instanceof MiniCssExtractPlugin;
  });
}
