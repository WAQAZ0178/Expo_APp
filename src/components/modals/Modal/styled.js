import Ionicons from '@expo/vector-icons/Ionicons'
import styled from 'styled-components/native'

import { ButtonLink } from '../../Button'

export const StyledCloseButtonLink = styled(ButtonLink)`
  align-self: flex-end;
`

export const StyledCloseIcon = styled(Ionicons).attrs(({ theme }) => ({
  size: theme.sizes.modalCloseIcon
}))`
  color: ${({ theme }) => theme.colors.modalCloseIcon};
`

export const StyledContentWrapper = styled.View``

export const StyledModalContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  justify-content: center;
  margin-horizontal: ${({ theme }) => theme.gutters.screenContainerPaddingHorizontal};
  padding: 15px;
`

export const StyledModalWrapper = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex: 1;
`
