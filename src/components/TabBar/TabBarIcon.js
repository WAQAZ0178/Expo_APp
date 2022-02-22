import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { ThemeContext } from 'styled-components/native'

/* assets */
import NavActivityIcon from '../../assets/images/nav_activity.svg'
import NavContentIcon from '../../assets/images/nav_content.svg'
import NavGlossaryIcon from '../../assets/images/nav_glossary.svg'
import NavHomeIcon from '../../assets/images/nav_home.svg'

function TabBarIcon(props) {
  const { focused, name, renderIcon } = props

  const theme = useContext(ThemeContext)

  const iconStyles = {
    fill: theme.colors[focused ? 'tabBarFocused' : 'tabBarDefault'],
    height: styles.tabBarIcon.height,
    width: styles.tabBarIcon.width
  }

  if (renderIcon) {
    return renderIcon({ iconStyles })
  }

  const mapper = {
    activity: () => <NavActivityIcon {...iconStyles} />,
    content: () => <NavContentIcon {...iconStyles} />,
    glossary: () => <NavGlossaryIcon {...iconStyles} />,
    home: () => <NavHomeIcon {...iconStyles} />
  }

  if (mapper[name]) {
    return mapper[name]()
  }

  return null
}

TabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  renderIcon: PropTypes.func
}
TabBarIcon.defaultProps = {
  renderIcon: null
}

const styles = StyleSheet.create({
  tabBarIcon: { height: 30, width: 30 }
})

export default TabBarIcon
