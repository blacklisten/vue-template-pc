#! /usr/bin/env node
process.env.NODE_ENV = 'production'
const chalk = require('chalk')
const webpack = require('webpack')
const mainConf = require('./webpack.main.config')

function package() {
  console.log(chalk.blue.bold("building main ......"))
  webpack(mainConf, (err, state) => {
    if (err) console.log(chalk.red.bold(err))
    console.log(state.toString({
      chunks: false,
      colors: true
    }))
  })
}

package()
