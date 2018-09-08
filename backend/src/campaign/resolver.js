const data = require('../../../db/data.json')

module.exports = {
  Query: {
    campaigns: () => data,
    campaign: (_, { id: givenId }) =>
      data.find(({ id }) => id === givenId)
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
