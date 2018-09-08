import React from 'react'

const CampaignDetails = ({ campaign }) => (
  <ul>
    <li>Id: {campaign.id}</li>
    <li>Name: {campaign.name}</li>
    <li>Goal: {campaign.goal}</li>
    <li>Total budget: {campaign.total_budget}</li>
    <li>Status: {campaign.status}</li>
  </ul>
)

export default CampaignDetails
