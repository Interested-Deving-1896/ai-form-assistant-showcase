import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['sbin/**', 'coverage/**']
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  tseslint.configs['flat/eslint-recommended'],
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        _: false
      }
    }
  },
  {
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  eslintConfigPrettier,
  {
    rules: {
      'eol-last': ['error', 'always'],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],
      'linebreak-style': ['error', 'unix'],
      'max-len': ['warn', { code: 120, comments: 120, ignoreUrls: true }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  }
];
