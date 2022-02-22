const renderMarkdownStyles = ({ markdownStyles }) => {
  return {
    root: {
      flex: 1
    },
    paragraph: {},
    ...markdownStyles
  }
}

export default renderMarkdownStyles
