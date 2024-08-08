import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error"
    }
  },
  pluginReactConfig,
];