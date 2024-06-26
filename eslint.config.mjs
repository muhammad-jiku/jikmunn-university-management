// eslint.config.mjs
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        myGlobalVariable: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'warn',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
  {
    ignores: ['**/dist/', '**/node_modules/', '.env'],
  },
)
