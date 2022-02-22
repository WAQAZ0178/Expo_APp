import React from 'react'
import { StyledBottomActions, StyledFlex } from '../common/styled'

function renderGroupedRow({ row, renderer }) {
  if (Array.isArray(row)) {
    const renderedContent = row.map(item => renderer({ row: item }))
    const includesButtons = row.find(item => item.contentType.toLowerCase() === 'button')

    return includesButtons ? (
      <StyledBottomActions>{renderedContent}</StyledBottomActions>
    ) : (
      <StyledFlex>{renderedContent}</StyledFlex>
    )
  }

  return null
}
export default renderGroupedRow
