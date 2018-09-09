import Platform from './Platform'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

const platform = {
  'status': 'Delivering',
  'total_budget': 40,
  'remaining_budget': 12,
  'start_date': 1530568800000,
  'end_date': 1532901600000,
  'target_audiance': {
    'languages': ['FR', 'EN', 'DE'],
    'genders': ['M', 'F'],
    'age_range': [20, 66],
    'locations': [
      'France',
      'Germany'
    ],
    'interests': [
      'Docker',
      'Kubernates'
    ]
  },
  'creatives': {
    'header': 'DevOps Made Easy, We Take care of the heavy lifting for you',
    'description': 'DOP SuperHero is where all DevOps is going to happen in the future, join the revolution today!',
    'url': 'https://example.io',
    'image': 'img1.jpg'
  },
  'insights': {
    'impressions': 4503,
    'clicks': 328,
    'nanos_score': 5.7,
    'cost_per_click': 0.88,
    'click_through_rate': 0.09,
    'advanced_kpi_1': 44.5,
    'advanced_kpi_2': 0.0023
  }
}

test('Renders', () => {
  const renderer = new ShallowRenderer()
  const result = renderer.render(<Platform platform={platform} />)
  expect(result).toMatchSnapshot()
})
