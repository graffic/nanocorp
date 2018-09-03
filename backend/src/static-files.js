const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const staticFiles = require('koa-static')
const config = require('./config')

module.exports = {
  applyMiddleware (app) {
    app.use(conditional())
    app.use(etag())
    app.use(staticFiles(config.staticPath, {}))
  }
}
