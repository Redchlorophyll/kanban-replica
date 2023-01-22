module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "multiline-ternary": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
  },
};
