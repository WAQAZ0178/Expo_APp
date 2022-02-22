import PropTypes from 'prop-types'
import React from 'react'
import MarkdownRenderer from 'react-native-markdown-renderer'

import renderMarkdownStyles from './renderMarkdownStyles'
import renderRules from './renderRules'

function Markdown(props) {
  const { children, markdownStyles, rules, Text, ...restProps } = props

  const updatedRules = renderRules({ rules, Text })

  const style = renderMarkdownStyles({ markdownStyles })

  return (
    <MarkdownRenderer rules={updatedRules} style={style} {...restProps}>
      {children}
    </MarkdownRenderer>
  )
}

Markdown.propTypes = {
  children: PropTypes.node,
  markdownStyles: PropTypes.shape({}),
  rules: PropTypes.shape({}),
  Text: PropTypes.func
}
Markdown.defaultProps = {
  children: null,
  markdownStyles: {},
  rules: {},
  Text: null
}

export default Markdown
