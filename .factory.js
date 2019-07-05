const { resolve } = require('path')

module.exports = {
  model: resolve('src', 'models'),
  controller: resolve('src', 'controller'),
  route: resolve('src', 'routes.js')
}
