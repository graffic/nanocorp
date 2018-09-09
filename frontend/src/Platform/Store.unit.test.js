import Store from './Store'
import client from '../client'

jest.mock('../client')

beforeEach(() => {
  jest.resetModules()
})

test('get platform from campaign', async () => {
  client.request.mockReturnValueOnce(Promise.resolve({
    campaign: { platform: 'spam' }
  }))

  const store = new Store()
  expect(store.hasData).toEqual(false)

  await store.get(1, 'facebook')
  expect(store.platform).toEqual('spam')
  expect(store.hasData).toEqual(true)
})

test('failure getting campaigns', async () => {
  client.request.mockRejectedValue(new Error())

  const store = new Store()
  await store.get(42, 42)
  expect(store.error).toEqual(true)
})
