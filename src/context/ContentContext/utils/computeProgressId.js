function computeProgressId({ complete, contentArea, page }) {
  const contentAreaId = contentArea
    .toLowerCase()
    .split(' ')
    .join('-')
  if (page) {
    return `${contentAreaId}:${page}`
  }
  if (complete) {
    return `${contentAreaId}:complete`
  }
  return contentAreaId
}

export default computeProgressId
