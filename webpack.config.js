const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    plugins: [new HtmlWebpackPlugin({ template: './index.html' }), new CopyPlugin({ patterns: [{ from: "./src/assets", to: "src/assets" }] })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          ['@babel/preset-env', { targets: "defaults" }]
                        ]
                      }
                }
            }
        ]
    },
    devServer: {
        static: './dist',
        open: true,
        watchFiles: ['./index.html', './src'], 
    },
}