/**
 * @module
 * GraphQL full schema
 */
const { gql } = require('apollo-server-core')

const types = gql`
"Campaign status"
enum Status {
  Delivering
  Ended
  Scheduled
}

enum PlatformType {
  facebook
  instagram
  google
}

"Ad campagin"
type Campaign {
  id: Int!
  name: String!
  goal: String!
  total_budget: Int!
  status: Status!
  platforms: [Platform]
  platform(type: PlatformType): Platform
}

type Platform {
  type: PlatformType!
  status: Status!
  total_budget: Float!
  remaining_budget: Float!
  start_date: Float!
  end_date: Float!
  target_audiance: TargetAudience!
  creatives: Creative!
  insights: Insights!
}

type TargetAudience {
  languages: [Language]!
  genders: [Gender]!
  age_range:[Int]!
  locations: [String]!
  interests: [String]
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

type Creative {
  headers: [String]! 
  description: String!
  url: String!
  image: String!
}

type Insights {
  impressions: Int!
  clicks: Int!
  nanos_score: Float
  website_visits: Int
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
