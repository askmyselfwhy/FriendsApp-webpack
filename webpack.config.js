const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const settings = {
    distPath: path.join(__dirname, "dist"),
    srcPath: path.join(__dirname, "src"),
    publicPath: path.join(__dirname, "public"),
};

function srcPathExtend(subpath) {
    return path.join(settings.srcPath, subpath)
}

module.exports = (env, options) => {
    const isDevMode = options.mode === "development";

    return {
        devtool: isDevMode ? "source-map" : false,
        resolve: {
            extensions: [".jsx", ".js"],
        },
        output: {
            path: settings.distPath,
            filename: 'main.js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ["babel-loader", "eslint-loader"]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require("autoprefixer")()
                                ],
                                sourceMap: isDevMode
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require("autoprefixer")()
                                ],
                                sourceMap: isDevMode
                            }
                        },
                    ]
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                        },
                    },
                },
                {
                    test: /\.(jpe?g|png|gif|svg|ico)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets/"
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin([settings.distPath], {
                verbose: true
            }),
            new HtmlWebpackPlugin({
                template: path.join(settings.publicPath, 'index.html')
            })
        ]
    };
};
