module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'no-unused-vars': 'warn',
    'semi': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'eol-last': 'off',
    'require-jsdoc': 'off',
    'quites': 'off',
    'operator-linebreak': 'off'
  }
}