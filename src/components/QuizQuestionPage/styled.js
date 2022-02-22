import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

/* components */
import Button from '../Button'
import Pagination from '../Carousel/pagination/Pagination'
import { RubikText, RubikTextHeader } from '../Text'

/* utils */
function styleButtonAttrs({ buttonName, disabled, theme }) {
  return {
    textStyle: {
      color: disabled ? theme.colors[buttonName].disabledText : theme.colors[buttonName].text,
      fontSize: theme.fontSizes[buttonName].text,
      lineHeight: theme.fontSizes[buttonName].text
    }
  }
}

function styleButton({ active, buttonName, disabled, theme }) {
  const getBackgroundColor = () => {
    if (disabled) {
      return theme.colors[buttonName].disabledBackground
    }
    if (active) {
      return theme.colors[buttonName].activeBackground
    }
    return theme.colors[buttonName].background
  }
  const getBorderColor = () => {
    if (disabled) {
      return theme.colors[buttonName].disabledBorder
    }
    if (active) {
      return theme.colors[buttonName].activeBorder
    }
    return theme.colors[buttonName].border
  }
  return `
    background-color: ${getBackgroundColor()};
    border-color: ${getBorderColor()};
  `
}

export const StyledHeader = styled.View(({ theme }) => {
  const screenContainerPaddingHorizontalInt = parseInt(
    theme.gutters.screenContainerPaddingHorizontal.replace('px', ''),
    10
  )
  const screenWrapperPaddingTopInt = theme.gutters.screenWrapperPaddingTop
  const { height } = Dimensions.get('window')
  const minHeight = Math.floor(height / 2.3)

  return `
    justify-content: space-between;
    background-color: ${theme.colors.quizMyselfHeaderBackground};
    margin-right: ${-(screenContainerPaddingHorizontalInt * 2)}px;
    margin-left: ${-(screenContainerPaddingHorizontalInt * 2)}px;
    margin-top: ${-screenWrapperPaddingTopInt}px;
    margin-bottom: 15px;
    border-bottom-end-radius: 200px;
    border-bottom-start-radius: 200px;
    z-index: -1;
    padding-top: ${screenWrapperPaddingTopInt}px;
    padding-right: ${screenContainerPaddingHorizontalInt * 2}px;
    padding-left: ${screenContainerPaddingHorizontalInt * 2}px;
    padding-bottom: ${screenWrapperPaddingTopInt}px;
    height: ${minHeight}px;
    ${({ headerStyles }) => headerStyles}
  `
})

export const StyledQuizNavigation = styled(Pagination).attrs(
  ({ defaultPaginationProps, theme }) => ({
    dotColor: theme.colors.carouselProgressDot,
    dotStyle: {
      width: 24,
      height: 24,
      borderRadius: 24 / 2
    },
    inactiveDotColor: theme.colors.white,
    inactiveDotOpacity: 1,
    inactiveDotScale: 1,
    ...defaultPaginationProps
  })
)``

export const StyledQuizButtonLink = styled(RubikText).attrs({
  fontWeight: 'bold',
  useGutters: false
})`
  color: ${({ theme }) => theme.colors.violet};
  margin-top: 14px;
  text-decoration: underline;
`

export const StyledQuizCheckButton = styled(Button).attrs(({ disabled, theme }) =>
  styleButtonAttrs({ buttonName: 'quizMyselfCheckButton', disabled, theme })
)`
  ${({ active, disabled, theme }) =>
    styleButton({ active, buttonName: 'quizMyselfCheckButton', disabled, theme })}
  border-width: 1px;
  border-radius: 40px;
  padding: 15px;
  width: 50%;
  align-self: center;
`

export const StyledQuizFeedback = styled(RubikText)``
export const StyledQuizFeedbackColourWord = styled(RubikText)`
  color: ${({ theme, status }) =>
    status === 'wrong'
      ? theme.colors.quizMyselfErrorFeedback
      : theme.colors.quizMyselfSuccessFeedback};
`

export const StyledQuizOptionButton = styled(Button).attrs(({ disabled, theme }) =>
  styleButtonAttrs({ buttonName: 'quizMyselfOptionButton', disabled, theme })
)`
  ${({ active, disabled, theme }) =>
    styleButton({ active, buttonName: 'quizMyselfOptionButton', disabled, theme })}
  border-width: ${({ active }) => (active ? '4px' : '1px')};
  border-radius: 40px;
  padding: 15px;
`

export const StyledQuizQuestion = styled(RubikText).attrs({ useGutters: false })`
  color: ${({ theme }) => theme.colors.white};
`

export const StyledQuizQuestionHeading = styled(RubikTextHeader)`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.yellow};
`

export const StyledWrapper = styled.View`
  flex: 1;
`
