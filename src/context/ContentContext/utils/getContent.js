import profileFilter from './profileFilter'

/**
 * Returns filtered content depending on args using && operation (defaults to true for an arg each filter is not passed in)
 *
 * @param {Object} props
 * @param {string} props.contentArea - ex: My Fertility
 * @param {string} props.contentType - ex: Button
 * @param {Array} props.mergedContent - ex: [{ dataID: 'name', value: 'Yves', ...etc }]
 * @param {number} props.page - ex: 1
 * @param {number} props.parentID - ex: 187
 * @param {Object} props.profile - ex: { name: 'Yves', ...etc }
 *
 * @returns {Array} - filtered content
 */
function getContent({ contentArea, contentType, mergedContent, page, parentID, profile }) {
  let targetContent = mergedContent

  // if targetting parent ID, filter the ids targetting first
  if (parentID) {
    const parentRow = targetContent.find(row => row.id === parentID)
    targetContent = parentRow ? parentRow.nested : []
  }

  // filter based on arguments
  const filteredContent = targetContent.filter(row => {
    if (
      (contentArea ? row.contentArea === contentArea : true) &&
      (page ? parseInt(row.page, 10) === page : true) &&
      (contentType ? row.contentType === contentType : true) &&
      profileFilter({ profile, row })
    ) {
      return true
    }
    return false
  })

  return filteredContent
}

export default getContent
