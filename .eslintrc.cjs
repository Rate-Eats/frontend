module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@tanstack/query/exhaustive-deps': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@tanstack/query/no-rest-destructuring': 'warn',
    "@typescript-eslint/no-unused-vars": 'warn',
    '@tanstack/query/stable-query-client': 'error',

    quotes: ['warn', 'single'],
  },
};
