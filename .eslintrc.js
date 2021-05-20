module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	// parser: "@babel/eslint-parser",
	parserOptions: {
		// parser: "@babel/eslint-parser",
		ecmaVersion: 2018,
		sourceType: "module",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? 2 : 0,
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
	},
};
