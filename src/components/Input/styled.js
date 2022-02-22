import styled from 'styled-components/native'

import Text from '../Text'

/* utils */
import addGutters from '../../utils/addGutters'

const getFeedbackBackgroundColor = ({ feedbackLength, feedbackStyle, theme }) => {
  if (feedbackLength) {
    return feedbackStyle.backgroundColor || theme.colors.inputFeedbackErrorContainerBg
  }

  return theme.colors.inputFeedbackContainerBg
}

export const StyledFeedbackContainer = styled.View`
  padding: ${({ theme }) => theme.gutters.xxsmall} ${({ theme }) => theme.gutters.medium};
`

export const StyledTextFeedback = styled(Text)`
  color: ${({ theme }) => theme.colors.lightest};
  font-size: ${({ theme }) => theme.fonts.sizes.xxsmallXSmall};
  ${({ feedbackStyle }) => feedbackStyle}
`

export const StyledTextLabel = styled(Text)`
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.labelColor};
  font-size: ${({ theme }) => theme.fonts.sizes.xxsmallXSmall};
  ${({ labelStyle }) => labelStyle}
`

function calcInputPaddingRighOffset({ allAccessoriesLength, theme }) {
  if (allAccessoriesLength === 0) {
    return theme.gutters.inputPaddingHorizontal
  }
  const defaultInputPaddingRight = parseInt(
    theme.gutters.inputPaddingHorizontal.replace(/px/, ''),
    10
  )
  const total = allAccessoriesLength * theme.sizes.inputIcon + defaultInputPaddingRight
  return `${total}px`
}

export const StyledInput = styled.TextInput.attrs(({ placeholderTextColor, theme }) => ({
  placeholderTextColor: placeholderTextColor || theme.colors.inputPlaceholder
}))`
  flex: 1;
  padding-vertical: ${({ theme }) => theme.gutters.inputPaddingVertical};
  padding-left: ${({ theme }) => theme.gutters.inputPaddingHorizontal};
  padding-right: ${calcInputPaddingRighOffset};
  color: ${({ theme }) => theme.colors.inputText};
  font-size: ${({ theme }) => theme.fontSizes.text};
  line-height: ${({ theme }) => theme.fontSizes.text};
  ${({ inputStyle }) => inputStyle}
`

export const StyledInputAccessories = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  height: ${({ theme }) => theme.sizes.inputHeight};
  position: absolute;
  right: ${({ theme }) => theme.gutters.inputPaddingHorizontal};
  ${({ accessoriesWrapperStyle }) => accessoriesWrapperStyle}
`

export const StyledInputWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.inputBg};
  border-radius: ${({ theme }) => theme.sizes.inputBorderRadius};
  flex-direction: row;
  justify-content: space-between;
  min-height: ${({ theme }) => theme.sizes.inputHeight};
  max-height: ${({ theme }) => theme.sizes.inputHeight};
  width: 100%;
  margin-bottom: ${addGutters};
  ${({ wrapperInputStyle }) => wrapperInputStyle}
`

export const StyledInputFeedbackContainer = styled.View`
  background-color: ${({ feedbackLength, feedbackStyle, theme }) =>
    getFeedbackBackgroundColor({ feedbackLength, feedbackStyle, theme })};
  border-radius: ${({ theme }) => theme.sizes.inputBorderRadius};
  border: 1px solid
    ${({ feedbackLength, feedbackStyle, theme }) =>
      getFeedbackBackgroundColor({ feedbackLength, feedbackStyle, theme })};
  ${({ inputFeedbackContainerStyle }) => inputFeedbackContainerStyle};
`

export const StyledInputFieldWrapper = styled.View`
  width: 100%;
  ${({ wrapperInputFieldStyle }) => wrapperInputFieldStyle}
`

export const StyledWrapper = styled.View`
  ${({ wrapperStyle }) => wrapperStyle}
`
