const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const packageJson = require('./package.json');

const ENV = process.env.NODE_ENV || 'production';
const isDev = process.env.NODE_ENV !== 'production';
console.log('isDev', isDev);

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
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    idHint: `${packageJson.name}.${packageJson.version}`,
                    type: 'css/mini-extract',
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
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[name].min.css',
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
        new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/ })
    ],
    output: {
        filename: '[name].min.js',
    },
    devServer: {
        port: 3000
    }
};
