/* eslint-disable */
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { applyStyle, hasParents, openUrl } from 'react-native-markdown-renderer'

import { StyledLink } from './styled'

import { RubikText, RubikTextHeader, RubikTextSubHeader, RubikTextHeader3 } from '../Text'

function findText({ arr }) {
  // base case
  if (!arr || !arr.length) {
    return ''
  }
  const foundTextItem = arr.find(item => item.type === 'text' && item.content)
  if (foundTextItem) {
    return foundTextItem.content
  }
  return findText({ arr: arr[0].children })
}

const renderRules = ({ rules, Text: TextProps }) => {
  const Text = TextProps || RubikText

  return {
    // when unknown elements are introduced, so it wont break
    unknown: (node, children, parent, styles) => {
      return (
        <View key={node.key}>
          <Text>{node.type}</Text>
        </View>
      )
    },

    textgroup: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.text}>
          {children}
        </Text>
      )
    },

    inline: (node, children, parent, styles) => {
      return <Text key={node.key}>{children}</Text>
    },

    text: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.text}>
          {node.content}
        </Text>
      )
    },
    span: (node, children, parent, styles) => {
      return <Text key={node.key}>{children}</Text>
    },

    strong: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.strong}>
          {children}
        </Text>
      )
    },

    s: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.strikethrough}>
          {children}
        </Text>
      )
    },
    // a
    link: (node, children, parent, styles) => {
      return (
        <StyledLink key={node.key} onPress={() => openUrl(node.attributes.href)}>
          {children}
        </StyledLink>
      )
    },
    // a with a non text element nested inside
    blocklink: (node, children, parent, styles) => {
      return (
        <TouchableWithoutFeedback
          key={node.key}
          onPress={() => openUrl(node.attributes.href)}
          style={styles.blocklink}
        >
          <View style={styles.image}>{children}</View>
        </TouchableWithoutFeedback>
      )
    },
    em: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.em}>
          {children}
        </Text>
      )
    },

    heading1: (node, children, parent, styles) => {
      const text = findText({ arr: node.children })

      if (text) {
        return <RubikTextHeader>{text}</RubikTextHeader>
      }

      return (
        <View key={node.key} style={styles.headingContainer}>
          {applyStyle(children, [styles.heading, styles.heading1], 'Text')}
        </View>
      )
    },

    heading2: (node, children, parent, styles) => {
      const text = findText({ arr: node.children })

      if (text) {
        return <RubikTextSubHeader>{text}</RubikTextSubHeader>
      }

      children = applyStyle(children, [styles.heading, styles.heading2], 'Text')
      return (
        <View key={node.key} style={styles.headingContainer}>
          {children}
        </View>
      )
    },
    heading3: (node, children, parent, styles) => {
      const text = findText({ arr: node.children })

      if (text) {
        return <RubikTextHeader3>{text}</RubikTextHeader3>
      }

      return (
        <View key={node.key} style={styles.headingContainer}>
          {applyStyle(children, [styles.heading, styles.heading3], 'Text')}
        </View>
      )
    },
    heading4: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={styles.headingContainer}>
          {applyStyle(children, [styles.heading, styles.heading4], 'Text')}
        </View>
      )
    },
    heading5: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={styles.headingContainer}>
          {applyStyle(children, [styles.heading, styles.heading5], 'Text')}
        </View>
      )
    },
    heading6: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={styles.headingContainer}>
          {applyStyle(children, [styles.heading, styles.heading6], 'Text')}
        </View>
      )
    },

    paragraph: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={styles.paragraph}>
          {children}
        </View>
      )
    },

    hardbreak: (node, children, parent, styles) => {
      return <View key={node.key} style={styles.hardbreak} />
    },

    blockquote: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={styles.blockquote}>
          {children}
        </View>
      )
    },
    code_inline: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.codeInline}>
          {node.content}
        </Text>
      )
    },
    code_block: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.codeBlock}>
          {node.content}
        </Text>
      )
    },
    fence: (node, children, parent, styles) => {
      return (
        <Text key={node.key} style={styles.codeBlock}>
          {node.content}
        </Text>
      )
    },
    pre: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={styles.pre}>
          {children}
        </View>
      )
    },
    // ul
    bullet_list: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.list, styles.listUnordered]}>
          {children}
        </View>
      )
    },
    ordered_list: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.list, styles.listOrdered]}>
          {children}
        </View>
      )
    },
    // li
    list_item: (node, children, parent, styles) => {
      if (hasParents(parent, 'bullet_list')) {
        return (
          <View key={node.key} style={styles.listUnorderedItem}>
            <Text style={styles.listUnorderedItemIcon}>{'\u00B7'}</Text>
            <View style={[styles.listItem]}>{children}</View>
          </View>
        )
      }

      if (hasParents(parent, 'ordered_list')) {
        return (
          <View key={node.key} style={styles.listOrderedItem}>
            <Text style={styles.listOrderedItemIcon}>
              {node.index + 1}
              {node.markup}
            </Text>
            <View style={[styles.listItem]}>{children}</View>
          </View>
        )
      }

      return (
        <View key={node.key} style={[styles.listItem]}>
          {children}
        </View>
      )
    },
    table: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.table]}>
          {children}
        </View>
      )
    },
    thead: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.tableHeader]}>
          {children}
        </View>
      )
    },
    tbody: (node, children, parent, styles) => {
      return <View key={node.key}>{children}</View>
    },
    th: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.tableHeaderCell]}>
          {children}
        </View>
      )
    },
    tr: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.tableRow]}>
          {children}
        </View>
      )
    },
    td: (node, children, parent, styles) => {
      return (
        <View key={node.key} style={[styles.tableRowCell]}>
          {children}
        </View>
      )
    },
    hr: (node, children, parent, styles) => {
      return <View key={node.key} style={[styles.hr]} />
    },

    // br
    softbreak: (node, children, parent, styles) => {
      return <Text key={node.key}>{'\n'}</Text>
    },

    ...rules
  }
}

export default renderRules
