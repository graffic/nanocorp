/**
 * @module
 * Client for the GraphQL backend.
 *
 * It is already configure with the right url for the backend.
 */
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  process.env.NANOCORP_FRONTEND_API_URL
)

export default client
