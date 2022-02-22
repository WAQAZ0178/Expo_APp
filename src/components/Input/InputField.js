import PropTypes from 'prop-types'
import React from 'react'

import Input from './Input'

import {
  StyledFeedbackContainer,
  StyledInputFeedbackContainer,
  StyledInputFieldWrapper,
  StyledTextFeedback,
  StyledTextLabel
} from './styled'

function renderLabel({ label, labelStyle, renderCustomLabel }) {
  if (typeof renderCustomLabel === 'function') {
    return renderCustomLabel()
  }
  if (label) {
    return <StyledTextLabel labelStyle={labelStyle}>{label}</StyledTextLabel>
  }

  return null
}

function InputField(props) {
  const {
    feedback,
    feedbackContainerStyle,
    feedbackStyle,
    inputFeedbackContainerStyle,
    label,
    labelStyle,
    renderCustomLabel,
    renderExtraFeedback,
    showFeedbackInfo,
    testID,
    wrapperInputFieldStyle,
    ...restProps
  } = props

  return (
    <StyledInputFieldWrapper wrapperInputFieldStyle={wrapperInputFieldStyle}>
      {renderLabel({ label, labelStyle, renderCustomLabel })}
      <StyledInputFeedbackContainer
        feedbackLength={feedback.length}
        feedbackStyle={feedbackStyle}
        inputFeedbackContainerStyle={inputFeedbackContainerStyle}
      >
        <Input testID={testID} {...restProps} />
        {showFeedbackInfo ? (
          <StyledFeedbackContainer feedbackContainerStyle={feedbackContainerStyle}>
            {feedback.map(item => {
              const { message } = item || {}
              return (
                <StyledTextFeedback
                  testID={`${testID}-feedback`}
                  key={message || item}
                  feedbackStyle={feedbackStyle}
                >
                  {message || item}
                </StyledTextFeedback>
              )
            })}
            {renderExtraFeedback ? renderExtraFeedback({}) : null}
          </StyledFeedbackContainer>
        ) : null}
      </StyledInputFeedbackContainer>
    </StyledInputFieldWrapper>
  )
}

InputField.propTypes = {
  feedback: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string
      })
    ),
    PropTypes.arrayOf(PropTypes.string)
  ]),
  feedbackContainerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  feedbackStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  inputFeedbackContainerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  renderCustomLabel: PropTypes.func,
  renderExtraFeedback: PropTypes.func,
  showFeedbackInfo: PropTypes.bool,
  testID: PropTypes.string,
  wrapperInputFieldStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
}
InputField.defaultProps = {
  feedback: [],
  feedbackContainerStyle: {},
  feedbackStyle: {},
  label: '',
  labelStyle: {},
  inputFeedbackContainerStyle: {},
  renderCustomLabel: null,
  renderExtraFeedback: null,
  showFeedbackInfo: false,
  testID: '',
  wrapperInputFieldStyle: {}
}

export default React.memo(InputField)
