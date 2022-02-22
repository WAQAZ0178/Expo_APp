import PropTypes from 'prop-types'
import React from 'react'

import { StyledWrapper } from './styled'

/* common */
import { StyledBottomActions } from '../../common/styled'

/* components */
import { RoundedButton } from '../Button'
import Icon from '../Icon'
import { RubikText, RubikTextHeader } from '../Text'

// TODO: likely delete if client prefers to enter their own section complete messages
function ContentAreaSuccess(props) {
  const { currentContentArea, nextContentArea, onBackButtonPress, onNextButtonPress } = props
  return (
    <StyledWrapper>
      <Icon name="checkpoint" style={{ marginBottom: 15 }} />
      <RubikTextHeader>SECTION COMPLETE</RubikTextHeader>
      <RubikText>{currentContentArea}</RubikText>
      {nextContentArea ? (
        <>
          <RubikTextHeader>NEXT</RubikTextHeader>
          <RubikText>{nextContentArea}</RubikText>
        </>
      ) : null}
      <StyledBottomActions>
        <RoundedButton onPress={onBackButtonPress} text="BACK" />
        {nextContentArea ? (
          <RoundedButton onPress={onNextButtonPress} text="NEXT" style={{ marginLeft: 15 }} />
        ) : null}
      </StyledBottomActions>
    </StyledWrapper>
  )
}

ContentAreaSuccess.propTypes = {
  currentContentArea: PropTypes.string,
  nextContentArea: PropTypes.string,
  onBackButtonPress: PropTypes.func,
  onNextButtonPress: PropTypes.func
}
ContentAreaSuccess.defaultProps = {
  currentContentArea: '',
  nextContentArea: '',
  onBackButtonPress: () => {},
  onNextButtonPress: () => {}
}

export default ContentAreaSuccess
