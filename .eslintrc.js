module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    sourceType: "module",
  },
  rules: {},
  globals: {
    axios: "readonly",
    jQuery: "readonly",
  },
};
