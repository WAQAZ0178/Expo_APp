import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { StyledInput, StyledInputAccessories, StyledInputWrapper } from './styled'
import { StyledMaterialIcon } from '../../common/styled'

function Input(props) {
  const {
    accessories,
    accessoriesWrapperStyle,
    accessoryStyle,
    clearText,
    secureTextEntry,
    showErrorStyle,
    useClearAccessory,
    useSecureTextAccessory,
    useEditAccessory,
    useGutters,
    value,
    wrapperInputStyle,
    ...restProps
  } = props

  const [textSecured, setTextSecured] = useState(secureTextEntry)

  // Set default accessories
  const defaultAccessoriesConfig = []

  if (useClearAccessory && value.length > 0) {
    defaultAccessoriesConfig.push({
      id: 'clear-accessory',
      name: 'clear',
      onPress: clearText,
      suppressHighlighting: true
    })
  }
  if (useSecureTextAccessory) {
    defaultAccessoriesConfig.push({
      id: 'secure-text-accessory',
      name: secureTextEntry ? 'visibility-off' : 'visibility',
      onPress: () => setTextSecured(s => !s),
      suppressHighlighting: true
    })
  }
  if (useEditAccessory) {
    defaultAccessoriesConfig.push({
      id: 'edit-text-accessory',
      name: 'create',
      onPress: () => {},
      suppressHighlighting: true
    })
  }

  // Add additional accessories if provider
  const allAccessories = defaultAccessoriesConfig
    .map(({ id, onPress, ...c }) => (
      <TouchableOpacity key={id} onPress={onPress} style={{ padding: 5 }}>
        <StyledMaterialIcon {...c} style={accessoryStyle} />
      </TouchableOpacity>
    ))
    .concat(accessories)

  return (
    <StyledInputWrapper useGutters={useGutters} wrapperInputStyle={wrapperInputStyle}>
      <StyledInput
        {...restProps}
        allAccessoriesLength={allAccessories.length}
        secureTextEntry={textSecured}
        value={value}
      />
      <StyledInputAccessories accessoriesWrapperStyle={accessoriesWrapperStyle}>
        {allAccessories}
      </StyledInputAccessories>
    </StyledInputWrapper>
  )
}

Input.propTypes = {
  accessories: PropTypes.arrayOf(PropTypes.node),
  accessoriesWrapperStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  accessoryStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  autoCapitalize: PropTypes.string,
  autoCompleteType: PropTypes.string,
  autoCorrect: PropTypes.bool,
  clearText: PropTypes.func,
  clearTextOnFocus: PropTypes.bool,
  contextMenuHidden: PropTypes.bool,
  maxLength: PropTypes.number,
  placeholderTextColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  showErrorStyle: PropTypes.bool,
  useClearAccessory: PropTypes.bool,
  useSecureTextAccessory: PropTypes.bool,
  useEditAccessory: PropTypes.bool,
  useGutters: PropTypes.bool,
  value: PropTypes.string,
  wrapperInputStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
}
Input.defaultProps = {
  accessories: [],
  accessoriesWrapperStyle: {},
  accessoryStyle: {},
  autoCapitalize: 'none',
  autoCompleteType: 'off',
  autoCorrect: false,
  clearText: () => {},
  clearTextOnFocus: false,
  contextMenuHidden: true,
  maxLength: 100,
  placeholderTextColor: '',
  secureTextEntry: false,
  showErrorStyle: false,
  useClearAccessory: true,
  useSecureTextAccessory: false,
  useEditAccessory: false,
  useGutters: true,
  value: '',
  wrapperInputStyle: {}
}

export default React.memo(Input)
