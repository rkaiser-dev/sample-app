const eslint = require('@typescript-eslint/parser');
const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintPrettier = require('eslint-config-prettier');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname
});

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: "latest",
      parser: eslint,
      parserOptions: {
        sourceType: "module"
      }
    }
  },
  ...compat.config(eslintPlugin.configs['eslint-recommended']),
  ...compat.config(eslintPlugin.configs['eslint-recommended-type-checked']),
  eslintPrettier
];