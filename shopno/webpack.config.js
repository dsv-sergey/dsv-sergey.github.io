let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

//TODO: remove from prod
let WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    context: __dirname,
    entry: "./js/main",
    output: {
        path: './Build',
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './Src/app.html'
        }),
        new WebpackNotifierPlugin()
    ],

    devtool: "inline-source-map",

    module: {
        loaders: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ['style', 'css']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ]
    }
};