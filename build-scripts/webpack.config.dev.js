var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    debug:true,
    devtool: 'eval-source-map',
    entry: ['./src/client/js/index.js', require.resolve('react-dev-utils/webpackHotDevClient'), './src/client/css/app.scss'],
    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: './'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:/\.s?css$/,
                loader: ExtractTextPlugin.extract(["css-loader?importLoaders=1&sourceMap=inline", "sass-loader?sourceMap=inline"])
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/html/index.html'
        }),
        new ExtractTextPlugin("styles.css")
    ],
    sassLoader: {
        includePaths: ['./node_modules']
    }
}