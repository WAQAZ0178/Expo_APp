import PropTypes from 'prop-types'
import React from 'react'

import { StyledActions, StyledNoButton, StyledYesButton, StyledText } from './styled'

/* components */
import Modal from '../Modal'

function RemoveQuestionModal(props) {
  const { onPressNo, onPressYes, question, ...restProps } = props

  const promptText = `Are you sure you want to remove the question, “${question}”?`

  return (
    <Modal testID="RemoveQuestionModal" {...restProps}>
      <StyledText>{promptText}</StyledText>
      <StyledActions>
        <StyledNoButton onPress={onPressNo} text="NO" />
        <StyledYesButton onPress={onPressYes} text="YES" />
      </StyledActions>
    </Modal>
  )
}

RemoveQuestionModal.propTypes = {
  onPressNo: PropTypes.func,
  onPressYes: PropTypes.func,
  question: PropTypes.string
}
RemoveQuestionModal.defaultProps = {
  onPressNo: () => {},
  onPressYes: () => {},
  question: ''
}

export default RemoveQuestionModal
