/**
 * @module
 * Client for the GraphQL backend
 */
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  process.env.NANOCORP_FRONTEND_API_URL
)

export default client
