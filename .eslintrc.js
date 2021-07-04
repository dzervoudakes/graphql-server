// Default config: https://github.com/dzervoudakes/dztools/blob/main/packages/formatting/eslint-config-typescript/index.js
const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['@dztools/eslint-config-typescript'],
  rules: {
    'no-console': OFF,
    'import/no-extraneous-dependencies': ERROR
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
};
