const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports ={     
    entry: {main: './src/pages/index.js'},

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.[contenthash].js',  
      clean: true,
      publicPath: ''
    },

    plugins: [
        new HtmlWebpackPlugin({
         template: './src/index.html'
        }),
        new MiniCssExtractPlugin(
            {filename: 'style.[contenthash].css'}
        ),


    ],

    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080, 
        open: true 
      },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
                'postcss-loader'
              ]
              },

              {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
              },

            ]
          },
    }
