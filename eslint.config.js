import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-config-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import { fixupPluginRules } from '@eslint/compat';

export default [
  js.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['dist', 'node_modules', 'eslint.config.js'],
    plugins: {
      react: pluginReact,
      'react-hooks': fixupPluginRules(pluginReactHooks),
      prettier: prettierPlugin,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['tsconfig.app.json', 'tsconfig.node.json']
      },
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'no-console': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' }
      ],
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function' }
      ],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'max-lines': ['warn', { max: 124 }],
      'max-params': ['error', 4],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } }
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true
        }
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignoreEnums: true,
          ignoreArrayIndexes: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignore: [0, 1]
        }
      ]
    }
  }
];
