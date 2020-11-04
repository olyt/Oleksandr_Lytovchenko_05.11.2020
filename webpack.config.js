const path = require("path"),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "scripts.min.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                    }
                }]

            },
            {
                test: /\.scss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        require('autoprefixer')
                                    ],
                                ]
                            },
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },

                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            filename: "styles.min.css",
        })
    ],
};
