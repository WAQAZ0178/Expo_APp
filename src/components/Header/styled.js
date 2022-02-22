import styled from 'styled-components/native'

export const StyledWrapper = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  height: 100px;
  padding-horizontal: 15px;
  padding-top: ${({ padTop }) => padTop || 25}px;
`
