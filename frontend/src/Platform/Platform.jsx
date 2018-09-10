/* eslint camelcase: ["off"] */
import { Link } from 'react-router-dom'
import React from 'react'
import { observer } from 'mobx-react'

/**
 * Converts a timestamp in milliseconds to UTC date string
 * @param {number} ts timestamp in milliseconds
 * @return {string}
 */
const toDate = (ts) => (new Date(ts)).toUTCString()

const platformInfo = (platform) =>
  <>
    <h1>Platform: {platform.type}</h1>
    <ul>
      <li>Status: {platform.status}</li>
      <li>Total budget: {platform.total_budget}</li>
      <li>Remaining budget: {platform.remaining_budget}</li>
      <li>Start: {toDate(platform.start_date)}</li>
      <li>End: {toDate(platform.end_date)}</li>
    </ul>
  </>

/**
 * To comma separated list
 * @param {array<string>} list List with strings
 */
const toCSL = (list) => list ? list.join(', ') : '--'

const targetAudience = (audience) =>
  <>
    <h2>Target Audience</h2>
    <ul>
      <li>Languages: {toCSL(audience.languages)}</li>
      <li>Genders: {toCSL(audience.genders)}</li>
      <li>Age range: {audience.age_range[0]} to {audience.age_range[0]}</li>
      <li>Locations: {toCSL(audience.locations)}</li>
      <li>Interests: {toCSL(audience.interests)}</li>
      <li>Keywords: {toCSL(audience.KeyWords)}</li>
    </ul>
  </>

const creatives = (creatives) =>
  <>
    <h2>Creatives</h2>
    <ul>
      <li>Headers: {toCSL(creatives.headers)}</li>
      <li>Description: {creatives.description}</li>
      <li><img src={`${process.env.NANOCORP_FRONTEND_CDN}${creatives.image}`} /></li>
    </ul>
  </>

const insights = (insights) =>
  <>
    <h2>Insights</h2>
    <ul>
      <li>Impressions: {insights.impressions}</li>
      <li>Clicks: {insights.clicks}</li>
      <li>Website visits: {insights.website_visits}</li>
      <li>Nanos score: {insights.nanos_score}</li>
      <li>CPC: {insights.cost_per_click}</li>
      <li>CTR: {insights.click_through_rate}</li>
      <li>KPI 1: {insights.advanced_kpi_1}</li>
      <li>KPI 2: {insights.advanced_kpi_2}</li>
    </ul>
  </>

/**
 * Platform information component
 */
const Platform = observer(({ platform }) => (
  <div>
    <Link to='/'>&lt; Back to campaign list</Link>
    {platformInfo(platform)}
    {targetAudience(platform.target_audiance)}
    {creatives(platform.creatives)}
    {insights(platform.insights)}
  </div>
))

export default Platform
