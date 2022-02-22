/**
 * Returns updated row if criteria met
 *
 * @example
 * const row = [{ content: 'next', contentType: 'button' }, { content: 'back', contentType: 'button' }]
 * findAndUpdateInRow({ row, content: 'back', contentType: 'button', updates: { onButtonPress: () => goBack() } })
 * // returns [{ content: 'next', contentType: 'button' }, { content: 'back', contentType: 'button', onButtonPress: () => goBack() }]
 *
 * @param {Object} props
 * @param {(Object|Array)} props.row - can be grouped or single row
 * @param {string} props.content - filter criteria
 * @param {string} props.contentType - filter criteria
 * @param {Object} props.updates - object to merge with single row
 *
 * @returns {(Object|Array)} updated row
 */
function findAndUpdateInRow({ row, content, contentType, updates }) {
  const isRowArray = Array.isArray(row)
  const rowArr = isRowArray ? row : [row]

  const foundItem = rowArr.find(
    item => item.contentType.toLowerCase() === contentType && item.content.toLowerCase() === content
  )

  if (foundItem) {
    const updatedItem = {
      ...foundItem,
      ...updates
    }
    return isRowArray
      ? row.map(item => (item.id === updatedItem.id ? updatedItem : item))
      : updatedItem
  }

  return row
}

export default findAndUpdateInRow
