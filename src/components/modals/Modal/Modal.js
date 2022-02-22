import React from 'react'
import { Modal } from 'react-native'
import PropTypes from 'prop-types'

import {
  StyledCloseButtonLink,
  StyledCloseIcon,
  StyledContentWrapper,
  StyledModalContainer,
  StyledModalWrapper
} from './styled'

function CustomModal(props) {
  const { children, onRequestClose, ...restProps } = props

  return (
    <Modal animationType="fade" transparent visible onRequestClose={onRequestClose} {...restProps}>
      <StyledModalWrapper {...restProps}>
        <StyledModalContainer>
          <StyledCloseButtonLink testID="closeButton" onPress={onRequestClose}>
            <StyledCloseIcon name="md-close" />
          </StyledCloseButtonLink>
          <StyledContentWrapper>{children}</StyledContentWrapper>
        </StyledModalContainer>
      </StyledModalWrapper>
    </Modal>
  )
}

CustomModal.propTypes = {
  children: PropTypes.node,
  onRequestClose: PropTypes.func
}

CustomModal.defaultProps = {
  children: null,
  onRequestClose: () => {}
}

export default CustomModal
