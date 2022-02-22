import styled from 'styled-components/native'

export const StyledTabBar = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.violet};
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${({ padBot }) => padBot || 0}px;
`

export const StyledTabBarItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 10px;
`
