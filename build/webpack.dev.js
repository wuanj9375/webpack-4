process.env.NODE_ENV = "development";

const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const configFactory = require("./webpack.common.js");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const commonConfig = configFactory("development");
const devConfig = merge(commonConfig, {
	mode: "development",
	devtool: "cheap-module-eval-source-map",

	devServer: {
		contentBase: path.resolve(__dirname, "../dist"),
		hot: true,
		// open: true,
		compress: true,
		overlay: true,
		quiet: true,
	},
	plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: ["App is running at http://localhost:8080"],
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ESLintWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({
			eslint: {
				files: "./src/**/*.{ts,js}", // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
			},
		}),
	],
});

module.exports = devConfig;
