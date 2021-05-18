module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	parser: "@babel/eslint-parser",
	parserOptions: {
		// parser: "@babel/eslint-parser",
		sourceType: "module",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? 2 : 0,
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
	},
};
