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

function AboutUsScreen() {
  const contentArea = 'The Team'

  const { getContent } = useContext(ContentContext)
  const content = getContent({ contentArea })

  const renderContent = () =>
    content.reduce(groupSameOrderRows, []).map(row => <ContentRow key={row.id} row={row} />)

  return (
    <SafeAreaWithInsets>
      <StyledScreenContainer>{renderContent()}</StyledScreenContainer>
    </SafeAreaWithInsets>
  )
}

AboutUsScreen.propTypes = {
  ...SCREEN_PROP_TYPES,
  ...CONTENT_CONTEXT_PROP_TYPES
}
AboutUsScreen.defaultProps = {
  ...CONTENT_CONTEXT_DEFAULT_PROPS
}

export default AboutUsScreen
