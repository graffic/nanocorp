/**
 * @module
 * El cheapo cdn folder for static assets outside frontend
 */
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const staticFiles = require('koa-static')
const compose = require('koa-compose')
const mount = require('koa-mount')
const config = require('./config')

module.exports = {
  /**
   * Applies conditioan, etag and staticFiles on '/cdn'
   * @param {Koa} app The koa app to apply the middleware to
   */
  applyMiddleware (app) {
    const composed = compose([
      conditional(),
      etag(),
      staticFiles(config.cdnPath, { maxage: 2592000 })
    ])
    app.use(mount('/cdn', composed))
  }
}
