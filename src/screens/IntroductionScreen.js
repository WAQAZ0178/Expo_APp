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
import findAndUpdateInRow from '../utils/findAndUpdateInRow'
import groupSameOrderRows from '../utils/groupSameOrderRows'

function IntroductionScreen() {
  const contentArea = 'App Introduction'

  const { getContent, getProgress, updateData, savePageProgress } = useContext(ContentContext)

  const content = getContent({ contentArea })
  const progress = getProgress({ contentArea, showFor: 'all' })

  const saveProgress = p => savePageProgress({ contentArea, showFor: 'all', ...p })

  const renderContent = () =>
    content.reduce(groupSameOrderRows, []).map(row => {
      /*
        purpose of map is to provide extra functionality that is not
        in content specific for this screen content
      */
      let updatedRow = null

      updatedRow = findAndUpdateInRow({
        row,
        content: 'next',
        contentType: 'button',
        updates: {
          onButtonPress: () => saveProgress({ complete: true })
        }
      })

      return (
        <ContentRow
          key={row.id || row[0]?.id}
          progress={progress}
          row={updatedRow || row}
          updateData={updateData}
          saveProgress={saveProgress}
        />
      )
    })

  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer>{renderContent()}</StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

IntroductionScreen.propTypes = {
  ...SCREEN_PROP_TYPES,
  ...CONTENT_CONTEXT_PROP_TYPES
}
IntroductionScreen.defaultProps = {
  ...CONTENT_CONTEXT_DEFAULT_PROPS
}

export default IntroductionScreen
