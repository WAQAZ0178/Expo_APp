import styled from 'styled-components/native'

import { ContentAreaButton } from '../Button'
import Carousel from '../Carousel'
import { RubikText } from '../Text'

export const StyledCarouselCard = styled(Carousel).attrs(({ theme }) => {
  return {
    defaultPaginationProps: {
      containerStyle: {
        backgroundColor: theme.colors.violet,
        borderRadius: 20,
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingBottom: 15,
        marginTop: -15
      },
      inactiveDotColor: theme.colors.white
    },
    wrapperStyle: {
      backgroundColor: theme.colors.violet,
      borderRadius: 20,
      marginBottom: 15
    }
  }
})``

export const StyledActionContentAreaButton = styled(ContentAreaButton)`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledBackground : theme.colors.purple};
  border-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledBorder : theme.colors.purple};
`

export const StyledTextRightIntro = styled(RubikText)`
  padding: 16px 0px 4px 6px;
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: ${({ theme }) => theme.fontSizes.large};
  flex-shrink: 1;
  text-align: left;
`
