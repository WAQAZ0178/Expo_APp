function getProfile({ mergedContent }) {
  const profile = mergedContent.reduce((acc, row) => {
    const { dataID, contentArea, contentProps, value } = row

    if (contentArea.toLowerCase() === 'about you' && dataID) {
      return {
        ...acc,
        [dataID]: value || '',
        [`${dataID}-content-props`]: contentProps
      }
    }

    return acc
  }, {})

  return profile
}

export default getProfile
