function isContentAreaComplete({ contentAreaProgress }) {
  if (!Array.isArray(contentAreaProgress) || contentAreaProgress.length === 0) {
    return false
  }

  const foundComplete = contentAreaProgress.find(progressId => {
    const page = progressId.split(':')[1]
    return page === 'complete'
  })

  return !!foundComplete
}

export default isContentAreaComplete
