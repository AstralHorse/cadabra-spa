const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    output: {
        publicPath: '/',
        filename: "bundle.js",
        path: __dirname + "/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        plugins: [new TsConfigPathsPlugin(/* { tsconfig, compiler } */)],
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            }, {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            module: true,
                            camelCase: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({title: 'Custom template', template: 'templates/index.ejs'})],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        //        "react": "React",
        //        "react-dom": "ReactDOM"
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        }
    }
};
