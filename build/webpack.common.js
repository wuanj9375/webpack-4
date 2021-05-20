const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getClientEnvVar = require("./env");

const appDir = process.cwd();
const resolveApp = (relative) => path.resolve(appDir, relative);

const commonConfig = (env) => {
	const isDevMode = env === "development";
	const isProdMode = env === "production";
	const envVar = getClientEnvVar();

	return {
		entry: resolveApp("src/index.js"),
		output: {
			path: resolveApp("dist"),
			filename: `js/[name]${isProdMode ? ".[contenthash:8]" : ""}.bundle.js`,
			chunkFilename: `js/[name]${isProdMode ? ".[contenthash:8]" : ""}.chunk.js`,
			publicPath: "/",
		},
		resolve: {
			extensions: [".js", ".ts"],
			alias: {
				src: resolveApp("src"),
			},
		},
		module: {
			// noPare:'',
			rules: [
				{
					test: /\.(js|ts)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
						},
					},
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						isProdMode
							? {
									loader: MiniCssExtractPlugin.loader,
							  }
							: "style-loader",
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: {
									compileType: "module",
									auto: /\.module(s)?\.css$/i,
									localIdentName: "[folder]-[local]--[hash:base64:5]",
								},
							},
						},
						{
							loader: "postcss-loader",
						},
					],
				},
				{
					test: /\.scss$/,
					use: [
						isProdMode
							? {
									loader: MiniCssExtractPlugin.loader,
							  }
							: "style-loader",
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								modules: {
									compileType: "module",
									auto: /\.module(s)?\.scss$/i,
									localIdentName: "[folder]-[local]--[hash:base64:5]",
								},
							},
						},
						{
							loader: "postcss-loader",
						},
						{
							loader: "sass-loader",
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif|webp|svg)$/i,
					use: {
						loader: "url-loader",
						options: {
							esModule: false,
							limit: 4096,
							fallback: {
								loader: "file-loader",
								options: {
									name: "img/[name].[hash:8].[ext]",
									publicPath: "/",
								},
							},
						},
					},
				},
				{
					test: /\.(eot|ttf|otf|woff|woff2)$/i,
					use: {
						loader: "file-loader",
						options: {
							name: "font/[name].[hash:8].[ext]",
							publicPath: "/",
						},
						// options: {
						//   esModule: false,
						//   limit: 4096,
						//   fallback: {
						//     loader: "file-loader",
						//     options: {
						//       name: "font/[name].[hash:8].[ext]",
						//       publicPath: "/",
						//     },
						//   },
						// },
					},
				},
				{
					test: /\.(htm|html)$/i,
					loader: "html-withimg-loader",
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: resolveApp("public/index.html"),
			}),
			// https://github.com/vuejs/preload-webpack-plugin usage
			// new PreloadWebpackPlugin({
			//   rel: "preload",
			//   as(entry) {
			//     if (/\.css$/.test(entry)) return "style";
			//     if (/\.woff$/.test(entry)) return "font";
			//     if (/\.png$/.test(entry)) return "image";
			//     return "script";
			//   },
			//   include: ["main"],
			// }),
			isProdMode &&
				new MiniCssExtractPlugin({
					filename: "css/[name].[contenthash:8].css",
					chunkFilename: "css/[name].[chunkhash:8].css",
				}),
			new webpack.DefinePlugin(envVar.stringified),
		].filter(Boolean),
	};
};

module.exports = commonConfig;
