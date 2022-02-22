function validateContent({ content }) {
  const errors = content.reduce((acc, row) => {
    const { dataID, required, value } = row
    if (dataID && required && !value) {
      return {
        ...acc,
        [dataID]: 'Required'
      }
    }

    return acc
  }, {})

  return errors
}

export default validateContent
