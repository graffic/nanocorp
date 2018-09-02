import { observable } from 'mobx'
import client from '../client'

class Store {
  @observable campaigns = []

  get () {
    return client.request(`{
      campaigns {
        id
        name
      }
    }`).then(({ campaigns }) => { this.campaigns = campaigns })
  }
}

export default Store
