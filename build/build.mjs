import './check-versions.js'

process.env.NODE_ENV = 'production'

import ora from 'ora'
import { rimraf } from 'rimraf'
import path from 'path'
import chalk from 'chalk'
import webpack from 'webpack'
import config from '../config.js'
import webpackConfig from './webpack.prod.conf.mjs'

const spinner = ora('building for production...')
spinner.start()

// Use async/await with rimraf
async function build() {
  try {
    // Remove the assets directory
    await rimraf(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
    
    // Build with webpack
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  } catch (err) {
    spinner.stop()
    console.error(err)
    process.exit(1)
  }
}

build()
