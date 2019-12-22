const status = (process.env.NODE_ENV === 'production') ? 'error' : 'warn';

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // plugin overrides
    'node/no-unsupported-features/es-syntax': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'react/jsx-first-prop-new-line': [status, 'multiline'],
    'react/no-unescaped-entities': 'off',
    'react/jsx-indent-props': [status, 2],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-max-props-per-line': [1, { 'when': 'always' }],
    'react/jsx-space-before-closing': [status, 'always'],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    // custom eslint overrides
    'arrow-body-style': 'off',
    'camelcase': [
      0, {
        'properties': 'never',
      },
    ],
    'consistent-return': [0, 'never'],
    'import/extensions': [status, 'always', {
      'js': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never',
    }],
    'import/prefer-default-export': 'off',
    'indent': [
      status,
      2,
    ],
    'linebreak-style': ['error', 'unix'],
    'max-len': 'off',
    'no-console': status,
    'no-debugger': status,
    'no-unused-expressions': [status, {
      'allowShortCircuit': true,
      'allowTernary': true,
    }],
    'no-underscore-dangle': ['off', { 'properties': 'never' }],
    'object-curly-newline': 'off',
    'quotes': [
      status,
      'single',
    ],
    'semi': [
      status,
      'always',
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      'node': { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
};
