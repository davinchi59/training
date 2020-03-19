const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        port: 1296
    }
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});