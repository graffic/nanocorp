/**
 * Access environment variables under a prefix
 */
class Environment {
  /**
   * Creates a new environment access tool.
   * @param {string} prefix Prefix for environment variables
   */
  constructor (prefix) {
    this.prefix = prefix
  }

  /**
   * Get a configuration key from the environment
   * @param {string} key key name (a prefix will be added)
   * @returns {(string|undefined)}
   */
  getKey (key) {
    return process.env[`${this.prefix}_${key}`]
  }

  /**
   * Get an integer from the environment.
   * @param {string} key Environment key to search for
   * @param {number} fallback Fallback value
   * @returns {number}
   */
  getInt (key, fallback) {
    const res = parseInt(this.getKey(key))
    return isNaN(res) ? fallback : res
  }

  /**
   * Get a string from environment
   * @param {string} key Environment key to search for
   * @param {*} fallback Fallback value
   * @returns {string}
   */
  getString (key, fallback) {
    return this.getKey(key) || fallback
  }
}

module.exports = Environment
