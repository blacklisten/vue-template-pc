const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')
const BabiliWebpackPlugin = require('babili-webpack-plugin')

const FILE_EXT = <%- options.classComponent ? '".ts"' : '".js"' %>
const entryFile = process.env.NODE_ENV === 'production' ? '/main' : '/main.dev'
let mainConfig = {
  entry: {
    main: path.join(__dirname, '../.electron-main', entryFile + FILE_EXT)
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../.electron-dist/main')
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.json', '.node', 'ts']
  },
  target: 'electron-main',
  mode: process.env.NODE_ENV
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = mainConfig