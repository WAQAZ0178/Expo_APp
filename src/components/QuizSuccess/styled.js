import styled from 'styled-components/native'

/* components */
import { ButtonLink, RoundedButton } from '../Button'

export const StyledBackButtonLink = styled(ButtonLink).attrs({ useGutters: false })`
  margin-top: 20px;
`

export const StyledStartOverButton = styled(RoundedButton)`
  padding: 10px 30px;
  max-width: 225px;
`

export const StyledWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
