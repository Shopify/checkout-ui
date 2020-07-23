module.exports = {
  extends: ['stylelint-config-shopify/prettier'],
  plugins: ['stylelint-use-nesting'],
  rules: {
    'shopify/content-no-strings': true,
    'selector-class-pattern': null,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/^grid.*/'],
      },
    ],
    'csstools/use-nesting': 'always',
    'scss/selector-no-redundant-nesting-selector': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-max-combinators': null,
  },
};
