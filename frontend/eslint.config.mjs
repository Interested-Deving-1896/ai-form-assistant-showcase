import js from '@eslint/js';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import vitestGlobals from 'eslint-plugin-vitest-globals';
import globals from 'globals';

export default defineConfigWithVueTs(
  {
    ignores: ['public/**', 'dist/**', 'coverage/**']
  },
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.base,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  },
  {
    files: ['*.config.{js,mjs,cjs,ts}', 'volar.config.js', 'lcov-fix.mjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}'],
    ...vitestGlobals.configs['flat/recommended']
  },
  {
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
      'vue/block-order': [
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
      'vue/block-lang': 'off',
      'vue/html-indent': 'off',
      'vue/multi-word-component-names': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/singleline-html-element-content-newline': 'off'
    }
  },
  eslintConfigPrettier
);
