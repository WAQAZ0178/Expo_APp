/* eslint-disable react/prop-types */
import { NavigationContainer } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import analytics from '@react-native-firebase/analytics'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { navigationRef } from './constants'

/* components */
import Navigator from './Navigator'

/* context */
import { utils as contentContextUtils } from '../context/ContentContext'

/* utils */
import isContentAreaComplete from '../utils/isContentAreaComplete'
import isProfileComplete from '../utils/isProfileComplete'

function Navigation(props) {
  const { progress } = props
  const routeNameRef = React.useRef()
  const getProgress = p => contentContextUtils.getProgress({ progress, ...p })

  const introductionContentArea = 'App Introduction'
  const introductionProgress = getProgress({
    contentArea: introductionContentArea,
    showFor: 'all'
  })
  const onboardingContentArea = 'App Onboarding'
  const onboardingProgress = getProgress({
    contentArea: onboardingContentArea,
    showFor: 'all'
  })
  const profileContentArea = 'About You'
  const profileProgress = getProgress({ contentArea: profileContentArea, showFor: 'all' })

  const introductionComplete = isContentAreaComplete({ contentAreaProgress: introductionProgress })
  const onboardComplete = isContentAreaComplete({ contentAreaProgress: onboardingProgress })
  const profileComplete = isProfileComplete({ profileProgress })

  return (
    /* initialState={initialNavigationState} not working */
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = navigationRef.current.getCurrentRoute().name

          if (previousRouteName !== currentRouteName) {
            // firebase_screen log

            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName
            })
          }
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName
        }}
      >
        <Navigator
          introductionComplete={introductionComplete}
          onboardComplete={onboardComplete}
          profileComplete={profileComplete}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

Navigation.propTypes = {
  initialNavigationState: PropTypes.shape({}),
  progress: PropTypes.shape({
    all: PropTypes.arrayOf(PropTypes.string),
    female: PropTypes.arrayOf(PropTypes.string),
    male: PropTypes.arrayOf(PropTypes.string),
    intersex: PropTypes.arrayOf(PropTypes.string)
  })
}
Navigation.defaultProps = {
  initialNavigationState: {},
  progress: {}
}

export default Navigation
