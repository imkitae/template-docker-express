// Inspired by https://github.com/Abazhenov/express-async-handler
const asyncHandler = (callback) => (
  function wrapper(...args) {
    const result = callback(...args)
    const next = args[args.length - 1]
    return Promise.resolve(result).catch(next)
  }
)

module.exports = asyncHandler
