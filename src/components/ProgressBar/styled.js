import ProgressBar from 'react-native-progress/Bar'
import styled from 'styled-components/native'

export const StyledProgressBar = styled(ProgressBar).attrs(({ theme }) => ({
  borderColor: theme.colors.progressBarBorder,
  color: theme.colors.progressBar,
  height: 12,
  unfilledColor: theme.colors.progressBarBackground,
  useNativeDriver: true,
  width: null
}))`
  margin-bottom: 24px;
  ${({ progressbarStyle }) => progressbarStyle}
`
