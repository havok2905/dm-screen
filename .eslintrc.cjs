module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended', 'plugin:react/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "no-case-declarations": 0,
    'no-unused-disable': 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-sort-props': 2,
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'sort-imports': [
      'error', {
        'ignoreCase': true,
        'ignoreDeclarationSort': false,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
        'allowSeparatedGroups': true
      }
    ],
    '@typescript-eslint/no-explicit-any': 0,
    "@typescript-eslint/no-namespace": 0
  },
}
