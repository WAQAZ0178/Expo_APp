import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

/* utils */
import addGutters from '../../utils/addGutters'

export const StyledContentContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.accordionContentBackground};
  padding: 0 15px;
  ${({ contentContainerStyle }) => contentContainerStyle}
`

export const StyledHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.accordionHeadingBackground};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  ${({ headerStyle }) => headerStyle}
`

export const StyledWrapper = styled(({ useGutters, wrapperStyle, ...restProps }) => (
  <View {...restProps} />
))`
  border-radius: 15px;
  margin-bottom: ${addGutters};
  overflow: hidden;
  ${({ wrapperStyle }) => wrapperStyle}
`
