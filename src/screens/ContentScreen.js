import React, { useContext } from 'react'

/* common */
import {
  CONTENT_CONTEXT_DEFAULT_PROPS,
  CONTENT_CONTEXT_PROP_TYPES,
  SCREEN_PROP_TYPES
} from '../common/propTypes'
import { StyledScreenContainer } from '../common/styled'

/* components */
import ContentRow from '../components/ContentRow'

/* context */
import { Context as ContentContext } from '../context/ContentContext'

/* utils */
import isContentAreaComplete from '../utils/isContentAreaComplete'
import groupSameOrderRows from '../utils/groupSameOrderRows'
import SafeAreaWithInsets from '../common/SafeAreaWithInsets'

function getContentAreaPage({ contentAreaProgress }) {
  const isComplete = isContentAreaComplete({ contentAreaProgress })

  if (isComplete) {
    return 1
  }

  const page = contentAreaProgress.reduce((acc, curr) => {
    const pageString = curr.split(':')[1]
    const pageInt = parseInt(pageString, 10)
    if (pageInt > acc) {
      return pageInt
    }

    return acc
  }, 0)

  return page + 1
}

function ContentScreen() {
  const contentArea = 'Content'

  const { getContent, getProfile, getProgress, updateData } = useContext(ContentContext)

  const content = getContent({ contentArea })
  const profile = getProfile()
  const showFor = profile.sex.toLowerCase()

  const renderContent = () =>
    content
      .map(row => {
        const { contentProps } = row
        const { navigateTo } = contentProps || {}

        // update row to have navigateToPage if navigateTo is populated
        // to lead user to page they left off on
        if (navigateTo) {
          const contentAreaProgress = getProgress({ contentArea: navigateTo, showFor })
          const page = getContentAreaPage({ contentAreaProgress })
          return { ...row, contentProps: { ...contentProps, navigateToPage: page } }
        }

        return row
      })
      .reduce(groupSameOrderRows, [])
      .map(row => <ContentRow key={row.id} row={row} updateData={updateData} />)

  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer>{renderContent()}</StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

ContentScreen.propTypes = {
  ...SCREEN_PROP_TYPES,
  ...CONTENT_CONTEXT_PROP_TYPES
}

ContentScreen.defaultProps = {
  ...CONTENT_CONTEXT_DEFAULT_PROPS
}

export default ContentScreen
