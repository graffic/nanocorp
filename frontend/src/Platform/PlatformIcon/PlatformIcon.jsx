import React from 'react'
import styled from 'styled-components'
const platforms = new Map([
  ['facebook', require('./facebook.svg')],
  ['instagram', require('./instagram.svg')],
  ['google', require('./google.svg')]
])

const getSrc = (platform) =>
  platforms.has(platform) ? platforms.get(platform) : require('./unknown.svg')

const small = `
    width: 20px;
    height: 20px;
    padding: 2px;
`

const big = `
    width: 64px;
    height: 64px;
    padding: 6px;
`

const StyledImg = styled.img`
    ${props => props.small ? small : big}
`

const PlatformIcon = ({ small, platform }) => (<StyledImg small={small} src={getSrc(platform)} />)

export default PlatformIcon
