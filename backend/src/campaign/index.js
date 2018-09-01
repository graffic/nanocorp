const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./schema')
const resolvers = require('./resolver')

module.exports = makeExecutableSchema({ typeDefs, resolvers })
