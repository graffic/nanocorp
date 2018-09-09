import React from 'react'
import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.header`
  padding: 0.2em;
  background: ${props => props.theme.banner.bgColor};
  color: ${props => props.theme.banner.color};
  margin-bottom: 1em;
`

function Header () {
  return (<Wrapper>
    <Title>Nanos.ai Assessment</Title>
  </Wrapper>)
}

export default Header
