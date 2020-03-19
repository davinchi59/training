const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};
const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith('pug'));

module.exports = {
    context: PATHS.src,
    entry: {
        main: './index.js'
    },
    output: {
        filename: 'bundle.js',
        path: PATHS.dist
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.pug$/,
            loader: 'pug-loader'
        }, {
            test: /\.(svg|ttf|woff)$/,
            loader: 'file-loader',
            options: {
                name: '/fonts/[name]/[name].[ext]'
            }
        }, {
            test: /\.sass$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]
        }]
    },
    plugins: [
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./pages/${page.replace(/\.pug/, '.html')}`
        })),
        new MiniCssExtractPlugin({
            filename: "./bandle.css"
        }),
        new CleanWebpackPlugin()
    ]
}