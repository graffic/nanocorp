const { expect } = require('chai')
const Environment = require('../src/environment')

describe('Environment', () => {
  let env
  const TEST_KEY = 'TEST_BACKEND_TEST_KEY'

  beforeEach(() => { env = new Environment('TEST_BACKEND') })
  afterEach(() => delete process.env[TEST_KEY])

  it('gets an integer', () => {
    process.env[TEST_KEY] = '2'

    expect(env.getInt('TEST_KEY')).to.be.equal(2)
  })

  it('fallbacks an integer', () => {
    expect(env.getInt('TEST_KEY', 2)).to.be.equal(2)
  })

  it('gets a string', () => {
    process.env[TEST_KEY] = 'eggs'

    expect(env.getString('TEST_KEY')).to.be.equal('eggs')
  })

  it('fallbacks a string', () => {
    expect(env.getString('TEST_KEY', 'bacon')).to.be.equal('bacon')
  })
})
