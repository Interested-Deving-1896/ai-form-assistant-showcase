module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020, // or "latest"
    sourceType: 'module'
  },
  extends: [
    'prettier',
    'eslint:recommended',
    // '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:vitest-globals/recommended'
  ],
  overrides: [
    {
      files: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}'],
      env: {
        'vitest-globals/env': true
      }
    }
  ],
  plugins: [],
  ignorePatterns: ['public/*'],
  rules: {
    'eol-last': ['error', 'always'],
    indent: [
      'warn',
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
    semi: ['error', 'always'],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any'
        }
      }
    ],
    'vue/html-indent': 'off',
    'vue/multi-word-component-names': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
};
