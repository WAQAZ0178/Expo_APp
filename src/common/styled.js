import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import styled from 'styled-components/native'

export const StyledBottomActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.gutters.xlarge};
  padding-bottom: ${({ theme }) => theme.gutters.xlarge};
  padding-horizontal: ${({ theme }) => theme.gutters.xlarge};
`

export const StyledRow = styled.View`
  flex-direction: row;
  ${({ rowStyles }) => rowStyles}
`

export const StyledFlex = styled.View`
  align-items: stretch;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`

export const Spacer = styled.View`
  margin: ${({ theme }) => theme.gutters.small} 0;
`

export const StyledHr = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.grey};
  border-bottom-width: 2px;
`

export const StyledCenter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const StyledMaterialIcon = styled(MaterialIcons).attrs(({ size, theme }) => ({
  size: size || theme.sizes.inputIcon
}))`
  color: ${({ theme }) => theme.colors.inputIcon};
  ${({ materialIconStyle }) => materialIconStyle}
`

export const StyledScreenContainer = styled.ScrollView.attrs(({ contentContainerStyle = {} }) => ({
  contentContainerStyle: { flexGrow: 1, paddingBottom: 30, ...contentContainerStyle }
}))`
  padding: ${({ theme }) => theme.gutters.screenContainerPaddingVertical}
    ${({ theme }) => theme.gutters.screenContainerPaddingHorizontal};
  flex: 1;
`

export const StyledScreenWrapper = styled.SafeAreaView.attrs({ forceInset: { top: 'always' } })`
  background-color: ${({ theme }) => theme.colors.screenBackground};
  flex: 1;
  padding-top: ${({ noPad, padTop }) => (noPad ? padTop / 4 : padTop)}px;
`
