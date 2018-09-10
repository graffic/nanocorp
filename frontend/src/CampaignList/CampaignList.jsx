import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store from './Store'
import CampaignItem from './CampaignItem'
import Header from './Header'
import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);

  th {
    font-size: 18px;
    color: #fff;
    line-height: 1.4;
    background-color: #36304a;
  }

  td {
    font-size: 15px;
    color: #808080;
    line-height: 1.4;
    padding: 16px 0;
  }

  td:first-child {
    padding-left: 16px
  }

  td:last-child {
    padding-left: 16px
  }

  tr {
    border-bottom: 1px solid #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f8f6ff;
  }
`

const store = new Store()

/**
 * Shows a table with the list of campaigns and
 * coordinates the retrieval on mount
 */
@observer
class CampaignList extends Component {
  componentWillMount () {
    store.get()
  }

  render () {
    return (
      <>
        <h1>Campaign List</h1>
        <Table>
          <Header />
          <tbody>
            {store.campaigns.map((c) => <CampaignItem key={c.id} campaign={c} />)}
          </tbody>
        </Table>
      </>
    )
  }
}

export default CampaignList
