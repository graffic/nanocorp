import Store from './Store'

jest.mock('../client')

test('get', async () => {
  const store = new Store()
  await store.get()
  expect(store.campaigns).toEqual([{}, {}])
})
