import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier, // Must be last to override other configs
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Custom rules - more lenient for development
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Allow any types in development

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'no-console': 'off', // Allow console statements
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',

      // Additional nice rules
      'no-empty': 'warn',
      'no-useless-catch': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      'dist/*',
      'build/*',
      'node_modules/*',
      'src/openapi/*',
      '.expo/*',
      '.expo-shared/*',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },
]);
