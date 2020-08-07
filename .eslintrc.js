module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    "browser": true,
    "node": true,
    "jasmine": true
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};