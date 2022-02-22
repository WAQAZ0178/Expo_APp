import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { RubikText } from '../Text'

const TabBarLabel = styled(RubikText).attrs({ useGutters: false })`
  color: ${({ focused, theme }) => theme.colors[focused ? 'tabBarFocused' : 'tabBarDefault']};
  font-size: ${({ theme }) => theme.fontSizes.tabBarLabel};
  line-height: ${({ theme }) => theme.fontSizes.tabBarLabel};
`
TabBarLabel.propTypes = {
  focused: PropTypes.bool
}
TabBarLabel.defaultProps = {
  focused: false
}

export default TabBarLabel
