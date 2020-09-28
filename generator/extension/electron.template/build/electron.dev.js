#! /usr/bin/env node

const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { say } = require('cfonts')
const { spawn } = require('child_process')
const webpack = require('webpack')
const mainConfig = require('./webpack.main.config')

let electronProcess = null
let manualRestart = false

function logStats(proc, data) {
  let log = ''

  log += chalk.yellow.bold(`\n「 ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`${new Array(28 + 1).join('-')}」`) + '\n'

  console.log(log)
}

function startMain() {
  return new Promise((resolve, reject) => {
    process.env.NODE_ENV = 'development'
    const compiler = webpack(mainConfig)
    compiler.hooks.watchRun.tap('all', (compilation) => {
      logStats('Main', chalk.white.bold('compiling...'))
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      logStats('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
      resolve()
    })
  })
}

function startElectron() {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../.electron-dist/main/main.js')])

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog(data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('「 Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('----------------------------」') +
      '\n'
    )
  }
}

function greeting() {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 104) text = 'vision'
  else text = false

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}

function init() {
  greeting()

  Promise.all([startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

exports.initMain = init
exports.logStats = logStats
