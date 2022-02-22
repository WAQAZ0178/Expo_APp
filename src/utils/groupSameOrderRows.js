/**
 * Returns updated acc with grouped rows if same content order
 *
 * @example
 * const allRows = [{contentOrderOnPage: 1, id: 1}, {contentOrderOnPage: 2, id: 2}, {contentOrderOnPage: 2, id: 3}]
 * allRows.reduce(groupSameOrderRows, [])
 * // returns [{contentOrderOnPage: 1, id: 1}, [{contentOrderOnPage: 2, id: 2}, {contentOrderOnPage: 2, id: 3}]]
 *
 * @param {Array} acc - all rows
 * @param {Object} row - single row
 *
 * @returns {Array} updated rows
 */
function groupSameOrderRows(acc, row) {
  const { contentOrderOnPage } = row

  // get previous row
  const previousRow = acc[acc.length - 1]

  // if previous row exists (not first element)
  if (previousRow) {
    // extract page and contentOrderOnPage from previous row if array or pojo
    const isPreviousRowArray = Array.isArray(previousRow)
    const { contentOrderOnPage: previousOrder } = isPreviousRowArray ? previousRow[0] : previousRow

    // update previous element if it's the same page and content order
    // to be an array to include the current row
    if (previousOrder === contentOrderOnPage) {
      const newAcc = [...acc]
      newAcc[newAcc.length - 1] = isPreviousRowArray ? [...previousRow, row] : [previousRow, row]
      return newAcc
    }
  }

  // return row without transforming
  return acc.concat(row)
}

export default groupSameOrderRows
