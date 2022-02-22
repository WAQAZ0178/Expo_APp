/**
 * Returns previous content (page or content area) based on current content area & page from args
 *
 * @example - returns second page in second content area if available
 * const currentContent = { contentArea: 'My Fertility', page: 2 }
 * const getPreviousContent({ contentArea: currentContent.contentArea, page: currentContent.page })
 * // returns { contentArea: 'My Fertility', page: 1 }
 *
 * @example - returns next content area if page not available & continueToPreviousContentArea is true
 * const currentContent = { contentArea: 'Before Treatment', page: 1 }
 * const getPreviousContent({ contentArea: currentContent.contentArea, page: currentContent.page })
 * // returns { contentArea: 'My Fertility', page: 4 }
 *
 * @example - returns empty object if next page not available and continueToPreviousContentArea is false
 * const currentContent = { contentArea: 'Before Treatment', page: 1 }
 * const getPreviousContent({ contentArea: currentContent.contentArea, page: currentContent.page, continueToPreviousContentArea: false })
 * // returns {}
 *
 * @param {Object} props
 * @param {string} props.contentArea - ex: My Fertility
 * @param {boolean} props.continueToPreviousContentArea - ex: true (default)
 * @param {function} props.getContent - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 * @param {function} props.getPreviousContentArea - ex: () => [{ id: '123', dataID: 'name', showFor: 'All', ...etc }]
 * @param {number} props.page - ex: 1
 * @param {number} props.parentID - ex: 187
 * @param {Object} props.profile - ex: { name: 'Yves', ...etc }
 *
 * @returns {Object} - next content || empty object if not found
 */
function getPreviousContent({
  contentArea,
  continueToPreviousContentArea = true,
  getContent,
  getPreviousContentArea,
  page,
  parentID
}) {
  // return empty for next content if contains parent id without a page (detail view)
  if (!page && parentID) {
    return {}
  }

  // if page is 1 and args wants to go back to previous content area
  if (page === 1 && continueToPreviousContentArea) {
    // find the previous content area
    const previousContentArea = getPreviousContentArea({ contentArea })

    // if there is no previous content area
    if (!previousContentArea.contentArea) {
      return {}
    }

    // get the content for the previous content area
    const previousContent = getContent({
      contentArea: previousContentArea.contentArea
    })

    // find a content row that is the last page of the previous content area
    const lastContentPageInPrevious = previousContent.reduce(
      (acc, curr) => {
        if (curr.page > acc.page) {
          return curr
        }

        return acc
      },
      { page: 1 }
    )

    // return content row from previous content area which should be the last page
    return lastContentPageInPrevious
  }

  // find the content page content for the previous content
  const previousContentPage = getContent({ contentArea, page: page - 1 })

  // if found, return the first row (could be any) or return default
  return previousContentPage.length ? previousContentPage[0] : {}
}

export default getPreviousContent
