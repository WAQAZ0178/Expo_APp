import React from 'react'
import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { StyledScreenWrapper } from './styled'

const SafeAreaWithInsets = props => {
  const { children, ...restProps } = props
  const insets = useSafeAreaInsets()

  return (
    <StyledScreenWrapper padTop={insets.top} padBot={insets.bottom} {...restProps}>
      {children}
    </StyledScreenWrapper>
  )
}

SafeAreaWithInsets.propTypes = {
  children: PropTypes.node
}

SafeAreaWithInsets.defaultProps = {
  children: null
}

export default SafeAreaWithInsets
