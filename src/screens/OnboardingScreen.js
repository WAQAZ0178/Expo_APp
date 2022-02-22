import React, { useContext } from 'react'

/* common */
import {
  CONTENT_CONTEXT_DEFAULT_PROPS,
  CONTENT_CONTEXT_PROP_TYPES,
  SCREEN_PROP_TYPES
} from '../common/propTypes'
import SafeAreaWithInsets from '../common/SafeAreaWithInsets'
import { StyledScreenContainer } from '../common/styled'

/* components */
import ContentRow from '../components/ContentRow'

/* context */
import { Context as ContentContext } from '../context/ContentContext'

/* utils */
import groupSameOrderRows from '../utils/groupSameOrderRows'

function OnboardingScreen() {
  const contentArea = 'App Onboarding'

  const { getContent, getProgress, updateData, savePageProgress } = useContext(ContentContext)

  const content = getContent({ contentArea })
  const progress = getProgress({ contentArea, showFor: 'all' })

  const saveProgress = p => savePageProgress({ contentArea, showFor: 'all', ...p })

  const onSnapToItem = index => {
    saveProgress({ page: index + 1 })
  }
  const onNextButtonPress = ({ currentIndex, data }) => {
    if (currentIndex === data.length - 1) {
      saveProgress({ complete: true })
    }
  }

  const renderContent = () =>
    content.reduce(groupSameOrderRows, []).map(row => {
      /*
        purpose of map is to provide extra functionality that is not
        in content specific for this screen content
      */
      let updatedRow = null

      if (row.contentType.toLowerCase() === 'carousel') {
        const lastProgressId = progress.reduce((acc, curr) => {
          const accNum = parseInt(acc.split(':')[1], 10) || -1
          const currNum = parseInt(curr.split(':')[1], 10) || -1
          if (currNum > accNum) {
            return curr
          }
          return acc
        }, '')
        const firstItemInt = lastProgressId ? parseInt(lastProgressId.split(':')[1], 10) : 0
        const firstItem = firstItemInt === 0 ? 0 : firstItemInt - 1

        updatedRow = {
          ...row,
          contentProps: {
            ...row.contentProps,
            firstItem,
            onSnapToItem,
            onNextButtonPress
          }
        }
      }

      return (
        <ContentRow
          key={row.id}
          progress={progress}
          row={updatedRow || row}
          updateData={updateData}
        />
      )
    })

  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer>{renderContent()}</StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

OnboardingScreen.propTypes = {
  ...SCREEN_PROP_TYPES,
  ...CONTENT_CONTEXT_PROP_TYPES
}
OnboardingScreen.defaultProps = {
  ...CONTENT_CONTEXT_DEFAULT_PROPS
}

export default OnboardingScreen
