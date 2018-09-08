const { expect } = require('chai')
const { Creative } = require('../../src/campaign/resolver')

describe('Campaign resolver', () => {
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
