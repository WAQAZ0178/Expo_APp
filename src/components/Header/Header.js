import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { StyledWrapper } from './styled'

import Icon from '../Icon'

function Header(props) {
  const { navigation, previous, showUserIcon, padTop } = props

  const { goBack, navigate } = navigation

  return (
    <StyledWrapper padTop={padTop}>
      {previous ? (
        <TouchableOpacity onPress={goBack}>
          <Icon name="back_button" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 10, height: 10 }} />
      )}
      {showUserIcon ? (
        <TouchableOpacity onPress={() => navigate('Profile')}>
          <Icon name="person_icon" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 10, height: 10 }} />
      )}
    </StyledWrapper>
  )
}

Header.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired,
  previous: PropTypes.shape({}).isRequired,
  scene: PropTypes.shape({}).isRequired,
  showUserIcon: PropTypes.bool,
  padTop: PropTypes.number
}
Header.defaultProps = {
  showUserIcon: true,
  padTop: 0
}

export default Header
