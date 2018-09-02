import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CampaignList from './CampaignList'
import Platform from './Platform'

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={CampaignList} />
      <Route path='/campaign/:id/:platform' component={Platform} />
    </div>
  </Router>
)

export default App
