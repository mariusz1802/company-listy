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
    ecmaVersion: "latest",
  },
  rules: {},
  globals: {
    axios: "readonly",
    jQuery: "readonly",
  },
};
