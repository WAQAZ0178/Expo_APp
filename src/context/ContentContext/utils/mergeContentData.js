function mergeContentData({ content, data }) {
  return content.map(row => {
    const { contentProps, dataID, nested } = row

    let updatedRow = { ...row }

    // add value from data if row contains a dataID
    if (dataID) {
      updatedRow = {
        ...updatedRow,
        value: data[dataID] || ''
      }
    }

    // replace placeholder value {} within contentProps if any with value in dataID
    if (contentProps) {
      const updatedContentProps = Object.keys(contentProps).reduce((acc, key) => {
        const value = contentProps[key]

        // check if there is a place holder to replace
        if (value.includes('{') && value.includes('}')) {
          // find the data ID key and value in the string
          const targetDataID = value.substring(value.lastIndexOf('{') + 1, value.lastIndexOf('}'))
          const targetDataValue = data[targetDataID]

          // if there is a data ID valye
          if (targetDataValue) {
            // update the value with the data ID value
            const updatedValue = value.replace(/\{.*\}/g, targetDataValue)

            // use the updated value
            return {
              ...acc,
              [key]: updatedValue
            }
          }
        }

        // use default value
        return {
          ...acc,
          [key]: value
        }
      }, {})

      // update row with new props
      updatedRow = {
        ...updatedRow,
        contentProps: updatedContentProps
      }
    }

    if (nested) {
      const nestedMergedContent = mergeContentData({ content: nested, data })
      updatedRow = {
        ...updatedRow,
        nested: nestedMergedContent
      }
    }

    return updatedRow
  })
}

export default mergeContentData
