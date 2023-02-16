module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
