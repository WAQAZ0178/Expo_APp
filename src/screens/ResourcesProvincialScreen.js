import React from 'react'

/* common */
import { SCREEN_PROP_TYPES } from '../common/propTypes'
import SafeAreaWithInsets from '../common/SafeAreaWithInsets'
import { StyledScreenContainer } from '../common/styled'

/* components */
import { RubikText, RubikTextHeader, RubikTextSubHeader } from '../components/Text'

function ResourcesProvincialScreen() {
  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer>
        <RubikTextHeader>RESOURCES</RubikTextHeader>
        <RubikTextSubHeader>Provincal</RubikTextSubHeader>
        <RubikText>
          This is where the provincal resources will be rendered based on parameter passed to this
          component.
        </RubikText>
      </StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

ResourcesProvincialScreen.propTypes = {
  ...SCREEN_PROP_TYPES
}

ResourcesProvincialScreen.defaultProps = {}

export default ResourcesProvincialScreen
