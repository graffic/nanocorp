import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Header, MainContent } from './widgets'
import CampaignList from './CampaignList'
import Platform from './Platform'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'

const Body = styled.div`
  font-family: ${props => props.theme.fontFamily};
`

/**
 * App main component with theme, router and routes
 */
const App = () => (
  <ThemeProvider theme={theme}>
    <Body>
      <Header />
      <Router>
        <MainContent>
          <Route exact path='/' component={CampaignList} />
          <Route path='/campaign/:campaignId/:platformType' component={Platform} />
        </MainContent>
      </Router>
    </Body>
  </ThemeProvider>
)

export default App
