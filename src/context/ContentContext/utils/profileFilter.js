/**
 * Returns boolean to indicate if row should be filtered based on profile.
 * first two condition checks are just to be safe, UI will eventually
 * force the user to fill both sex and cancer experience.
 *
 * @example
 * const profile = { sex: 'Female', cancer-experience: 'During Treatment', cancer-experience-options: 'Before Treatment, During Treatment, After Treatment' }
 * const allRows = [
 *  { id: 1, showFor: 'All - First time in the App' },
 *  { id: 2, showFor: 'Male + Intersex' },
 *  { id: 3, showFor: 'Female + Intersex' },
 *  { id: 4, showFor: 'Female + Intersex + Before Treatment' },
 *  { id: 5, showFor: 'Female + Intersex + During Treatment' },
 *  { id: 6, showFor: 'Male + Intersex + Before Treatment' },
 * ]
 * allRows.filter(row => profileFilter({ profile, row }))
 * // returns [
 *  { id: 1, showFor: 'All - First time in the App' },
 *  { id: 3, showFor: 'Female + Intersex' },
 *  { id: 5, showFor: 'Female + Intersex + During Treatment' },
 * ]
 *
 * @param {Object} props
 * @param {Object} props.profile
 * @param {Object} props.row
 *
 * @returns {Boolean} - true to include | false to exclude
 */
function profileFilter({ profile, row }) {
  const { showFor } = row

  // profile properties
  const { province, sex } = profile
  const ageRange = profile['age-range']
  const cancerExperience = profile['cancer-experience']

  // options
  const ageRangeOptions = profile['age-range-content-props']?.options.split(', ')
  const cancerExperienceOptions = profile['cancer-experience-content-props']?.options.split(', ')
  const provinceOptions = profile['province-content-props']?.options.split(', ')
  const sexOptions = profile['sex-content-props']?.options.split(', ')

  // showFor checks
  const includesAll = showFor.includes('All')
  const includesSex = showFor.includes(sex)
  const includesSexOrAll = includesSex || includesAll

  // show for options checks
  const includesSexOptions =
    showFor.includes('All') || sexOptions.some(option => showFor.includes(option))
  const includesCancerExperienceOptions = cancerExperienceOptions.some(option =>
    showFor.includes(option)
  )
  const includesProvinceOptions = provinceOptions.some(option => showFor.includes(option))
  const includesAgeRangeOptions = ageRangeOptions.some(option => showFor.includes(option))

  // base case, if it does match any options
  if (
    !includesSexOptions &&
    !includesCancerExperienceOptions &&
    !includesProvinceOptions &&
    !includesAgeRangeOptions
  ) {
    return false
  }

  // checks
  const sexCheck = includesSexOptions ? includesSexOrAll : true
  const cancerExperienceCheck = includesCancerExperienceOptions
    ? showFor.includes(cancerExperience)
    : true
  const provinceCheck = includesProvinceOptions ? showFor.includes(province) : true
  const ageRangeCheck = includesAgeRangeOptions ? showFor.includes(ageRange) : true

  // if showfor includes a options for the condition to check,
  // check the value entered in profile
  // otherwise ignore the section and return true
  return sexCheck && cancerExperienceCheck && provinceCheck && ageRangeCheck
}

export default profileFilter
