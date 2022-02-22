/**
 * Returns next content (page or content area) based on current content area & page from args
 *
 * @example - returns second page in second content area if available
 * const currentContent = { contentArea: 'My Fertility', page: 1 }
 * const getNextContent({ contentArea: currentContent.contentArea, page: currentContent.page })
 * // returns { contentArea: 'My Fertility', page: 2 }
 *
 * @example - returns next content area if page not available & continueToNextContentArea is true
 * const currentContent = { contentArea: 'My Fertility', page: 4 }
 * const getNextContent({ contentArea: currentContent.contentArea, page: currentContent.page })
 * // returns { contentArea: 'Before Treatment', page: 1 }
 *
 * @example - returns empty object if next page not available and continueToNextContentArea is false
 * const currentContent = { contentArea: 'My Fertility', page: 4 }
 * const getNextContent({ contentArea: currentContent.contentArea, page: currentContent.page, continueToNextContentArea: false })
 * // returns {}
 *
 * @param {Object} props
 * @param {string} props.contentArea - ex: My Fertility
 * @param {function} props.getContent - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 * @param {function} props.getNextContentArea - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 * @param {number} props.page - ex: 1
 * @param {number} props.parentID - ex: 187
 * @param {boolean} props.continueToNextContentArea - ex: true (default)
 *
 * @returns {Object} - next content || empty object if not found
 */
function getNextContent({
  contentArea,
  continueToNextContentArea = true,
  getContent,
  getNextContentArea,
  page,
  parentID
}) {
  // return empty for next content if contains parent id without a page (detail view)
  if (!page && parentID) {
    return {}
  }
  const nextContent = getContent({ contentArea, page: page + 1 })
  if (!nextContent.length && continueToNextContentArea) {
    return getNextContentArea({ contentArea })
  }
  return nextContent ? nextContent[0] : {}
}

export default getNextContent
