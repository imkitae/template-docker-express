const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')


const sequelizeImporter = (options) => {
  const sequelize = new Sequelize(options)

  let models = {}
  if (options.importPath) {
    models = fs.readdirSync(options.importPath)
      .filter((file) => (
        file.indexOf('.') !== 0
        && file.slice(-3) === '.js'
      ))
      .reduce((prev, file) => {
        const model = sequelize.import(path.join(options.importPath, file))

        return {
          ...prev,
          [model.name]: model,
        }
      }, {})

    Object.keys(models).forEach((modelName) => {
      if (models[modelName].associate) {
        models[modelName].associate(models)
      }
    })

    if (options.sync) {
      sequelize.sync()
    }
  }

  return (req, res, next) => {
    if (!req.models) {
      req.models = models
    }

    if (!req.sequelize) {
      req.sequelize = sequelize
    }

    next()
  }
}

const sequelizeErrorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeEmptyResultError':
    {
      const notFound = new Error('Not Found')
      notFound.status = 404
      next(notFound)
      return
    }
    case 'SequelizeValidationError':
    {
      const badRequest = new Error('Bad Request')
      badRequest.status = 400
      next(badRequest)
      return
    }
    default:
      next(err)
  }
}

module.exports = {
  sequelizeImporter,
  sequelizeErrorHandler,
}
