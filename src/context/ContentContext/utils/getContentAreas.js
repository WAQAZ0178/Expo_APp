/**
 * Returns the first element of each content area
 *
 * @param {Object} props
 * @param {function} props.getContent - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 *
 * @returns {Array} - first row of each content area
 */
function getContentAreas({ getContent }) {
  const filteredContent = getContent({})
    .filter(({ showFor }) => showFor.toLowerCase() !== 'none' && showFor !== '')
    .reduce((acc, row) => {
      const contentAreas = acc.map(r => r.contentArea)
      if (!contentAreas.includes(row.contentArea)) {
        return acc.concat(row)
      }
      return acc
    }, [])
    .sort((a, b) => {
      // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
      const aId = parseInt(a.id, 10)
      const bId = parseInt(b.id, 10)
      if (bId > aId) return -1
      if (aId > bId) return 1
      return 0
    })

  return filteredContent
}

export default getContentAreas
