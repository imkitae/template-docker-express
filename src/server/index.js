const path = require('path')
const http = require('http')
const fs = require('fs')

const webpackOptions = require('../../webpack.config')()
const createApp = require('./createApp')


const {
  ENVIRONMENT,
  EXPRESS_SOCKET,
  EXPRESS_PORT,
  EXPRESS_WEBPACK_DEV,
  DB_TYPE,
  DB_HOST,
  DB_DBNAME,
  DB_USER,
  DB_PASSWORD,
  AUTH_VALUE_1,
  AUTH_VALUE_2,
} = process.env

const sequelizeOptions = {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DBNAME,
  dialect: DB_TYPE,
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: (field, next) => (field.type === 'DATETIME' ? field.string() : next()),
  },
  timezone: 'Asia/Seoul',
  importPath: path.join(__dirname, './models'),
  sync: false,
}

if (!DB_TYPE || DB_TYPE === 'sqlite') {
  sequelizeOptions.host = sequelizeOptions.host || ':memory'
  sequelizeOptions.dialect = 'sqlite'
  sequelizeOptions.sync = true

  // Setting a custom timezone is not supported by SQLite
  delete sequelizeOptions.timezone
}

const authOptions = {
  foo: AUTH_VALUE_1,
  bar: AUTH_VALUE_2,
}

const app = createApp({
  debug: ENVIRONMENT !== 'production',
  morganOptions: {
    format: 'common',
  },
  webpackOptions: EXPRESS_WEBPACK_DEV ? webpackOptions : null,
  authOptions: AUTH_VALUE_1 ? authOptions : null,
  sequelizeOptions,
})

const server = http.createServer(app)

if (EXPRESS_SOCKET) {
  fs.stat(EXPRESS_SOCKET, (err) => {
    if (!err) {
      fs.unlinkSync(EXPRESS_SOCKET)
    }

    server.listen(EXPRESS_SOCKET, () => {
      fs.chmodSync(EXPRESS_SOCKET, '777')
      console.log(`Running on unix:${EXPRESS_SOCKET}`)
    })
  })
} else {
  server.listen(EXPRESS_PORT, '0.0.0.0', () => {
    console.log(`Running on TCP 0.0.0.0:${EXPRESS_PORT}`)
  })
}
