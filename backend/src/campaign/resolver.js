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
      .map(([key, value]) => Object.assign({ platform: key }, value))
  }
}
