import styled from 'styled-components/native'

export const styleAddButtonIcon = I => styled(I)`
  width: 41px;
  height: 41px;
  ${({ iconStyle }) => iconStyle}
`

export const styleBackIcon = I => styled(I)`
  height: 40px;
  width: 35px;
  ${({ iconStyle }) => iconStyle}
`

export const styleCheckpointIcon = I => styled(I)`
  height: 229px;
  width: 229px;
  ${({ iconStyle }) => iconStyle}
`

export const styleDisclaimerIcon = I => styled(I)`
  height: 68px;
  width: 18px;
  ${({ iconStyle }) => iconStyle}
`

export const styleExerciseIcon = I => styled(I)`
  height: 99px;
  width: 240px;
  ${({ iconStyle }) => iconStyle}
`

export const styleExerciseFlippedIcon = I => styled(I)`
  height: 99px;
  width: 240px;
  transform: scaleX(-1);
  ${({ iconStyle }) => iconStyle}
`

export const styleFertilityIcon = I => styled(I)`
  height: 268px;
  width: 375px;
  ${({ iconStyle }) => iconStyle}
`

export const styleIntroductionBeforeIcon = I => styled(I)`
  height: 85px;
  width: 294px;
  ${({ iconStyle }) => iconStyle}
`

export const styleIntroductionSideIcon = I => styled(I)`
  height: 52px;
  width: 52px;
  ${({ iconStyle }) => iconStyle}
`

export const styleOnboardingIcon = I => styled(I)`
  height: 240px;
  width: 240px;
  ${({ iconStyle }) => iconStyle}
`

export const styleResourcesIcon = I => styled(I)`
  height: 56px;
  width: 68px;
  ${({ iconStyle }) => iconStyle}
`
export const styleSourcesIcon = I => styled(I)`
  height: 41px;
  width: 22px;
  ${({ iconStyle }) => iconStyle}
`
export const styleTeamIcon = I => styled(I)`
  height: 46px;
  width: 83px;
  ${({ iconStyle }) => iconStyle}
`

export const styleQuestionIcon = I => styled(I)`
  width: 237px;
  height: 237px;
  ${({ iconStyle }) => iconStyle}
`

export const stylePersonIcon = I => styled(I)`
  height: 29px;
  width: 30px;
  ${({ iconStyle }) => iconStyle}
`

export const styleSquareIcon = I => styled(I)`
  height: 150px;
  width: 250px;
  ${({ iconStyle }) => iconStyle}
`

export const StyledWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  ${({ wrapperStyle }) => wrapperStyle}
`
