import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { LayoutAnimation, Platform, TouchableWithoutFeedback, UIManager } from 'react-native'
import { ThemeContext } from 'styled-components/native'

/* styled components */
import { StyledContentContainer, StyledHeader, StyledWrapper } from './styled'

/* components */
import { RubikText } from '../Text'

// Note that in order to get this to work on Android you need to set the following flags via UIManager:
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Accordion = props => {
  const {
    children,
    contentContainerStyle,
    header,
    headerStyle,
    renderHeader,
    wrapperStyle,
    ...restProps
  } = props

  const theme = useContext(ThemeContext)
  const [open, setOpen] = useState(false)

  const toggleListItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpen(!open)
  }

  const headerTextStyle = {
    color: open ? theme.colors.accordionHeadingExpanded : theme.colors.accordionHeading,
    fontSize: parseInt(theme.fontSizes.accordionHeading.replace('px', ''), 10),
    paddingVertical: 7
  }
  const bodyTextStyle = {
    color: theme.colors.accordionContent,
    fontSize: parseInt(theme.fontSizes.accordionContent.replace('px', ''), 10),
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return (
    <StyledWrapper wrapperStyle={wrapperStyle} {...restProps}>
      <TouchableWithoutFeedback onPress={toggleListItem}>
        {renderHeader ? (
          renderHeader({ open, textStyle: headerTextStyle })
        ) : (
          <StyledHeader headerStyle={headerStyle}>
            <RubikText useGutters={false} style={headerTextStyle}>
              {header}
            </RubikText>
          </StyledHeader>
        )}
      </TouchableWithoutFeedback>
      {open && (
        <StyledContentContainer contentContainerStyle={contentContainerStyle}>
          {children({ open, textStyle: bodyTextStyle })}
        </StyledContentContainer>
      )}
    </StyledWrapper>
  )
}

Accordion.propTypes = {
  children: PropTypes.func,
  contentContainerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  header: PropTypes.string,
  headerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  renderHeader: PropTypes.func,
  useGutters: PropTypes.bool,
  wrapperStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
}
Accordion.defaultProps = {
  children: null,
  contentContainerStyle: {},
  header: '',
  headerStyle: {},
  renderHeader: null,
  useGutters: true,
  wrapperStyle: {}
}

export default Accordion
