import React from 'react'
import styled from 'styled-components'

/**
 * Header title component
 */
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`

/**
 * Header banner-like component
 */
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
