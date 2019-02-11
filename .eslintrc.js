module.exports = {
  parser: 'babel-eslint',
  env: {
      'es6': true,
      'browser': true,
      'node': true,
      'mocha': true,
      jest: true
  },
  parserOptions: {
    ecmaVersion: 9,
  },
  'globals': {
      's': true,
      'os': true,
      'google': true,
      'React': true
  },
  rules: {
    'dot-notation': 'off',
    'eol-last': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'max-len': 'off',
    'no-console': 0,
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'import/extensions': 0,
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    'react/button-has-type': 'off',
    'react/require-default-props': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-filename-extension': [0],
    'no-use-before-define': ['error', { 'functions': false, 'classes': false, 'variables': false }],
    'react/forbid-prop-types': [0],
    'react/prefer-stateless-function': [1, { 'ignorePureComponents': true }],
    'react/destructuring-assignment': 'never',
  },
};
