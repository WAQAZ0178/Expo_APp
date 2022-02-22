import React from 'react'

/* common */
import { SCREEN_PROP_TYPES } from '../common/propTypes'
import SafeAreaWithInsets from '../common/SafeAreaWithInsets'

/* components */
import ContentAreaSuccess from '../components/ContentAreaSuccess'

function ContentAreaSuccessScreen(props) {
  const { navigation, route } = props

  const { goBack, push } = navigation
  const { params = {} } = route
  const { currentContentArea, nextContentArea, nextContentAreaPage = 1 } = params

  const onBackButtonPress = () => goBack()
  const onNextButtonPress = () =>
    push('ContentArea', {
      contentArea: nextContentArea,
      page: nextContentAreaPage
    })

  return (
    <SafeAreaWithInsets>
      <ContentAreaSuccess
        currentContentArea={currentContentArea}
        nextContentArea={nextContentArea}
        onBackButtonPress={onBackButtonPress}
        onNextButtonPress={onNextButtonPress}
      />
    </SafeAreaWithInsets>
  )
}

ContentAreaSuccessScreen.propTypes = {
  ...SCREEN_PROP_TYPES
}

ContentAreaSuccessScreen.defaultProps = {}

export default ContentAreaSuccessScreen
