var path = require('path')
var webpack = require('webpack')
var extend = require('extend')
var nodeExternals = require('webpack-node-externals')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
require("@babel/polyfill");

const DEBUG = 'development' ? true : false;
const config = {
  context: path.resolve(__dirname, './src'),
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    sourcePrefix: '  ',
  },
}

var browserConfig = {
  mode: 'development',
  entry: ['@babel/polyfill', './client/index.js'],
  output: {
    publicPath: '/',
    filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
  },

  target: 'web',

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
  entry: ['@babel/polyfill', './server/index.js'],
  externals: [nodeExternals()],
  output: {
    filename: '../server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/',
    // path: '/build/',
  },

  target: 'node',
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

module.exports = [
  extend(true, {}, config, browserConfig), 
  extend(true, {}, config, serverConfig)
]