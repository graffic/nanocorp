import { Link } from 'react-router-dom'
import React from 'react'

const Platform = ({ platform }) => (
  <div>
    <code>{JSON.stringify(platform)}</code>
    <Link to='/'>Back</Link>
  </div>
)

export default Platform
