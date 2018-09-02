import React from 'react'
import Platform from './Platform'
import { Link } from 'react-router-dom'

const Container = ({ match: { params } }) => <>
  <Platform platform={params} />
  <Link to='/'>back</Link>
</>

export default Container
