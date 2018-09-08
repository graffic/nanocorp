import React from 'react'
const entries = ['Id', 'Name', 'Goal', 'Total Budget', 'Status', 'Platforms']

/**
 * Makes a slug from a name
 * @param {string} name Name to convert to slug
 */
function toSlug (name) {
  return name.toLowerCase().replace(' ', '_')
}

const Header = () => {
  const tds = entries.map((e) => {
    const slug = toSlug(e)
    return <th key={slug} className={slug}>{e}</th>
  })

  return <thead>
    <tr>
      {tds}
    </tr>
  </thead>
}

export default Header
