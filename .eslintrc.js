module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential', // 使用 essential 規範
    'eslint:recommended', // 使用 ESLint 推薦規範
    '@vue/typescript/recommended',
    '@vue/prettier', //使用 prettier
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        printWidth: 280, // default = 80
      },
    ],
  },
};
