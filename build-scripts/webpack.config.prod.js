var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/client/js/index.js', './src/client/css/app.scss'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../build'),
        publicPath: '/'
    },
    module: {
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
        new webpack.DefinePlugin({
             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new HtmlWebpackPlugin({
            template: './src/client/html/index.html',
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
        new ExtractTextPlugin("styles.css"),
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
    ],
    sassLoader: {
        includePaths: ['./node_modules']
    }
}