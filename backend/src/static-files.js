/**
 * @module
 * Sets up the serving of frontend static files(js, css,...)
 */
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const staticFiles = require('koa-static')
const config = require('./config')

module.exports = {
  applyMiddleware (app) {
    app.use(conditional())
    app.use(etag())
    const staticMiddleware = staticFiles(config.staticPath, {})
    app.use(staticMiddleware)
    // Fallback to / (index.html) in case static cannot find the file
    app.use(async (ctx, next) => {
      ctx.path = '/'
      await staticMiddleware(ctx, next)
    })
  }
}
