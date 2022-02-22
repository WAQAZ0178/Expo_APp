import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

import { StyledTabBar, StyledTabBarItem } from './styled'

/* common */
import { SCREEN_PROP_TYPES } from '../../common/propTypes'

function getLabel({ options, route }) {
  if (options.tabBarLabel !== undefined) {
    return options.tabBarLabel
  }

  if (options.title !== undefined) {
    return options.title
  }

  return route.name
}

function TabBar(props) {
  const { descriptors, navigation, state, padBot } = props

  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <StyledTabBar padBot={padBot}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label = getLabel({ options, route })

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <StyledTabBarItem
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
          >
            <View style={{ paddingBottom: 10 }}>
              {options.tabBarIcon ? options.tabBarIcon({ focused: isFocused }) : null}
            </View>
            {options.tabBarLabel ? options.tabBarLabel({ focused: isFocused }) : null}
          </StyledTabBarItem>
        )
      })}
    </StyledTabBar>
  )
}

TabBar.propTypes = {
  descriptors: PropTypes.array,
  navigation: SCREEN_PROP_TYPES.navigation,
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.array
  }),
  padBot: PropTypes.number
}
TabBar.defaultProps = {
  descriptors: [],
  navigation: {},
  state: {
    index: 0,
    routes: []
  },
  padBot: 10
}

export default TabBar
