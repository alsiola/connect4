var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: './src/client/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../build'),
        publicPath: '/'
    },
    module: {
        preloaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:/\.s?css$/,
                loaders: ["style-loader", "css-loader?modules", "sass-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
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
                minifyURLs: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
    ],
    postcss: () => [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ]
      })
    ]
}