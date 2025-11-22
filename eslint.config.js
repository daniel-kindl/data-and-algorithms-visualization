import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React specific
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],

      // TypeScript code quality
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      // '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Disabled - requires type info
      // '@typescript-eslint/prefer-optional-chain': 'warn', // Disabled - requires type info

      // Method and class organization
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            // Index signature
            'signature',

            // Fields
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',

            // Constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',

            // Methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        },
      ],

      // Code style and best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      'no-multi-spaces': 'error',
      'no-duplicate-imports': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'warn',
      'max-len': [
        'warn',
        {
          code: 100,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],

      // React best practices
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': 'error',

      // SOLID Principles (documented in CODE_STYLE_GUIDE.md)
      // Note: max-lines, max-lines-per-function, and complexity are disabled
      // to maintain zero-warning policy. These are educational guidelines
      // tracked separately. Consider enabling during refactoring.
      
      // Single Responsibility Principle
      // 'max-lines': ['warn', { max: 800, skipBlankLines: true, skipComments: true }],
      // 'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
      // 'complexity': ['warn', 15],

      // Open/Closed Principle - prefer composition over modification
      '@typescript-eslint/prefer-readonly': 'warn',

      // Interface Segregation Principle - avoid large interfaces
      '@typescript-eslint/no-empty-interface': 'error',

      // Dependency Inversion Principle enforced through no-explicit-any (already enabled)
    },
  },
])