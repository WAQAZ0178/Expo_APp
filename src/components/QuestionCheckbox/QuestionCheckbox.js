import PropTypes from 'prop-types'
import React from 'react'

import { StyledQuestionTrashButtonLink, StyledQuestionTrashIcon, StyledWrapper } from './styled'

/* components */
import { CheckboxButton } from '../Button'

function QuestionCheckbox(props) {
  const { hasBottomBorder, isCustomQuestion, onRemoveQuestion, ...restProps } = props
  return (
    <StyledWrapper hasBottomBorder={hasBottomBorder}>
      <CheckboxButton {...restProps} />
      {isCustomQuestion ? (
        <StyledQuestionTrashButtonLink testID="trashButton" onPress={onRemoveQuestion}>
          <StyledQuestionTrashIcon name="md-trash" />
        </StyledQuestionTrashButtonLink>
      ) : null}
    </StyledWrapper>
  )
}

QuestionCheckbox.propTypes = {
  hasBottomBorder: PropTypes.bool,
  isCustomQuestion: PropTypes.bool,
  onRemoveQuestion: PropTypes.func
}
QuestionCheckbox.defaultProps = {
  hasBottomBorder: true,
  isCustomQuestion: false,
  onRemoveQuestion: () => {}
}

export default QuestionCheckbox
