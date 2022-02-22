import PropTypes from 'prop-types'
import React from 'react'

import { StyledProgressBar } from './styled'

function ProgressBar(props) {
  return <StyledProgressBar {...props} />
}

ProgressBar.propTypes = {
  progressbarStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
}

ProgressBar.defaultProps = {
  progressbarStyle: {}
}

export default ProgressBar
