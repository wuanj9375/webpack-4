module.exports = {
	babelrc: false,
	presets: [
		[
			"@babel/preset-env",
			// {
			//   useBuiltIns: "usage", // 'usage', ‘entry’, false
			//   corejs: 3,
			// },
			
		],
		"@babel/preset-typescript"
	],
	plugins: [
		[
			"@babel/plugin-transform-runtime",
			{
				corejs: 3,
			},
		],
		// "@babel/plugin-proposal-class-properties",
		// "@babel/plugin-proposal-object-rest-spread"
	],
};
