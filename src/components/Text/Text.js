import PropTypes from 'prop-types'
import React from 'react'
import { Text as RNText } from 'react-native'
import styled from 'styled-components/native'

/* Utils */
import { getFontFamily } from './utils'
import addGutters from '../../utils/addGutters'

/* Text */
const Text = styled(({ useGutters, themeColor, ...restProps }) => <RNText {...restProps} />)`
  color: ${({ theme, themeColor }) => (themeColor ? theme.colors[themeColor] : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSizes.text};
  line-height: ${({ theme }) => theme.fontSizes.text};
  margin-bottom: ${addGutters};
  text-align: center;
`
Text.propTypes = {
  useGutters: PropTypes.bool,
  themeColor: PropTypes.string
}
Text.defaultProps = {
  useGutters: true,
  themeColor: ''
}

/* TextHeader */
const TextHeader = styled(Text)`
  color: ${({ theme }) => theme.colors.textHeader};
  font-size: ${({ theme }) => theme.fontSizes.textHeader};
  line-height: ${({ theme }) => theme.fontSizes.textHeader};
`

/* StyledFontText */
const StyledFontText = styled(({ fontName, fontKey, ...restProps }) => <Text {...restProps} />)`
  ${getFontFamily}
`

/**
 * RubikText
 * @param {String} fontWeight light|regular|medium|bold|black
 * @param {Boolean} italics
 */
function RubikText(props) {
  const { fontWeight, italics, ...restProps } = props

  const fontKey = italics ? `${fontWeight}Italic` : fontWeight

  return <StyledFontText fontName="rubik" fontKey={fontKey} {...restProps} />
}

RubikText.propTypes = {
  fontWeight: PropTypes.oneOf(['', 'light', 'regular', 'medium', 'bold', 'black']),
  italics: PropTypes.bool
}

RubikText.defaultProps = {
  fontWeight: 'regular',
  italics: false
}

const RubikTextHeader = styled(RubikText)`
  color: ${({ theme }) => theme.colors.textHeader};
  font-size: ${({ theme }) => theme.fontSizes.textHeader};
  line-height: ${({ theme }) => theme.fontSizes.textHeader};
`

const RubikTextSubHeader = styled(RubikText)`
  color: ${({ theme }) => theme.colors.textSubHeader};
  font-size: ${({ theme }) => theme.fontSizes.textSubHeader};
  line-height: ${({ theme }) => theme.fontSizes.textSubHeader};
  font-weight: ${({ className }) => (className === 'bold-subheader' ? 'bold' : 'normal')};
`

const RubikTextHeader3 = styled(RubikText)`
  color: ${({ theme }) => theme.colors.textHeader3};
  font-size: ${({ theme }) => theme.fontSizes.textHeader3};
  line-height: ${({ theme }) => theme.fontSizes.textHeader3};
`

const RubikTextFootnote = styled(RubikText)`
  color: ${({ theme }) => theme.colors.textFootnote};
  font-size: ${({ theme }) => theme.fontSizes.textFootnote};
  line-height: ${({ theme }) => theme.fontSizes.textFootnote};
`

export default RubikText
export {
  TextHeader,
  RubikText,
  RubikTextFootnote,
  RubikTextHeader,
  RubikTextSubHeader,
  RubikTextHeader3
}
