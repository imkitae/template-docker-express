const url = require('url')


// Implement the belows in your own way
const authenticate = () => 'some_user_id'
const authorize = () => {}

const authorizer = (options) => {
  if (!options.foo) {
    return (req, res, next) => next()
  }

  return async (req, res, next) => {
    const token = req.cookies.TokenCookieName

    try {
      if (!req.userId) {
        req.userId = await authenticate(token)
      }

      await authorize(req.userId, url.parse(req.originalUrl).pathname)
    } catch (e) {
      switch (e.name) {
        case 'NoTokenException':
        case 'MalformedTokenException':
        case 'ExpiredTokenException':
        {
          const unauthorized = new Error('Unauthorized')
          unauthorized.status = 401
          next(unauthorized)
          break
        }
        case 'UnauthorizedException':
        {
          const forbidden = new Error('Forbidden')
          forbidden.status = 403
          next(forbidden)
          break
        }
        default:
          next(e)
      }
    }
  }
}

module.exports = authorizer
