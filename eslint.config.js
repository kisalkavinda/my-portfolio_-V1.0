import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
// import { fixupConfigRules } from "@eslint/compat"; // Removed fixupConfigRules
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["node_modules/", "dist/"],
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules, // Directly use recommended rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/react-in-jsx-scope": "off", // Not needed with new React JSX transform
      "react/prop-types": "off", // Disable prop-types for modern React
      "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true, "argsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "^_" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
