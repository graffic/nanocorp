const { expect } = require('chai')
const app = require('../src')
const { request } = require('graphql-request')

describe('Service tests', () => {
  let server
  before((done) => {
    server = app.listen(null, done)
  })

  const appAddress = () => `http://localhost:${server.address().port}/graphql`

  it('Query campaigns', async () => {
    const { campaigns } = await request(appAddress(), `{
      campaigns {
        name
      }
    }`)
    expect(campaigns).to.have.lengthOf(3)
  })

  it('Query campaigns with platform', async () => {
    const { campaigns } = await request(appAddress(), `{
      campaigns {
        name
        platforms {
          platform
        }
      }
    }`)
    expect(campaigns[0].platforms).to.have.lengthOf(3)
  })

  it('Queries one campaign', async () => {
    const { campaign } = await request(appAddress(), `{
      campaign(id: 100000001) {
        name
      }
    }`)
    expect(campaign.name).to.be.equal('Test Ad 1')
  })

  after((done) => server.close(done))
})
