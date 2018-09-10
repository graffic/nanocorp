import React, { Component } from 'react'
import Store from './Store'
import Platform from './Platform'
import { observer } from 'mobx-react'

const store = new Store()

/**
 * Handles the retrieval of a platform when the component is mounted,
 * plus errors and loading screen.
 */
@observer
class Container extends Component {
  componentDidMount () {
    const { campaignId, platformType } = this.props.match.params
    store.get(parseInt(campaignId), platformType)
  }

  render () {
    if (store.error) return (<h1>Error Loading</h1>)
    if (!store.hasData) return (<h3>Loading...</h3>)
    return (<Platform platform={store.platform} />)
  }
}

export default Container
