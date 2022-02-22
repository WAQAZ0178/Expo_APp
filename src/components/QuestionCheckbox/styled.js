import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { ButtonLink } from '../Button'

export const StyledQuestionTrashButtonLink = styled(ButtonLink).attrs({ useGutters: false })``

export const StyledQuestionTrashIcon = styled(Ionicons).attrs(({ theme }) => ({
  size: theme.sizes.questionCardTrashIcon
}))`
  color: ${({ theme }) => theme.colors.questionCardTrashIcon};
`

export const StyledWrapper = styled(({ hasBottomBorder, ...restProps }) => <View {...restProps} />)`
  flex: 1;
  flex-direction: row;
  padding-vertical: 15px;
  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: ${({ hasBottomBorder }) => (hasBottomBorder ? '1px' : '0')};
`
