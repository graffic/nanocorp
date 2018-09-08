import { observable } from 'mobx'
import client from '../client'

class Store {
  @observable campaigns = []
  @observable error = false

  get () {
    return client.request(`{
      campaigns {
        id
        name
        goal
        total_budget
        status
        platforms {
          type
        }
      }
    }`).then(({ campaigns }) => { this.campaigns = campaigns })
      .catch(() => { this.error = true })
  }
}

export default Store
