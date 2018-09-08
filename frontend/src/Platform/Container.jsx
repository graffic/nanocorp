import React, { Component } from 'react'
import Store from './Store'
import Platform from './Platform'
import { observer } from 'mobx-react'

const store = new Store()

@observer
class Container extends Component {
  componentDidMount () {
    const { campaignId, platformType } = this.props.match.params
    store.get(parseInt(campaignId), platformType)
  }

  render () {
    return (<Platform platform={store.platform} />)
  }
}

export default Container
