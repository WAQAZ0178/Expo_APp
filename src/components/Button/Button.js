import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'

import {
  StyledButton,
  StyledButtonIcon,
  StyledButtonLink,
  StyledText,
  StyledTextButtonIcon,
  StyledTextLink,
  StyledCheckboxButton,
  StyledCheckboxButtonCheckContainer,
  StyledCheckboxButtonCheck,
  StyledCheckboxButtonLabel,
  StyledRadioButton,
  StyledRadioButtonCircle,
  StyledRadioButtonLabel
} from './styled'

/* components */
import Icon from '../Icon'

function Button(props) {
  const { children, text, textProps, textStyle, ...restProps } = props

  return (
    <StyledButton {...restProps}>
      {children || (
        <StyledText textStyle={textStyle} useGutters={false} {...textProps}>
          {text}
        </StyledText>
      )}
    </StyledButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  textProps: PropTypes.shape({}),
  textStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  useGutters: PropTypes.bool
}
Button.defaultProps = {
  children: null,
  text: '',
  textProps: {},
  textStyle: {},
  useGutters: true
}

function ButtonIcon(props) {
  const { iconName, iconProps, renderIcon, text, textProps, textStyle, ...restProps } = props

  const icon = () => {
    if (typeof renderIcon === 'function') {
      return renderIcon()
    }

    return <Icon name={iconName} {...iconProps} />
  }

  return (
    <StyledButtonIcon {...restProps}>
      {icon()}
      <StyledTextButtonIcon textStyle={textStyle} useGutters={false} {...textProps}>
        {text}
      </StyledTextButtonIcon>
    </StyledButtonIcon>
  )
}

ButtonIcon.propTypes = {
  iconName: PropTypes.string,
  iconProps: PropTypes.shape({}),
  orientation: PropTypes.oneOf(['column', 'row']),
  renderIcon: PropTypes.func,
  text: PropTypes.string,
  textProps: PropTypes.shape({}),
  textStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  useGutters: PropTypes.bool
}
ButtonIcon.defaultProps = {
  iconName: '',
  iconProps: {},
  orientation: 'column',
  renderIcon: null,
  text: '',
  textProps: {},
  textStyle: {},
  useGutters: true
}

const RoundedButton = styled(Button)`
  border-radius: 40px;
  padding: 15px 25px;
  margin: 6px 5px;
`

const StyledContentAreaButton = styled(ButtonIcon)`
  border-radius: 5px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledBackground : theme.colors.violet};
  border-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledBorder : theme.colors.violet};
  padding: 25px 15px;
  ${({ isDashboard }) =>
    isDashboard &&
    `
    margin: 8px;
    width: 150px;
    height: 144px;
    max-height: 144px;
    padding: 5px;
    border-radius: 11px;
  `}
`

function ContentAreaButton(props) {
  const { navigateTo, navigateToPage, onPress, ...restProps } = props

  const navigation = useNavigation()
  const { navigate } = navigation

  const onPressHandler = navigateTo
    ? () => navigate('ContentArea', { contentArea: navigateTo, page: navigateToPage })
    : onPress

  return <StyledContentAreaButton onPress={onPressHandler} {...restProps} />
}

ContentAreaButton.propTypes = {
  navigateTo: PropTypes.string,
  navigateToPage: PropTypes.number,
  onPress: PropTypes.func
}
ContentAreaButton.defaultProps = {
  navigateTo: '',
  navigateToPage: 1,
  onPress: null
}

function ButtonLink(props) {
  const {
    buttonLinkStyle,
    children,
    text,
    textLinkStyle,
    textProps,
    underlineText,
    ...restProps
  } = props

  return (
    <StyledButtonLink {...restProps} buttonLinkStyle={buttonLinkStyle}>
      {children || (
        <StyledTextLink textLinkStyle={textLinkStyle} underlineText={underlineText} {...textProps}>
          {text}
        </StyledTextLink>
      )}
    </StyledButtonLink>
  )
}

ButtonLink.propTypes = {
  buttonLinkStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  children: PropTypes.node,
  text: PropTypes.string,
  textLinkStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  textProps: PropTypes.shape({}),
  underlineText: PropTypes.bool,
  useGutters: PropTypes.bool
}
ButtonLink.defaultProps = {
  buttonLinkStyle: {},
  children: null,
  text: '',
  textLinkStyle: {},
  textProps: {},
  underlineText: true,
  useGutters: true
}

function RadioButton(props) {
  const { active, circleStyle, label, labelStyle, onPress, orientation, ...restProps } = props

  return (
    <StyledRadioButton onPress={onPress} orientation={orientation} {...restProps}>
      <StyledRadioButtonCircle
        active={active}
        circleStyle={circleStyle}
        orientation={orientation}
      />
      <StyledRadioButtonLabel labelStyle={labelStyle}>{label}</StyledRadioButtonLabel>
    </StyledRadioButton>
  )
}

RadioButton.propTypes = {
  active: PropTypes.bool,
  circleStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  onPress: PropTypes.func,
  orientation: PropTypes.oneOf(['column', 'row'])
}
RadioButton.defaultProps = {
  active: false,
  circleStyle: {},
  label: '',
  labelStyle: {},
  onPress: () => {},
  orientation: 'row'
}

function CheckboxButton(props) {
  const {
    active,
    checkContainerStyle,
    checkStyle,
    label,
    labelStyle,
    onPress,
    orientation,
    ...restProps
  } = props

  return (
    <StyledCheckboxButton onPress={onPress} orientation={orientation} {...restProps}>
      <StyledCheckboxButtonCheckContainer
        active={active}
        checkContainerStyle={checkContainerStyle}
        orientation={orientation}
      >
        {active ? <StyledCheckboxButtonCheck checkStyle={checkStyle} /> : null}
      </StyledCheckboxButtonCheckContainer>
      <StyledCheckboxButtonLabel labelStyle={labelStyle}>{label}</StyledCheckboxButtonLabel>
    </StyledCheckboxButton>
  )
}

CheckboxButton.propTypes = {
  active: PropTypes.bool,
  checkContainerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  checkStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  onPress: PropTypes.func,
  orientation: PropTypes.oneOf(['column', 'row'])
}
CheckboxButton.defaultProps = {
  active: false,
  checkContainerStyle: {},
  checkStyle: {},
  label: '',
  labelStyle: {},
  onPress: () => {},
  orientation: 'row'
}

export { CheckboxButton, RadioButton, ContentAreaButton, RoundedButton, ButtonIcon, ButtonLink }

export default Button
