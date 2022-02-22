import styled from 'styled-components/native'

/* components */
import { RubikTextSubHeader } from '../Text'

export const StyledContent = styled.View`
  background-color: ${({ theme }) => theme.colors.quizExerciseContentBackground};
  border-radius: 10px;
  padding: 15px;
`

export const StyledHeader = styled.View``

export const StyledQuizAddButton = styled.TouchableOpacity``

export const StyledQuizHeading = styled(RubikTextSubHeader)`
  color: ${({ theme }) => theme.colors.yellow};
`

export const StyledWrapper = styled.View`
  padding-bottom: 30px;
`
