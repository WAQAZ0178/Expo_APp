import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from 'styled-components/native'

import DropDownPicker from './DropDownPicker'

/* utils */
import addGutters from '../../utils/addGutters'

function Dropdown(props) {
  const { useGutters } = props

  const theme = useTheme()

  return (
    <DropDownPicker
      containerStyle={{
        inputHeight: theme.sizes.dropdownHeight,
        marginBottom: parseInt(addGutters({ useGutters }).replace('px', ''), 10)
      }}
      itemStyle={{
        borderTopWidth: 1,
        borderTopColor: theme.colors.white,
        paddingVertical: 15
      }}
      labelStyle={{
        color: theme.colors.dropdownText,
        opacity: 0.5,
        textAlign: 'center'
      }}
      activeLabelStyle={{ opacity: 1 }}
      selectedLabelStyle={{
        justifyContent: 'center',
        paddingLeft: theme.sizes.dropdownArrowIcon + 5
      }}
      placeholderStyle={{
        paddingLeft: theme.sizes.dropdownArrowIcon + 5
      }}
      style={{
        backgroundColor: theme.colors.dropdownBg,

        borderColor: theme.colors.dropdownBg,
        borderTopLeftRadius: theme.sizes.dropdownBorderRadius,
        borderTopRightRadius: theme.sizes.dropdownBorderRadius,
        borderBottomLeftRadius: theme.sizes.dropdownBorderRadius,
        borderBottomRightRadius: theme.sizes.dropdownBorderRadius
      }}
      dropDownStyle={{
        backgroundColor: theme.colors.dropdownBg,
        paddingHorizontal: 0,

        borderColor: theme.colors.dropdownBg,
        borderBottomLeftRadius: theme.sizes.dropdownBorderRadius,
        borderBottomRightRadius: theme.sizes.dropdownBorderRadius
      }}
      arrowSize={theme.sizes.dropdownArrowIcon}
      arrowColor={theme.colors.dropdownArrowIcon}
      dropDownMaxHeight={250}
      {...props}
    />
  )
}

Dropdown.propTypes = {
  useGutters: PropTypes.bool
}
Dropdown.defaultProps = {
  useGutters: true
}

export default Dropdown
