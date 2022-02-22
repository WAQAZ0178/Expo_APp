import PropTypes from 'prop-types'
import React from 'react'

import { StyledBackButtonLink, StyledStartOverButton, StyledWrapper } from './styled'

/* components */
import Icon from '../Icon'
import { RubikTextHeader } from '../Text'
import { StyledRow } from '../../common/styled'

function QuizSuccess(props) {
  const { onBackButtonPress, onStartOverButtonPress } = props
  return (
    <StyledWrapper>
      <Icon name="checkpoint" style={{ marginBottom: 15 }} />
      <RubikTextHeader>QUIZ COMPLETE</RubikTextHeader>
      <StyledRow>
        <StyledStartOverButton onPress={onStartOverButtonPress} text="START OVER" />
      </StyledRow>
      <StyledRow>
        <StyledBackButtonLink onPress={onBackButtonPress} text="BACK" />
      </StyledRow>
    </StyledWrapper>
  )
}

QuizSuccess.propTypes = {
  onBackButtonPress: PropTypes.func,
  onStartOverButtonPress: PropTypes.func
}
QuizSuccess.defaultProps = {
  onBackButtonPress: () => {},
  onStartOverButtonPress: () => {}
}

export default QuizSuccess
