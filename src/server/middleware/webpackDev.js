const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')


const webpackDev = (options) => {
  options.entry.index.unshift('webpack-hot-middleware/client?reload=true&timeout=1000')
  options.plugins.push(new webpack.HotModuleReplacementPlugin())

  const compiler = webpack(options)

  return [
    history({
      index: options.output.publicPath,
    }),
    webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: options.output.publicPath,
    }),
    webpackHotMiddleware(compiler),
  ]
}

module.exports = webpackDev
