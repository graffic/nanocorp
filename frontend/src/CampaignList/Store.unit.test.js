import Store from './Store'
import client from '../client'

jest.mock('../client')

beforeEach(() => {
  jest.resetModules()
})

test('get campaigns', async () => {
  client.request.mockReturnValueOnce(Promise.resolve({
    campaigns: [{}, {}]
  }))

  const store = new Store()
  await store.get()
  expect(store.campaigns).toEqual([{}, {}])
})

test('failure getting campaigns', async () => {
  client.request.mockRejectedValue(new Error())

  const store = new Store()
  await store.get()
  expect(store.error).toEqual(true)
})
