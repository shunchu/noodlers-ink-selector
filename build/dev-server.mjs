import './check-versions.js'

import config from '../config.js'
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

import opn from 'opn'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import { createProxyMiddleware } from 'http-proxy-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const webpackConfig = process.env.NODE_ENV === 'testing'
  ? await import('./webpack.prod.conf.mjs')
  : await import('./webpack.dev.conf.mjs')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
})

// force page reload when html-webpack-plugin template changes
compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', compilation => {
  // Modern HTML Webpack Plugin
  if (compilation.hooks.htmlWebpackPluginAfterEmit) {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap('AfterEmitPlugin', () => {
      hotMiddleware.publish({ action: 'reload' })
    })
  } else {
    // For html-webpack-plugin 4.x and above
    const HtmlWebpackPlugin = await import('html-webpack-plugin')
    const hooks = HtmlWebpackPlugin.getHooks(compilation)
    
    hooks.afterEmit.tapAsync('AfterEmitPlugin', (data, callback) => {
      hotMiddleware.publish({ action: 'reload' })
      callback()
    })
  }
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(createProxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

export {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
