const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const bookRouter = require('./routes/books')

const authorizer = require('./middleware/authorizer')
const webpackDev = require('./middleware/webpackDev')
const {
  sequelizeImporter,
  sequelizeErrorHandler,
} = require('./middleware/sequelize')


const noAuth = (req, res, next) => next()

const createApp = (options) => {
  const {
    debug,
    webpackOptions,
    morganOptions,
    sequelizeOptions,
    authOptions,
  } = options

  const app = express()

  // Logger
  app.use(morgan(morganOptions.format, morganOptions))

  // Parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  // ORM
  app.use(sequelizeImporter(sequelizeOptions))

  // Health Check
  app.get('/health', (req, res) => {
    res.send('OK')
  })

  // Routes
  const auth = authOptions
    ? authorizer(authOptions)
    : noAuth

  app.use('/api/books', auth, bookRouter)

  // Built-in webpack-dev-server
  if (webpackOptions) {
    app.use(webpackDev(webpackOptions))
  }

  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // Error handlers
  app.use(sequelizeErrorHandler)

  /* eslint-disable-next-line no-unused-vars */
  app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).json({
        message: err.message,
      })
    } else {
      const data = { message: 'Internal Server Error' }
      console.log(err)
      if (debug) {
        data.error = {
          message: err.message,
          stack: err.stack,
        }
      }

      res.status(500).json(data)
    }
  })

  return app
}

module.exports = createApp
