const path = require('path');

const entryConfig = {
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dev'),
        library: 'AdbUpload',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            }
        ],
    },
};

module.exports = entryConfig;