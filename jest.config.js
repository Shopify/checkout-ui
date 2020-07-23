const {resolve} = require('path');

const transformersRoot = resolve(__dirname, '../../app/tests/transformers');

const config = {
  rootDir: '.',
  displayName: 'UI',
  testEnvironment: 'jsdom',
  testRegex: '.*\\.test\\.tsx?$',
  testPathIgnorePatterns: ['/build/', '/node_modules/'],
  setupFilesAfterEnv: [resolve(__dirname, '../../config/testing/setup.ts')],
  transform: {
    '\\.[tj]sx?$': resolve(transformersRoot, 'typescript.js'),
    '\\.svg$': resolve(transformersRoot, 'svg.js'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|csv|ico)$': resolve(
      transformersRoot,
      'file.js',
    ),
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^react$': 'preact/compat',
    '^react-dom$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^@quilted/react-testing/dom$': '@quilted/react-testing/preact',
  },
};

module.exports = config;
