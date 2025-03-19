const restrictedComponents = [
  'Button',
  'Select',
  'Input',
  'InputNumber',
  'DatePicker',
  'Collapse',
  'Switch',
  'Tabs',
  'Card',
  'Drawer',
  'Tooltip',
  'Table',
  'Tag',
  'Divider',
  'Skeleton',
  'Spin',
  'Dropdown',
  'Steps',
  'Checkbox',
  'Radio',
  'Upload',
  'Layout',
  'Breadcrumb',
  'Badge',
  'TreeSelect',
  'TextArea',
];

const restrictedPaths = restrictedComponents.map((component) => ({}));

restrictedPaths.push(
  
);

const basicRestrictedPaths = restrictedComponents.map((component) => ({
  name: 'antd',
  importNames: restrictedComponents,
  message: ``,
}));

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-html', 'react'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/prop-types': 'off', //Since we are using typescript I think this is redundant
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-key': 'off',
    'no-var': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/jsx': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'jsx-a11y/no-autofocus': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-restricted-imports': [
      'error',
      {
        paths: restrictedPaths,
      },
    ],
    'no-else-return': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    // 'no-empty-function': 'error',
    'no-self-compare': 'error',
    'no-constant-binary-expression': 'error',
    'no-template-curly-in-string': 'error',
    // 'react/no-unused-prop-types': 'error',

    'prefer-template': 'error',
    'array-callback-return': 'warn',
    'import/exports-last': 'warn',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      },
    ],
    eqeqeq: ['warn', 'always'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'DebuggerStatement',
        message: '`debugger` statements should be removed from production code.',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'packages/web/src/'],
      },
    },
  },
  overrides: [
    {
      files: ['packages/web/src/**/*.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: basicRestrictedPaths,
          },
        ],
      },
    },
  ],
};
