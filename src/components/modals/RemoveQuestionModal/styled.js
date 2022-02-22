import styled from 'styled-components/native'

/* components */
import Button from '../../Button'
import Text from '../../Text'

export const StyledActions = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const StyledNoButton = styled(Button).attrs(({ disabled, theme }) => ({
  textStyle: {
    color: disabled
      ? theme.colors.removeQuestionModalNoButton.disabledText
      : theme.colors.removeQuestionModalNoButton.text,
    fontSize: theme.fontSizes.removeQuestionModalNoButtonText,
    lineHeight: theme.fontSizes.removeQuestionModalNoButtonText
  }
}))`
  background-color: ${({ disabled, theme }) =>
    disabled
      ? theme.colors.removeQuestionModalNoButton.disabledBackground
      : theme.colors.removeQuestionModalNoButton.background};
  border-color: ${({ disabled, theme }) =>
    disabled
      ? theme.colors.removeQuestionModalNoButton.disabledBorder
      : theme.colors.removeQuestionModalNoButton.border};
  border-radius: 40px;
  padding: 10px 20px;
`

export const StyledYesButton = styled(Button).attrs(({ disabled, theme }) => ({
  textStyle: {
    color: disabled
      ? theme.colors.removeQuestionModalYesButton.disabledText
      : theme.colors.removeQuestionModalYesButton.text,
    fontSize: theme.fontSizes.removeQuestionModalYesButtonText,
    lineHeight: theme.fontSizes.removeQuestionModalYesButtonText
  }
}))`
  background-color: ${({ disabled, theme }) =>
    disabled
      ? theme.colors.removeQuestionModalYesButton.disabledBackground
      : theme.colors.removeQuestionModalYesButton.background};
  border-color: ${({ disabled, theme }) =>
    disabled
      ? theme.colors.removeQuestionModalYesButton.disabledBorder
      : theme.colors.removeQuestionModalYesButton.border};
  border-radius: 40px;
  padding: 10px 20px;
`

export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.removeQuestionModalText};
  font-size: ${({ theme }) => theme.fontSizes.removeQuestionModalText};
  line-height: ${({ theme }) => theme.fontSizes.removeQuestionModalText};
`
