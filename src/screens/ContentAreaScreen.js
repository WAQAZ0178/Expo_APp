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

function ContentAreaScreen(props) {
  const { navigation, route } = props
  const { goBack, navigate } = navigation
  const { params = {} } = route

  const { contentArea, page, parentID } = params
  const pageInt = parseInt(page, 10)

  const {
    getContent,
    getNextContent,
    getPageCount,
    getPreviousContent,
    savePageProgress,
    getProfile,
    updateData
  } = useContext(ContentContext)

  const currentContent = { contentArea, page: pageInt, parentID }
  const content = getContent(currentContent)
  const nextContent = getNextContent(currentContent)
  const previousContent = getPreviousContent(currentContent)
  const pageCount = getPageCount({ contentArea })

  const profile = getProfile()
  const showFor = profile.sex.toLowerCase()

  const renderContent = () =>
    content.reduce(groupSameOrderRows, []).map(row => {
      /*
        purpose of map is to provide extra functionality that is not
        in content specific for this screen content
      */
      let updatedRow = null

      updatedRow = findAndUpdateInRow({
        row,
        content: 'back',
        contentType: 'button',
        updates: {
          onButtonPress: () => {
            if (!previousContent.contentArea) {
              navigate('Content')
            } else {
              navigate('ContentArea', {
                contentArea: previousContent.contentArea,
                page: previousContent.page
              })
            }
          }
        }
      })
      updatedRow = findAndUpdateInRow({
        row: updatedRow,
        content: 'next',
        contentType: 'button',
        updates: {
          disabled: !nextContent.id,
          onButtonPress: () => {
            if (nextContent.contentArea !== contentArea) {
              savePageProgress({ showFor, contentArea, complete: true })
              navigate('ContentArea', {
                contentArea: nextContent.contentArea,
                page: nextContent.page
              })
            } else {
              savePageProgress({ showFor, contentArea, page })
              navigate('ContentArea', {
                contentArea: nextContent.contentArea,
                page: nextContent.page
              })
            }
          }
        }
      })
      updatedRow = findAndUpdateInRow({
        row: updatedRow,
        content: 'back to all options',
        contentType: 'button',
        updates: { onButtonPress: () => goBack() }
      })

      updatedRow = findAndUpdateInRow({
        row: updatedRow,
        content: 'back to all treatments',
        contentType: 'button',
        updates: { onButtonPress: () => goBack() }
      })

      const key = row[0]?.id || row.id

      return (
        <ContentRow
          key={key}
          row={updatedRow || row}
          pageCount={pageCount}
          updateData={updateData}
        />
      )
    })

  return (
    <SafeAreaWithInsets noPad>
      <StyledScreenContainer>{renderContent()}</StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

ContentAreaScreen.propTypes = {
  ...SCREEN_PROP_TYPES,
  ...CONTENT_CONTEXT_PROP_TYPES
}

ContentAreaScreen.defaultProps = {
  ...CONTENT_CONTEXT_DEFAULT_PROPS
}

export default ContentAreaScreen
