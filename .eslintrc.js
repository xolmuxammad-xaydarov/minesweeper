module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'consistent-return': 0,
    'no-unused-vars': 'off',
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
  },
};
