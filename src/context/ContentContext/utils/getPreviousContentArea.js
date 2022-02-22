/**
 * Returns previous content area based on current content area
 *
 * @example - returns previous content area
 * const currentContent = { contentArea: 'My Fertility' }
 * const getPreviousContent({ contentArea: currentContent.contentArea })
 * // returns { contentArea: 'Before Treatment', page: 1 }
 *
 * @param {Object} props
 * @param {string} props.contentArea - ex: My Fertility
 * @param {function} props.getContentAreas - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 * @param {boolean} props.includeAllContentArea - ex: false
 *
 * @returns {Object} - next content || empty object if not found
 */
function getPreviousContentArea({ contentArea, getContentAreas, includeAllContentArea }) {
  const contentAreas = includeAllContentArea
    ? getContentAreas()
    : getContentAreas().filter(({ showFor }) => !showFor.toLowerCase().includes('all'))
  const currentIndex = contentAreas.findIndex(row => row.contentArea === contentArea)
  const previousContentArea = contentAreas[currentIndex - 1]
  return previousContentArea || {}
}

export default getPreviousContentArea
