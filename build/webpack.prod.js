process.env.NODE_ENV = "production";

const { merge } = require("webpack-merge");
const configFactory = require("./webpack.common.js");
const commonConfig = configFactory("production");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

let prodConfig = merge(commonConfig, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new OptimizeCssAssetsWebpackPlugin(),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerMode: "disabled",
			generateStatsFile: true,
			statsFilename: "bundle-analyzer-stats.json",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						arrows: false,
						collapse_vars: false,
						comparisons: false,
						computed_props: false,
						hoist_funs: false,
						hoist_props: false,
						hoist_vars: false,
						inline: false,
						loops: false,
						negate_iife: false,
						properties: false,
						reduce_funcs: false,
						reduce_vars: false,
						switches: false,
						toplevel: false,
						typeofs: false,
						booleans: true,
						if_return: true,
						sequences: true,
						unused: true,
						conditionals: true,
						dead_code: true,
						evaluate: true,
					},
					mangle: {
						safari10: true,
					},
				},
				sourceMap: true,
				cache: true,
				parallel: true,
				extractComments: false,
			}),
		],
		splitChunks: {
			cacheGroups: {
				vendors: {
					name: "vendors",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: "initial",
				},
				common: {
					name: "common",
					minChunks: 2,
					priority: -20,
					chunks: "initial",
					reuseExistingChunk: true,
				},
			},
			// runtimeChunk: true,
		},
	},
});

prodConfig = smp.wrap(prodConfig);
module.exports = prodConfig;
