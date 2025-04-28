const fs = require('fs');
const path = require('path');
const assetsPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'build');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

/**
 * Assemble the entrypoints for the webpack build.
 *
 * The primary entry point is the universal.js file, but templates are also
 * searched for.
 *
 * First, include the universal.js file.
 * Then, include all files in the templates directory.
 */
let entrypoints = {
	'editor': path.resolve( assetsPath + '/editor.js' ),
	'universal': path.resolve( assetsPath + '/universal.js' ),
};
// For each template with an HTML file, add an entrypoint.
fs.readdirSync( assetsPath + '/templates' ).forEach( ( template ) => {
	let templatePath = assetsPath + '/templates/' + template + '/index.js';
	if ( fs.existsSync( templatePath ) ) {
		entrypoints[ template ] = templatePath;
	}
});
// For each Pattern, add an entrypoint.
fs.readdirSync( assetsPath + '/patterns' ).forEach( ( pattern ) => {
	let patternPath = assetsPath + '/patterns/' + pattern + '/index.js';
	if ( fs.existsSync( patternPath ) ) {
		entrypoints[ pattern ] = patternPath;
	}
});

module.exports = (env) => {

	// Set the mode and devtool.
	let mode = env.production ? 'production' : 'development';
	let devtool = env.production ? 'source-map' : 'eval';

	return {
		mode: mode,
		devtool: devtool,

		entry: entrypoints,
		output: {
			path: path.resolve( outputPath + '/' ),
			filename: '[name].js',
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader",
							options: {
								"presets": [
									"@babel/preset-env"
								],
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 3,
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader', // Processes using PostCSS
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, 'postcss.config.js'),
								},
							},
						},
						'resolve-url-loader',
						{
							loader: 'sass-loader',
								options: {
									sourceMap: true
								}
						}
					]
				}
			]
		},

		plugins: [
			// CSS extraction
			new MiniCssExtractPlugin( {
				filename: './[name].css',
			} ),

			// ESLint, limited to this theme folder
			new ESLintPlugin( {
				context: path.resolve( __dirname ),
				extensions: [ 'js' ],
				files: [ 'src/**/*' ],
			} ),

			new StyleLintPlugin( {
				configFile: path.resolve(__dirname, '../../../.stylelintrc.json'),
				context: path.resolve( __dirname ),
				extensions: [ 'css', 'scss' ],
				fix: true
			} ),
		],

		watchOptions: {
			ignored: [
				'**/node_modules'
			]
		}
	}
};
