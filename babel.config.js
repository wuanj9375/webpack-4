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
	],
	plugins: [
		[
			"@babel/plugin-transform-runtime",
			{
				corejs: 3,
			},
		],
	],
};
