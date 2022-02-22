import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { StyledAddButton, StyledInput, StyledText } from './styled'

/* components */
import Modal from '../Modal'

function AddQuestionModal(props) {
  const { instructionText, onPressAdd, ...restProps } = props

  const [question, setQuestion] = useState('')

  const onPress = () => {
    onPressAdd(question)
  }

  return (
    <Modal testID="AddQuestionModal" {...restProps}>
      <StyledText>{instructionText}</StyledText>
      <StyledInput onChangeText={setQuestion} value={question} />
      <StyledAddButton disabled={!question} onPress={onPress} text="ADD" />
    </Modal>
  )
}

AddQuestionModal.propTypes = {
  instructionText: PropTypes.string,
  onPressAdd: PropTypes.func
}
AddQuestionModal.defaultProps = {
  instructionText: '',
  onPressAdd: () => {}
}

export default AddQuestionModal
