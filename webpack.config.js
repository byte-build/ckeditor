/* eslint-env node */

const { resolve } = require('path')
const webpack = require('webpack')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils')

module.exports = {
	devtool: 'source-map',
	performance: { hints: false },
	entry: resolve('src', 'index.js'),
	output: {
		library: 'ClassicEditor',
		path: resolve('lib'),
		filename: 'index.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	optimization: {
		minimizer: [
			new TerserWebpackPlugin({
				extractComments: false
			})
		]
	},
	plugins: [
		new CKEditorWebpackPlugin({
			language: 'en',
			additionalLanguages: 'all'
		}),
		new webpack.BannerPlugin({
			banner: bundler.getLicenseBanner(),
			raw: true
		})
	],
	module: {
		rules: [
			{ test: /\.svg$/, use: ['raw-loader'] },
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: { 'data-cke': true }
						}
					},
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: styles.getPostCssConfig({
								themeImporter: {
									themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
								},
								minify: true
							})
						}
					}
				]
			}
		]
	}
}
