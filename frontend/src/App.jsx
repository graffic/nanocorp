import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './widgets/Header'
import CampaignList from './CampaignList'
import Platform from './Platform'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'

const Body = styled.div`
  font-family: ${({ theme }) => theme.fontFamily}
`

const App = () => (
  <ThemeProvider theme={theme}>
    <Body>
      <Header />
      <Router>
        <>
          <Route exact path='/' component={CampaignList} />
          <Route path='/campaign/:campaignId/:platformType' component={Platform} />
        </>
      </Router>
    </Body>
  </ThemeProvider>
)

export default App
