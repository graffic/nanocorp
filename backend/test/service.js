/**
 * @module
 * Service tests. Test the entire service.
 */
process.env['NANOCORP_BACKEND_STATIC_PATH'] = 'test/fixtures'

const { expect } = require('chai')
const app = require('../src/app')
const { request } = require('graphql-request')

describe('Whole service tests', () => {
  let server
  before((done) => {
    server = app.listen(null, done)
  })

  const appAddress = () => `http://localhost:${server.address().port}`
  const gqlAddress = () => `${appAddress()}/graphql`

  it('Query campaigns', async () => {
    const { campaigns } = await request(gqlAddress(), `{
      campaigns {
        name
      }
    }`)
    expect(campaigns).to.have.lengthOf(3)
  })

  it('Query campaigns with platforms', async () => {
    const { campaigns } = await request(gqlAddress(), `{
      campaigns {
        name
        platforms {
          type
        }
      }
    }`)
    expect(campaigns[0].platforms).to.have.lengthOf(3)
  })

  it('Queries one campaign', async () => {
    const { campaign } = await request(gqlAddress(), `{
      campaign(id: 100000001) {
        name
      }
    }`)
    expect(campaign.name).to.be.equal('Test Ad 1')
  })

  it('Queries one campaign with one platform', async () => {
    const { campaign } = await request(gqlAddress(), `{
      campaign(id: 100000001) {
        name
        platform(type: google) {
          type
        }
      }
    }`)
    expect(campaign.name).to.be.equal('Test Ad 1')
  })

  it('Serves static files', async () => {
    const axios = require('axios')
    const response = await axios.get(`${appAddress()}/bacon`)
    expect(response.data).to.be.equal('eggs')
  })

  it('Serves index.html on not found', async () => {
    const axios = require('axios')
    const response = await axios.get(`${appAddress()}/ladened/swallow`)
    expect(response.data).to.be.equal('spam')
  })

  after((done) => server.close(done))
})
