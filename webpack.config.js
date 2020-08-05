const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    target : process.argv.join().indexOf('--node') !== -1 ? 'node' : 'web', // 指定打包为 node 环境
    // devServer 配置
    devServer : {
        open : true,  // 自动打开页面
        port : 9000,  // 启动端口
        openPage : 'index.html', // 打开指定的页面
    },

    mode: 'development',
    entry: {
        main: `./src/index.js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude : /node_modules/,
            }
        ],
    },
    externals:{},

    plugins: [
        // copy 静态资源
        new CopyWebpackPlugin({
            patterns : [{
                from: path.resolve(__dirname, 'public'),
                to  : path.resolve(__dirname, 'dist')
            }],
            options : {}
        }),
        // 添加标识 署名
        new webpack.BannerPlugin(`
            TODO Team : 芯与科技 ● 行情交易部\n
            TODO Date : ${new Date().toLocaleDateString().split('/').join('-')}\n
            TODO Purpose : JS 模块方法
        `)
    ],
    // 出口
    output: {
        filename: 'com.tools.js',
        path: path.resolve(__dirname, 'dist'),
        library : 'Tools',
        libraryTarget: "umd"
    },
};
