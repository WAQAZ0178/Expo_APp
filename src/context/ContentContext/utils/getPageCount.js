/**
 * Returns page count for all the content areas or a specific one that you can provide
 *
 * @example - returns integer page count for specified content area
 * const getPageCount({ contentArea: 'My Fertility' })
 * // returns 4
 *
 * @example - returns object with all page counts
 * const getPageCount()
 * // returns { ['My Fertility']: 4, ...etcc}
 *
 * @param {Object} props
 * @param {string} props.contentArea - ex: My Fertility
 * @param {function} props.getContent - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 * @param {Object} props.profile - ex: { name: 'Yves', ...etc }
 *
 * @returns {Object|Integer} - object containing content area properties with page count values or integer with page count for specified content area
 */
function getPageCount({ getContent, contentArea }) {
  const pageCount = getContent({ contentArea }).reduce((acc, curr) => {
    const { page } = curr
    const pageInt = parseInt(page, 10)

    if (pageInt > acc) {
      return pageInt
    }

    return acc
  }, 1)

  return pageCount
}

export default getPageCount
