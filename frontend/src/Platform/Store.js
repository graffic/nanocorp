import { observable } from 'mobx'
import client from '../client'

class Store {
  @observable platform = { }
  @observable error = false
  @observable hasData = false

  get (campaignId, platformType) {
    this.hasData = false
    this.error = false

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
        KeyWords
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
        website_visits
        nanos_score
        cost_per_click
        click_through_rate
        advanced_kpi_1
        advanced_kpi_2
      }
    }
  }
}`, { campaignId, platformType })
      .then(({ campaign: { platform } }) => {
        this.platform = platform
        this.hasData = true
      })
      .catch(() => {
        this.error = true
      })
  }
}

export default Store
