/**
 * @module
 * Service tests. Test the entire service.
 *
 * These tests require a mongo server listening on localhost:27017 with
 * the nanos_assessment database
 */
const config = require('../src/config')
config.staticPath = config.cdnPath = 'test/fixtures'

const { expect } = require('chai')
const buildApp = require('../src/app')
const { request } = require('graphql-request')

describe('Whole service tests', () => {
  let server, app
  before((done) => {
    app = buildApp()
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
        id
        name
        platforms {
          type
        }
      }
    }`)
    const campaignOne = campaigns.find(c => c.id === 100000001)
    expect(campaignOne.platforms).to.have.lengthOf(3)
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

  it('Serves static files on cdn path', async () => {
    const axios = require('axios')
    const response = await axios.get(`${appAddress()}/cdn/bacon`)
    expect(response.data).to.be.equal('eggs')
  })

  after((done) => {
    server.close(() => {
      app.middleware.find(({ name }) => name === 'koaMongo')
        .shutdown()
        .then(() => done())
    })
  })
})
