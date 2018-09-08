const Koa = require('koa')
const logger = require('koa-logger')
const { ApolloServer } = require('apollo-server-koa')
const staticFiles = require('./static-files')
const schema = require('./campaign')

const apollo = new ApolloServer({ schema })

const app = new Koa()
app.use(logger())
apollo.applyMiddleware({ app })
staticFiles.applyMiddleware(app)

module.exports = app
