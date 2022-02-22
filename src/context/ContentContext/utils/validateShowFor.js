function validateShowFor({ showFor }) {
  const showForLowerCase = showFor.toLowerCase()
  return (
    showForLowerCase.includes('all') ||
    showForLowerCase.includes('male') ||
    showForLowerCase.includes('female') ||
    showForLowerCase.includes('intersex')
  )
}

export default validateShowFor
