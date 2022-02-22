import computeProgressId from './computeProgressId'
import validateShowFor from './validateShowFor'

function getProgress({ contentAreas, contentArea, page, progress, showFor }) {
  const isShowForValid = validateShowFor({ showFor })

  if (isShowForValid && contentAreas) {
    return progress[showFor].filter(id => {
      const progressIds = contentAreas.map(item => computeProgressId({ contentArea: item, page }))
      return progressIds.includes(id.split(':')[0])
    })
  }
  if (isShowForValid && contentArea) {
    const progressId = computeProgressId({ contentArea, page })

    return progress[showFor].filter(id => {
      if (!page) {
        return id.split(':')[0] === progressId.split(':')[0]
      }
      return id === progressId
    })
  }

  return progress
}

export default getProgress
