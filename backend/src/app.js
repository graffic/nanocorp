/**
 * @module
 * Creates a KOA app with the right middleware
 */
const Koa = require('koa')
const logger = require('koa-logger')
const { ApolloServer } = require('apollo-server-koa')
const mongo = require('./mongo')
const staticFiles = require('./static-files')
const schema = require('./campaign')

/**
 * Builds the assessment koa app with middlewares
 * @return {Koa} The koa app
 */
module.exports = function buildApp () {
  const apollo = new ApolloServer({
    schema,
    context: ({ ctx }) => ctx
  })

  const app = new Koa()
  app.use(logger())
  app.use(mongo())
  apollo.applyMiddleware({ app })
  staticFiles.applyMiddleware(app)

  return app
}
