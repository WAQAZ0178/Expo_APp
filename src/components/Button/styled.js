import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'

import Text from '../Text'

/* utils */
import addGutters from '../../utils/addGutters'

export const StyledButton = styled(({ useGutters, ...restProps }) => (
  <TouchableOpacity {...restProps} />
))`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledBackground : theme.colors.buttonBackground};
  border-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledBorder : theme.colors.buttonBorder};
  border-width: 1px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  max-height: 80px;
  margin-bottom: ${addGutters};
`

export const StyledButtonIcon = styled(StyledButton)`
  flex-direction: ${({ orientation }) => orientation};
`

export const StyledButtonLink = styled(({ useGutters, buttonLinkStyle, ...restProps }) => (
  <TouchableOpacity {...restProps} />
))`
  background-color: transparent;
  margin-bottom: ${addGutters};
  ${({ buttonLinkStyle }) => buttonLinkStyle}
`

export const StyledCheckboxButton = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: ${({ orientation }) => orientation};
  align-items: ${({ orientation }) => (orientation === 'row' ? 'flex-start' : 'center')};
`

export const StyledCheckboxButtonCheck = styled(({ checkStyle, ...restProps }) => (
  <Entypo {...restProps} />
)).attrs(({ size, theme }) => ({
  name: 'check',
  size: size || theme.sizes.checkboxButtonIcon
}))`
  color: ${({ theme }) => theme.colors.checkboxButtonIcon};
  position: absolute;
  top: -15px;
  ${({ checkStyle }) => checkStyle}
`

export const StyledCheckboxButtonCheckContainer = styled(
  ({ active, checkContainerStyle, orientation, ...restProps }) => <View {...restProps} />
)`
  background-color: ${({ active, theme }) =>
    active
      ? theme.colors.checkboxButtonCheckContainerActiveBackground
      : theme.colors.checkboxButtonCheckContainerBackground};
  border-color: ${({ active, theme }) =>
    active
      ? theme.colors.checkboxButtonCheckContainerActiveBorder
      : theme.colors.checkboxButtonCheckContainerBorder};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.sizes.checkboxButtonCheckContainerBorderRadius};
  height: ${({ theme }) => theme.sizes.checkboxButtonCheckContainer};
  margin-right: ${({ orientation }) => (orientation === 'row' ? '10px' : '0px')};
  margin-bottom: ${({ orientation }) => (orientation === 'column' ? '10px' : '0px')};
  position: relative;
  width: ${({ theme }) => theme.sizes.checkboxButtonCheckContainer};
  ${({ checkContainerStyle }) => checkContainerStyle}
`

export const StyledCheckboxButtonLabel = styled(({ labelStyle, ...restProps }) => (
  <Text useGutters={false} {...restProps} />
))`
  color: ${({ theme }) => theme.colors.checkboxButtonLabel};
  font-size: ${({ theme }) => theme.fontSizes.checkboxButtonLabel};
  line-height: ${({ theme }) => theme.fontSizes.checkboxButtonLabel};
  flex-shrink: 1;
  text-align: left;
  ${({ labelStyle }) => labelStyle}
`

export const StyledRadioButton = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: ${({ orientation }) => orientation};
  align-items: center;
`

export const StyledRadioButtonCircle = styled(
  ({ active, circleStyle, orientation, ...restProps }) => <View {...restProps} />
)`
  background-color: ${({ active, theme }) =>
    active
      ? theme.colors.radioButtonCircleActiveBackground
      : theme.colors.radioButtonCircleBackground};
  border-color: ${({ active, theme }) =>
    active ? theme.colors.radioButtonCircleActiveBorder : theme.colors.radioButtonCircleBorder};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.sizes.radioButtonCircleBorderRadius};
  height: ${({ theme }) => theme.sizes.radioButtonCircle};
  margin-right: ${({ orientation }) => (orientation === 'row' ? '10px' : '0px')};
  margin-bottom: ${({ orientation }) => (orientation === 'column' ? '10px' : '0px')};
  width: ${({ theme }) => theme.sizes.radioButtonCircle};
  ${({ circleStyle }) => circleStyle}
`

export const StyledRadioButtonLabel = styled(({ labelStyle, ...restProps }) => (
  <Text useGutters={false} {...restProps} />
))`
  color: ${({ theme }) => theme.colors.radioButtonLabel};
  font-size: ${({ theme }) => theme.fontSizes.radioButtonLabel};
  line-height: ${({ theme }) => theme.fontSizes.radioButtonLabel};
  flex-shrink: 1;
  ${({ labelStyle }) => labelStyle}
`

export const StyledText = styled(({ textStyle, ...restProps }) => <Text {...restProps} />)`
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledText : theme.colors.buttonText};
  font-size: ${({ theme }) => theme.fontSizes.buttonText};
  line-height: ${({ theme }) => theme.fontSizes.buttonText};
  text-align: center;
  ${({ textStyle }) => textStyle}
`

export const StyledTextButtonIcon = styled(StyledText)`
  font-size: ${({ theme }) => theme.fontSizes.buttonIconText};
  line-height: ${({ theme }) => theme.fontSizes.buttonIconText};
  text-align: center;
  ${({ textStyle }) => textStyle}
`

export const StyledTextLink = styled(({ textLinkStyle, underlineText, ...restProps }) => (
  <Text {...restProps} />
))`
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledTextLink : theme.colors.buttonTextLink};
  font-size: ${({ theme }) => theme.fontSizes.buttonLinkText};
  text-decoration: ${({ underlineText }) => (underlineText ? 'underline' : 'none')};
  text-decoration-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabledTextLink : theme.colors.buttonTextLink};
  ${({ textLinkStyle }) => textLinkStyle}
`
