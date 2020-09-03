module.exports = {
  env: {
    browser: true,
    es2020: true,
    commonjs: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-base'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': 0,
    'react/prop-types': 0,
  },
};
