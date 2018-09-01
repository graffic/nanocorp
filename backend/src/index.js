const config = require('./config')
const log = require('./log')
const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const schema = require('./campaign')

const apollo = new ApolloServer({ schema })

const app = new Koa()
apollo.applyMiddleware({ app })

if (require.main === module) {
  const server = app.listen(config.port, () =>
    log.info(`🚀 Server ready at http://localhost:${server.address().port}`)
  )
}

module.exports = app
