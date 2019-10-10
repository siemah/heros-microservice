var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
require("@babel/polyfill");

const DEBUG = 'development' ? true : false;


var browserConfig = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: '[name]-[hash].[ext]',
          limit: 10000,
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
  ]
}

var serverConfig = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/server/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: '[name]-[hash].[ext]',
          limit: 10000,
        },
      },
      // {
      //   test: /\.(eot|ttf|wav|mp3)$/,
      //   loader: 'file-loader',
      //   query: {
      //     name: DEBUG ? '[name]-[hash].[ext]',
      //   },
      // },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [browserConfig, serverConfig]