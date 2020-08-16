const path = require('path')

const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const env = {
  ENVIRONMENT: process.env.ENVIRONMENT,
  ...dotenv.config().parsed,
}

const envKeys = Object.entries(env)
  .reduce((prev, [key, value]) => ({
    ...prev,
    [`process.env.${key}`]: JSON.stringify(value),
  }), {})

const isProduction = process.env.ENVIRONMENT === 'production'

module.exports = () => ({
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'cheap-source-map' : 'eval-cheap-module-source-map',
  target: 'web',
  entry: {
    index: [path.join(__dirname, 'src/client/index.jsx')],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        resolve: { extensions: ['.js', '.jsx'] },
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        resolve: { extensions: ['.js', '.jsx'] },
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash:8].js',
  },
})
