

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack")
const path = require('path');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: "http://localhost:3000/",

    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        watchFiles: ["./public/*"],
        static: './dist',
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    { loader: "babel-loader" }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    { loader: "ts-loader" }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            title: 'Spa-App',
            inject: true,
        })],
    optimization: {
        runtimeChunk: 'single',
    },
};