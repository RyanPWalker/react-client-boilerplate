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
    'dot-notation': 0,
    'eol-last': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'max-len': 0,
    'no-console': 0,
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'import/no-extraneous-dependencies': 0,
    'import/newline-after-import': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
    'react/button-has-type': 0,
    'react/require-default-props': 0,
    'react/no-did-update-set-state': 0,
    'react/no-unescaped-entities': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [0],
    'no-use-before-define': ['error', { 'functions': false, 'classes': false, 'variables': false }],
    'react/forbid-prop-types': [0],
    'react/destructuring-assignment': 0,
  },
};
