/**
 * @module
 * Backend configuration:
 *
 * NANOCORP_BACKEND_PORT the server will listen on this port.
 * NANOCORP_BACKEND_STATIC_PATH from where to serve static files.
 */
const ENV_PREFIX = 'NANOCORP_BACKEND'
const env = new (require('./environment'))(ENV_PREFIX)

module.exports = {
  port: env.getInt('PORT', 4000),
  staticPath: env.getString('STATIC_PATH', '../frontend/dist/')
}
