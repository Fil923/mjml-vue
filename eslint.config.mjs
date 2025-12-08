import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";
import parser from "vue-eslint-parser";

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...pluginVue.configs["flat/recommended"],
	...pluginVue.configs["flat/base"],
	...pluginVue.configs["flat/strongly-recommended"],
	...pluginVue.configs["flat/essential"],

	{
		ignores: [
			"/.vscode",
			"/.yarn",
			"/node_modules",
			"/dist",
			"/public",
			"/Bowler.Backend/",
			"/Bowler.Locales/",
			"/Bowler.Frontend/src/fontawesome-pro/",
		],
	},
	{
		plugins: {
			pluginVue,
			"simple-import-sort": simpleImportSort,
			"unused-imports": unusedImports,
		},

		linterOptions: {
			reportUnusedDisableDirectives: true,
		},

		languageOptions: {
			parser,
			ecmaVersion: "latest",
			sourceType: "module",

			parserOptions: {
				allowImportExportEverywhere: false,
				parser: ts.parser,
			},
		},

		rules: {
			// https://eslint.vuejs.org/rules/

			"no-console":
				process.env.NODE_ENV === "production" ? "warn" : "off",
			"no-debugger":
				process.env.NODE_ENV === "production" ? "warn" : "off",
			curly: ["error", "multi-or-nest"],

			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
				},
			],

			"multiline-ternary": ["error", "always-multiline"],
			"no-async-promise-executor": "off",
			"no-constant-binary-expression": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",

			"no-empty": [
				2,
				{
					allowEmptyCatch: true,
				},
			],

			"no-tabs": "off",
			quotes: ["error", "double"],

			semi: [
				"error",
				"always",
				{
					omitLastInOneLineBlock: true,
				},
			],

			"operator-linebreak": ["error", "before"],
			"no-return-assign": "off",
			"vue/html-indent": ["error", "tab"],
			"vue/camelcase": "error",

			"vue/return-in-computed-property": [
				"error",
				{
					treatUndefinedAsUnspecified: true,
				},
			],

			"vue/order-in-components": ["error"],
			"sort-keys": "off",
			"vue/sort-keys": "off",
			"vue/component-name-in-template-casing": [
				"error",
				"PascalCase",
				{
					registeredComponentsOnly: true,
					ignores: [],
				},
			],
			"vue/multi-word-component-names": "off",
			"vue/valid-v-for": "off",

			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": ["error"],
			"no-unused-expressions": "off",

			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowTernary: true,
				},
			],

			"no-unused-vars": "off",
			"unused-imports/no-unused-imports": "error",

			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			"@typescript-eslint/no-unused-vars": [
				1,
				{
					args: "after-used",
					vars: "all",
				},
			],

			"@typescript-eslint/no-wrapper-object-types": "error",

			"no-empty-function": "off",

			"@typescript-eslint/no-empty-function": [
				"error",
				{
					allow: ["arrowFunctions"],
				},
			],

			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"sort-imports": "off",
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
];
