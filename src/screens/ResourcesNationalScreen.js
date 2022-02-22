import React from 'react'

/* common */
import { SCREEN_PROP_TYPES } from '../common/propTypes'
import SafeAreaWithInsets from '../common/SafeAreaWithInsets'
import { StyledScreenContainer } from '../common/styled'

/* components */
import { RubikText, RubikTextSubHeader, RubikTextHeader } from '../components/Text'

function ResourcesNationalScreen() {
  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer>
        <RubikTextHeader>RESOURCES</RubikTextHeader>
        <RubikTextSubHeader>National</RubikTextSubHeader>
        <RubikText>This is where the national resources will go.</RubikText>
      </StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

ResourcesNationalScreen.propTypes = {
  ...SCREEN_PROP_TYPES
}

ResourcesNationalScreen.defaultProps = {}

export default ResourcesNationalScreen
