import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'
import CampaignItem from './CampaignItem'

@observer
class CampaignList extends Component {
  store = new Store()

  componentWillMount () {
    this.store.get()
  }

  render () {
    return this.store.campaigns.map((c) => <CampaignItem key={c.id} campaign={c} />)
  }
}

export default CampaignList
