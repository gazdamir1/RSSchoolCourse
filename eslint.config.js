import { FlatCompat } from "@eslint/eslintrc"
import globals from "globals"
import js from "@eslint/js"
import ts from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"
import importPlugin from "eslint-plugin-import"
import prettier from "eslint-plugin-prettier"

const compat = new FlatCompat()

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["dist"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    globals: { ...globals.browser, ...globals.node },
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended"
  ),
  {
    plugins: {
      react,
      "react-refresh": "eslint-plugin-react-refresh",
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier: prettier,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
    },
  },
]
