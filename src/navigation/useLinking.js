import { useLinking } from '@react-navigation/native'

import { allRoutes } from './constants'

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [
      'https://stmikes-before-dev.qochealth.com',
      'https://stmikes-before-uat.qochealth.com',
      'https://stmikes-before.com',
      'stmikesbefore://'
    ],
    config: allRoutes
  })
}
