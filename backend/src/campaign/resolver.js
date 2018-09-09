/**
 * @module
 * GraphQL resolvers.
 * These resolvers work on data from a mongodb connection
 */
const { mongoDb } = require('../config')

/**
 * Get the mongo collection 'campaigns'
 * @param {Object} context GraphQL context
 * @param {function} context.getMongoConnection Gives a mongo connection back.
 */
const campaigns = async ({ getMongoConnection }) =>
  (await getMongoConnection()).db(mongoDb).collection('campaigns')

module.exports = {
  Query: {
    campaigns: async (_, _args, ctx) =>
      (await campaigns(ctx)).find().sort({ id: 1 }).toArray(),
    campaign: async (_, { id: givenId }, ctx) =>
      (await campaigns(ctx)).findOne({ id: givenId })
  },
  Campaign: {
    platforms: ({ platforms }) => Object
      .entries(platforms)
      .map(([type, platform]) => Object.assign({ type }, platform)),
    platform: ({ platforms }, { type }) => platforms[type]
      ? Object.assign({ type }, platforms[type])
      : null
  },
  Creative: {
    headers: (creative) => creative.header
      ? [creative.header]
      : [creative.header_1, creative.header_2]
  }
}
