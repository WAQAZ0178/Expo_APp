function isProfileComplete({ profileProgress }) {
  if (profileProgress.length === 0) {
    return false
  }

  const foundComplete = profileProgress.find(progressId => {
    const page = progressId.split(':')[1]
    return page === 'complete'
  })

  const markedComplete = !!foundComplete

  if (markedComplete) {
    return true
  }

  return false
}

export default isProfileComplete
