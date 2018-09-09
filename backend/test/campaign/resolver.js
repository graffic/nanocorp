const { expect } = require('chai')
const { Creative, Campaign } = require('../../src/campaign/resolver')

describe('Campaign resolver', () => {
  describe('Campaign', () => {
    const campaign = { platforms: { spam: { eggs: 42 } } }
    it('Assigns key to platforms', () => {
      const platforms = Campaign.platforms(campaign)
      expect(platforms).to.deep.equal([{ type: 'spam', eggs: 42 }])
    })
    it('Finds a platform', () => {
      const platform = Campaign.platform(campaign, { type: 'spam' })
      expect(platform).to.deep.equal({ type: 'spam', eggs: 42 })
    })
    it('Returns null on no platform found', () => {
      const platform = Campaign.platform(campaign, { type: 'eggs' })
      expect(platform).to.be.a('null')
    })
  })
  describe('Creative', () => {
    it('One header', () => {
      const headers = Creative.headers({ header: 'Hey jude' })
      expect(headers).to.deep.equal(['Hey jude'])
    })

    it('Two headers', () => {
      const headers = Creative.headers({ header_1: 'Hey', header_2: 'jude' })
      expect(headers).to.deep.equal(['Hey', 'jude'])
    })
  })
})
