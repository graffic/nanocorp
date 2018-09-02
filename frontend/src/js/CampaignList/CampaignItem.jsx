import React from 'react'
import { Link } from 'react-router-dom'

const CampaignItem = ({ campaign }) => <>
  <h2>Potato {campaign.name}</h2>
  <Link to={`/campaign/${campaign.id}/facebook`}>Facebook</Link>
</>

export default CampaignItem
