/**
 * @module
 * koa-mongo lazy wrapper. It only acquires a connection when needed
 * Based on: https://github.com/nswbmw/koa-mongo
 */
const { MongoClient } = require('mongodb')
const debug = require('debug')('app.mongo')
const genericPool = require('generic-pool')

/**
 * Default koa handler options
 */
const defaultOptions = {
  url: 'mongodb://localhost:27017',
  pool: {
    max: 100,
    min: 1
  }
}

/**
 * Creates the mongo koa handler
 * @param {object} options mongo url and pool options
 */
module.exports = function mongo (options) {
  const { url, pool } = Object.assign({}, defaultOptions, options)

  const mongoPool = genericPool.createPool({
    create: () => {
      debug('Create client')
      return MongoClient.connect(url, { useNewUrlParser: true })
    },
    destroy: client => {
      debug('Destroying client')
      return client.close()
    }
  }, pool)

  async function release (resource) {
    await mongoPool.release(resource)
    debug('Release one connection (min: %s, max: %s, poolSize: %s)', pool.min, pool.max, mongoPool.size)
  }

  async function koaMongo (ctx, next) {
    let mongoConnection = false
    ctx.getMongoConnection = async () => {
      if (mongoConnection) return mongoConnection

      mongoConnection = await mongoPool.acquire()
      debug('Acquired one connection (min: %s, max: %s, poolSize: %s)', pool.min, pool.max, mongoPool.size)
      return mongoConnection
    }
    await next()
    if (mongoConnection) {
      await release(mongoConnection)
    }
  }

  koaMongo.shutdown = function shutdown () {
    debug('Shutdown pool')
    return mongoPool.drain().then(() => mongoPool.clear())
  }

  return koaMongo
}
