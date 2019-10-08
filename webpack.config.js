const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        [`${packageJson.name}.${packageJson.version}`]: './src/index.js'
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: `${packageJson.name}.${packageJson.version}`,
                    test: /\.(le|c)ss$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: ENV === 'development',
                    },
                  },
                  'css-loader',
                  'less-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].min.css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new webpack.DefinePlugin({
            // PRODUCTION: JSON.stringify(ENV) === 'production',
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ],
    output: {
        filename: '[name].min.js',
        path: path.join(__dirname, 'dist'),
        publicPath: path.join(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000
    }
};
