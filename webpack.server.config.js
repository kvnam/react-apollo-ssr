const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'server', 'server.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js',
        publicPath: '/'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: [
                  'css-loader'
                ]
              },
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader'
                ]
              }
        ]
    }
};