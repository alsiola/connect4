var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = {
    debug:true,
    devtool: 'eval-source-map',
    devServer: {
        inline: true
    },
    entry: ['./src/client/index.js', './src/client/css/app.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/'),
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
                loader: ExtractTextPlugin.extract(["css-loader", "sass-loader", "postcss-loader"])
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        }),
        new ExtractTextPlugin("styles.css")
    ],
    postcss: () => [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ]
      }),
    ],
    sassLoader: {
        includePaths: ['./node_modules']
    }
}