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
import validateContent from '../utils/validateContent'

function ProfileScreen(props) {
  const { route } = props
  const { params = {} } = route
  const { showNext } = params

  const contentArea = 'About You'

  const { getContent, savePageProgress, updateData } = useContext(ContentContext)
  const content = getContent({ contentArea })

  const saveProgress = p => savePageProgress({ contentArea, showFor: 'all', ...p })

  // validate fields and return errors
  const fieldErrors = validateContent({ content })

  const renderContent = () =>
    content
      .filter(row => {
        if (!showNext && row.content.toLowerCase() === 'next') {
          return false
        }

        return true
      })
      .reduce(groupSameOrderRows, [])
      .map(row => {
        /*
        purpose of map is to provide extra functionality that is not
        in content specific for this screen content
      */
        let updatedRow = null

        if (showNext) {
          updatedRow = findAndUpdateInRow({
            row,
            content: 'next',
            contentType: 'button',
            updates: {
              disabled: Object.keys(fieldErrors).length > 0,
              onButtonPress: () => {
                saveProgress({ complete: true })
              }
            }
          })
        }

        return (
          <ContentRow
            key={row.id}
            row={updatedRow || row}
            updateData={updateData}
            saveProgress={saveProgress}
          />
        )
      })

  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer contentContainerStyle={{ paddingBottom: 200 }}>
        {renderContent()}
      </StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

ProfileScreen.propTypes = {
  ...SCREEN_PROP_TYPES,
  ...CONTENT_CONTEXT_PROP_TYPES
}
ProfileScreen.defaultProps = {
  ...CONTENT_CONTEXT_DEFAULT_PROPS
}

export default ProfileScreen
