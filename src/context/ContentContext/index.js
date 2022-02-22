import computeProgressId from './utils/computeProgressId'
import getContent from './utils/getContent'
import getContentAreas from './utils/getContentAreas'
import getNextContent from './utils/getNextContent'
import getNextContentArea from './utils/getNextContentArea'
import getPageCount from './utils/getPageCount'
import getPreviousContent from './utils/getPreviousContent'
import getPreviousContentArea from './utils/getPreviousContentArea'
import getProfile from './utils/getProfile'
import getProgress from './utils/getProgress'
import mergeContentData from './utils/mergeContentData'
import profileFilter from './utils/profileFilter'
import validateShowFor from './utils/validateShowFor'

export { Context, Provider } from './ContentContext'
export const utils = {
  computeProgressId,
  getContent,
  getContentAreas,
  getNextContent,
  getNextContentArea,
  getPageCount,
  getPreviousContent,
  getPreviousContentArea,
  getProfile,
  getProgress,
  mergeContentData,
  profileFilter,
  validateShowFor
}
