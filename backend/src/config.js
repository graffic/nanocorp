/**
 * @module
 * Backend configuration:
 *
 * NANOCORP_BACKEND_PORT the server will listen on this port.
 * NANOCORP_BACKEND_STATIC_PATH from where to serve static files.
 * NANOCORP_BACKEND_CDN_PATH file path to server static assets
 * NANOCORP_BACKEND_MONGO_URL where to find the mongodb server
 * NANOCORP_BACKEND_MONGO_DB database name
 */
const ENV_PREFIX = 'NANOCORP_BACKEND'
const env = new (require('./environment'))(ENV_PREFIX)

module.exports = {
  port: env.getInt('PORT', 4000),
  staticPath: env.getString('STATIC_PATH', '../frontend/dist/'),
  cdnPath: env.getString('CDN_PATH', 'cdn/'),
  mongoUrl: env.getString('MONGO_URL', 'mongodb://localhost:27017'),
  mongoDb: env.getString('MONGO_DB', 'nanos_assessment')
}
