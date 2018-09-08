import { observable } from 'mobx'
import client from '../client'

class Store {
  @observable platform = {}
  @observable error = false

  get (campaignId, platformType) {
    return client.request(`
query Campaign($campaignId: Int!, $platformType: PlatformType!) {
  campaign(id: $campaignId) {
    platform(type: $platformType) {
      type
      status
      total_budget
      remaining_budget
      start_date
      end_date
      target_audiance {
        languages
        genders
        age_range
        locations
        interests
      }
      creatives {
        headers
        description
        url
        image
      }
      insights{
        impressions
        clicks
        nanos_score
        cost_per_click
        click_through_rate
        advanced_kpi_1
        advanced_kpi_2
      }
    }
  }
}`, { campaignId, platformType })
      .then(({ campaign: { platform } }) => { this.platform = platform })
      .catch(() => { this.error = true })
  }
}

export default Store
