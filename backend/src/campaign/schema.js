// Construct a schema, using GraphQL schema language
const { gql } = require('apollo-server-core')

const types = gql`
"Campaign status"
enum Status {
  Delivering
  Ended
  Scheduled
}

"Ad campagin"
type Campaign {
  id: Int!
  name: String!
  goal: String!
  total_budget: Int!
  status: Status!
  platforms: [Platform]
}

type Platform {
  platform: String!
  status: Status!
  total_budget: Float!
  remaining_budget: Float!
  start_date: Int!
  end_date: Int!
  target_audiance: TargetAudience!
  creatives: Creative!
  insights: Insights!
}

type TargetAudience {
  languages: [Language]!
  genders: [Gender]!
  age_range:[Int]!
  locations: [Location]!
  interests: [String]!
}

enum Language {
  EN
  FR
  DE
}

enum Gender {
  M
  F
}

enum Location {
  France
  Germany
  Switzerland
}

type Creative {
  header: String!
  description: String!
  url: String!
  image: String!
}

type Insights {
  impressions: Int!
  clicks: Int!
  nanos_score: Float!
  cost_per_click: Float!
  click_through_rate: Float!
  advanced_kpi_1: Float!
  advanced_kpi_2: Float
}

type Query {
  campaigns: [Campaign]
  campaign(id: Int): Campaign
}`

module.exports = types
