const path = require('path'),
      webpack = require('webpack'),
      uglify = require('uglifyjs-webpack-plugin'), //压缩js的
      htmlWebpackPlugin = require('html-webpack-plugin'), //压缩html
      autoprefixer = require('autoprefixer'), //给一些样式自动加前缀
      cleanWebpackPlugin = require('clean-webpack-plugin'); //每次打包清除一些会重新生成的文件

module.exports = {
    mode: 'development',//开发的时候用development，发布的时候记得换成production，这样打包的代码会去掉注释
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        detail: path.resolve(__dirname, './src/js/detail.js'),
        cart: path.resolve(__dirname, './src/js/cart.js')
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/[name]-[hash].js'
        //publicPath: "./"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'), //表示node_modules文件夹里的内容不让babel处理
            query: {
                "presets": ["latest"]
            }
        }, {
            test: /\.tpl$/,
            loader: 'ejs-loader'
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [autoprefixer('last 5 versions')]
                    }
                }
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [autoprefixer('last 5 versions')]; //表示兼容浏览器最新五个版本就行
                    }
                }
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.(png|jpg|jpeg|gif|ico)$/i,
            loader: [
                'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                'image-webpack-loader'
            ]
        }]
    },
    plugins: [
        new uglify(),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true, //去掉注释
                collapseWhitespace: true //去掉回车空格
            },
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'), //打包所依赖的html模版
            title: '商品列表',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'], //打包的时候排除掉node_modules文件夹
            chunks: ['index'], //打包的时候自动引入index.js
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'detail.html',
            template: path.resolve(__dirname, 'src/detail.html'),
            title: '商品详情页',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            chunks: ['detail'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            filename: 'cart.html',
            template: path.resolve(__dirname, 'src/cart.html'),
            title: '商品购物车',
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            chunks: ['cart'],
            hash: true
        }),
        new cleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/js/*.js', '**/*.html', '**/img/*']
        })
    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        host: 'localhost',
        port: 3300
    }
}

// module.exports = config;