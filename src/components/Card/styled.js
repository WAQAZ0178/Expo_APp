import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

import { ButtonLink, RadioButton, RoundedButton } from '../Button'
import { RubikText } from '../Text'

export const StyledContent = styled(RubikText)`
  color: ${({ theme }) => theme.colors.cardContent};
  font-size: ${({ theme }) => theme.fontSizes.cardContent};
`

/** Add -positionining to improve alignment in corner */

export const StyledDetailButton = styled(RoundedButton).attrs(({ theme }) => ({
  textStyle: `
    font-size: ${theme.fontSizes.cardDetailButtonText};
    line-height: ${theme.fontSizes.cardDetailButtonText};
  `
}))`
  padding: 5px 10px;
  position: absolute;
  right: -10px;
  top: -12px;
`

export const StyledFooter = styled.View``

export const StyledHeader = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const StyledInfoColumns = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const StyledInfoColumn = styled.View`
  align-items: center;
  justify-content: center;
  width: 33%;
`

export const StyledInfoColumnContent = styled(RubikText).attrs({ useGutters: false })`
  color: ${({ theme }) => theme.colors.cardInfoColumnContent};
  font-size: ${({ theme }) => theme.fontSizes.cardInfoColumnContent};
  line-height: ${({ theme }) => theme.fontSizes.cardInfoColumnContent};
`

export const StyledInfoColumnLabel = styled(RubikText).attrs({ useGutters: false })`
  color: ${({ theme }) => theme.colors.cardInfoColumnLabel};
  font-size: ${({ theme }) => theme.fontSizes.cardInfoColumnLabel};
  line-height: ${({ theme }) => theme.fontSizes.cardInfoColumnLabel};
  margin-bottom: 5px;
`

export const StyledQuestion = styled(RubikText)`
  color: ${({ theme }) => theme.colors.questionCardContent};
  font-size: ${({ theme }) => theme.fontSizes.questionCardContent};
`

export const StyledQuestionOptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const StyledQuestionRadioButton = styled(RadioButton).attrs(({ theme }) => ({
  circleStyle: {
    height: theme.sizes.quizMyselfRadioButtonCircle,
    width: theme.sizes.quizMyselfRadioButtonCircle,
    borderRadius: theme.sizes.quizMyselfRadioButtonCircleBorderRadius
  },
  labelStyle: {
    fontSize: theme.fontSizes.quizMyselfRadioButtonLabel,
    lineHeight: theme.fontSizes.quizMyselfRadioButtonLabel
  }
}))``

export const StyledQuestionTrashButtonLink = styled(ButtonLink).attrs({ useGutters: false })`
  position: absolute;
  top: 10px;
  right: 10px;
  align-self: flex-end;
`

export const StyledQuestionTrashIcon = styled(Ionicons).attrs(({ theme }) => ({
  size: theme.sizes.questionCardTrashIcon
}))`
  color: ${({ theme }) => theme.colors.questionCardTrashIcon};
`

export const StyledTitle = styled(RubikText).attrs({
  useGutters: false
})`
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: ${({ theme }) => theme.fontSizes.cardTitle};
`

export const StyledUsersContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const StyledUserIcon = styled(({ active, ...restProps }) => (
  <MaterialIcons {...restProps} />
))`
  color: ${({ active, theme }) => (active ? theme.colors.yellow : theme.colors.white)};
`

export const StyledWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  position: relative;
  ${({ wrapperStyle }) => wrapperStyle}
`
