const path = require('path');
//  引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",

        environment:{
            arrowFunction: false
        }
    },

    module: {
        //指定加载规则
        rules: [
            {
            test: /\.ts$/,
            use: [
                //配置babel
                {
                    loader: "babel-loader",
                    options: {
                        //设置预定义环境
                        presets:[
                            [
                                //指定环境插件
                                "@babel/preset-env",
                                //配置信息
                                {
                                    //要兼容的目标浏览器
                                    targets: {
                                        "chrome": "88"
                                    },
                                    //指定corejs的版本
                                    "corejs": "3",
                                    //使用corejs的方法,按需加载
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            exclude: /node-moudles/
            },

            //设置less文件的处理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }

        ]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/index.html"
        }),
    ],


    //设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }


};