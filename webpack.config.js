const path = require('path');

module.exports = {
    entry: {
        tictactoe: path.join(__dirname, 'tictactoe', 'tictactoe'),
    },

    devtool: "source-map",

    resolve: {
        extensions: ['.js', '.json']
    },

    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "/"),
        open: true,
        inline: true,
        noInfo: true,
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: '[name].js',
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                }
            }
        ]
    },
};
