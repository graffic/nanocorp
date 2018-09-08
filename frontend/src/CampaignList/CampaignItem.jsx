import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PlatformIcon from '../Platform/PlatformIcon/PlatformIcon'

class CampaignItem extends Component {
  render () {
    const { campaign } = this.props

    const links = campaign.platforms.map(({ type }) =>
      <Link key={type} to={`/campaign/${campaign.id}/${type}`}>
        <PlatformIcon small platform={type} />
      </Link>)

    return (<tr key={campaign.id}>
      <td>{campaign.id}</td>
      <td>{campaign.name}</td>
      <td>{campaign.goal}</td>
      <td>{campaign.total_budget}</td>
      <td>{campaign.status}</td>
      <td>{links}</td>
    </tr>)
  }
}

export default CampaignItem
