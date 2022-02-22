import React from 'react'
import PropTypes from 'prop-types'

import {
  styleAddButtonIcon,
  styleBackIcon,
  styleCheckpointIcon,
  styleDisclaimerIcon,
  styleExerciseIcon,
  styleExerciseFlippedIcon,
  styleFertilityIcon,
  styleIntroductionBeforeIcon,
  styleIntroductionSideIcon,
  styleOnboardingIcon,
  styleResourcesIcon,
  styleSourcesIcon,
  styleTeamIcon,
  styleQuestionIcon,
  stylePersonIcon,
  StyledWrapper,
  styleSquareIcon
} from './styled'

/* assets */

import AddButtonIcon from '../../assets/images/add_button.svg'
import BackIcon from '../../assets/images/back_button.svg'
import BeforeIcon from '../../assets/images/before.svg'
import CheckpointIcon from '../../assets/images/checkpoint.svg'
import DisclaimerIcon from '../../assets/images/disclaimer_icon.svg'
import ExerciseBubblesIcon from '../../assets/images/exercise_bubbles.svg'
import ExerciseBubblesIcon2 from '../../assets/images/exercise_bubbles2.svg'
import FertilityAgeIcon from '../../assets/images/fertilityage.svg'
import FertilityTreatmentsIcon from '../../assets/images/fertilitytreatments.svg'
import IntroductionIcon1 from '../../assets/images/icon1.svg'
import IntroductionIcon2 from '../../assets/images/icon2.svg'
import IntroductionIcon3 from '../../assets/images/icon3.svg'
import MyFertilityIcon from '../../assets/images/myfertility.svg'
import OnboardIcon1 from '../../assets/images/onboard_1.svg'
import OnboardIcon2 from '../../assets/images/onboard_2.svg'
import OnboardIcon3 from '../../assets/images/onboard_3.svg'
import OnboardIcon4 from '../../assets/images/onboard_4.svg'
import ResourcesIcon from '../../assets/images/resources_icon.svg'
import SourcesIcon from '../../assets/images/sources_icon.svg'
import TeamIcon from '../../assets/images/team_icon.svg'
import Question1Icon from '../../assets/images/Question1.svg'
import Question2Icon from '../../assets/images/Question2.svg'
import PersonIcon from '../../assets/images/person_icon.svg'
import GraphFertilityAgeEggs from '../../assets/images/graph_fertility_age_eggs.svg'
import Activity from '../../assets/images/activity.svg'
import Bandaid from '../../assets/images/bandaid.svg'
import BirthControl from '../../assets/images/birthcontrol.svg'
import Content from '../../assets/images/content.svg'
import Disclaimer from '../../assets/images/disclaimer.svg'
import Glossary from '../../assets/images/glossary.svg'
import Meds from '../../assets/images/meds.svg'
import Pills from '../../assets/images/pills.svg'
import Resources from '../../assets/images/resources.svg'
import Shot from '../../assets/images/shot.svg'
import Summary from '../../assets/images/summary.svg'
import Surrogate from '../../assets/images/surrogate.svg'
import Team from '../../assets/images/team.svg'
import Testes from '../../assets/images/testes.svg'
import Uterus from '../../assets/images/uterus.svg'
import WaitSee from '../../assets/images/waitsee.svg'

function Icon(props) {
  const { name, renderIcon, wrapperStyle, ...restProps } = props

  if (renderIcon) {
    return renderIcon({ styleOnboardingIcon })
  }

  const nameKey = name.replace('.svg', '').toLowerCase()

  const mapper = {
    add_button: () => styleAddButtonIcon(AddButtonIcon),
    back_button: () => styleBackIcon(BackIcon),
    before: () => styleIntroductionBeforeIcon(BeforeIcon),
    checkpoint: () => styleCheckpointIcon(CheckpointIcon),
    disclaimer_icon: () => styleDisclaimerIcon(DisclaimerIcon),
    exercise_bubbles: () => styleExerciseIcon(ExerciseBubblesIcon),
    exercise_bubbles2: () => styleExerciseFlippedIcon(ExerciseBubblesIcon2),
    fertilityage: () => styleFertilityIcon(FertilityAgeIcon),
    fertilitytreatments: () => styleFertilityIcon(FertilityTreatmentsIcon),
    icon1: () => styleIntroductionSideIcon(IntroductionIcon1),
    icon2: () => styleIntroductionSideIcon(IntroductionIcon2),
    icon3: () => styleIntroductionSideIcon(IntroductionIcon3),
    myfertility: () => styleFertilityIcon(MyFertilityIcon),
    onboard_1: () => styleOnboardingIcon(OnboardIcon1),
    onboard_2: () => styleOnboardingIcon(OnboardIcon2),
    onboard_3: () => styleOnboardingIcon(OnboardIcon3),
    onboard_4: () => styleOnboardingIcon(OnboardIcon4),
    resources_icon: () => styleResourcesIcon(ResourcesIcon),
    sources_icon: () => styleSourcesIcon(SourcesIcon),
    team_icon: () => styleTeamIcon(TeamIcon),
    question1: () => styleQuestionIcon(Question1Icon),
    question2: () => styleQuestionIcon(Question2Icon),
    person_icon: () => stylePersonIcon(PersonIcon),
    graph_fertility_age_eggs: () => styleFertilityIcon(GraphFertilityAgeEggs),
    activity: () => styleSquareIcon(Activity),
    bandaid: () => styleSquareIcon(Bandaid),
    birthcontrol: () => styleSquareIcon(BirthControl),
    content: () => styleSquareIcon(Content),
    disclaimer: () => styleDisclaimerIcon(Disclaimer),
    glossary: () => styleSquareIcon(Glossary),
    meds: () => styleSquareIcon(Meds),
    pills: () => styleSquareIcon(Pills),
    resources: () => styleSquareIcon(Resources),
    shot: () => styleSquareIcon(Shot),
    summary: () => styleSquareIcon(Summary),
    surrogate: () => styleSquareIcon(Surrogate),
    team: () => styleSquareIcon(Team),
    testes: () => styleSquareIcon(Testes),
    uterus: () => styleSquareIcon(Uterus),
    waitsee: () => styleSquareIcon(WaitSee)
  }

  if (mapper[nameKey]) {
    const StyledIcon = mapper[nameKey]()
    return (
      <StyledWrapper wrapperStyle={wrapperStyle}>
        <StyledIcon {...restProps} />
      </StyledWrapper>
    )
  }

  return null
}

Icon.propTypes = {
  iconStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  name: PropTypes.string.isRequired,
  renderIcon: PropTypes.func,
  wrapperStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
}
Icon.defaultProps = {
  iconStyle: {},
  renderIcon: null,
  wrapperStyle: {}
}

export default Icon
