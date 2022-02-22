import styled from 'styled-components/native'

/* components */
import Button from '../../Button'
import Input from '../../Input'
import Text from '../../Text'

export const StyledAddButton = styled(Button).attrs(({ disabled, theme }) => ({
  textStyle: {
    color: disabled
      ? theme.colors.addQuestionModalAddButton.disabledText
      : theme.colors.addQuestionModalAddButton.text,
    fontSize: theme.fontSizes.addQuestionModalAddButtonText,
    lineHeight: theme.fontSizes.addQuestionModalAddButtonText
  }
}))`
  background-color: ${({ disabled, theme }) =>
    disabled
      ? theme.colors.addQuestionModalAddButton.disabledBackground
      : theme.colors.addQuestionModalAddButton.background};
  border-color: ${({ disabled, theme }) =>
    disabled
      ? theme.colors.addQuestionModalAddButton.disabledBorder
      : theme.colors.addQuestionModalAddButton.border};
  border-radius: 40px;
  padding: 10px 20px;
  align-self: center;
  width: 120px;
  max-height: 45px;
`

export const StyledInput = styled(Input).attrs(({ theme }) => ({
  inputStyle: {
    color: theme.colors.addQuestionModalInputText
  }
}))`
  background-color: ${({ theme }) => theme.colors.addQuestionModalInputBackground};
  border-radius: ${({ theme }) => theme.sizes.addQuestionModalInputBorderRadius};
`

export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.addQuestionModalText};
  font-size: ${({ theme }) => theme.fontSizes.addQuestionModalText};
  line-height: ${({ theme }) => theme.fontSizes.addQuestionModalText};
`
