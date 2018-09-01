/**
 * @module
 * Backend configuration:
 *
 * NANOCORP_BACKEND_PORT the server will listen on this port.
 */
const ENV_PREFIX = 'NANOCORP_BACKEND_'

/**
 * Get an integer from the environment.
 * @param {string} key Environment key to search for
 * @param {number} fallback Fallback value
 */
function getInt (key, fallback) {
  const res = parseInt(process.env[`${ENV_PREFIX}${key}`])
  return isNaN(res) ? fallback : res
}

module.exports = {
  port: getInt('PORT', 4000)
}
