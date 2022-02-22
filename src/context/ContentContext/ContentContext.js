import PropTypes from 'prop-types'
import React, { useState } from 'react'

/* utils */
import computeProgressId from './utils/computeProgressId'
import getContentUtil from './utils/getContent'
import getContentAreasUtil from './utils/getContentAreas'
import getNextContentAreaUtil from './utils/getNextContentArea'
import getNextContentUtil from './utils/getNextContent'
import getPageCountUtil from './utils/getPageCount'
import getPreviousContentUtil from './utils/getPreviousContent'
import getPreviousContentAreaUtil from './utils/getPreviousContentArea'
import getProfileUtil from './utils/getProfile'
import getProgressUtil from './utils/getProgress'
import mergeContentData from './utils/mergeContentData'
import validateShowFor from './utils/validateShowFor'

import {
  clearLocalData,
  updateLocalDataItem,
  updateLocalProgressItem,
  clearLocalProgress
} from '../../utils/content'

export const Context = React.createContext()

export const Provider = props => {
  const { children, content, initialData, progress, setProgress } = props

  const [data, setData] = useState(initialData)

  const getProfile = (p = {}) => {
    const mergedContent = mergeContentData({ content, data })

    return getProfileUtil({ mergedContent, ...p })
  }

  const getContent = (p = {}) => {
    const profile = getProfile()
    const mergedContent = mergeContentData({ content, data })
    return getContentUtil({ mergedContent, profile, ...p })
  }

  const getContentAreas = (p = {}) => getContentAreasUtil({ getContent, ...p })

  const getProgress = (p = {}) => getProgressUtil({ progress, ...p })

  /** Clears data from state and local storage */
  const clearData = () => {
    setData({})
    setProgress({
      all: [],
      female: [],
      male: [],
      intersex: []
    })
    clearLocalData()
    clearLocalProgress()
  }

  const getNextContentArea = (p = {}) => getNextContentAreaUtil({ getContentAreas, ...p })

  const getNextContent = (p = {}) => getNextContentUtil({ getContent, getNextContentArea, ...p })

  const getPageCount = (p = {}) => getPageCountUtil({ getContent, ...p })

  const getPreviousContentArea = (p = {}) =>
    getPreviousContentAreaUtil({ getContent, getContentAreas, ...p })

  const getPreviousContent = (p = {}) =>
    getPreviousContentUtil({ getContent, getPreviousContentArea, ...p })

  /**
   * Updates progress in state and local storage by merging contentArea and page arguments as an id
   *
   * @param {Object} props
   * @param {string} props.contentArea - ex: My Fertility
   * @param {string} props.page - ex: 2
   */
  const savePageProgress = ({ complete, contentArea, page, showFor }) => {
    const isShowForValid = validateShowFor({ showFor })
    if (isShowForValid && contentArea && (page || complete)) {
      const progressId = complete
        ? computeProgressId({ complete, contentArea })
        : computeProgressId({ contentArea, page })

      if (!progress[showFor].find(item => item === progressId)) {
        setProgress(prev => {
          const updates = {
            ...prev,
            [showFor]: [...prev[showFor], progressId]
          }
          updateLocalProgressItem(updates)
          return updates
        })
      }
    }
  }

  /**
   * Updates data in state and local storage by merging updates
   *
   * @param {Object} updates
   */
  const updateData = updates => {
    setData(prev => ({
      ...prev,
      ...updates
    }))
    updateLocalDataItem(updates)
  }

  return (
    <Context.Provider
      value={{
        clearData,
        data,
        getContent,
        getContentAreas,
        getNextContent,
        getNextContentArea,
        getPageCount,
        getPreviousContent,
        getPreviousContentArea,
        getProfile,
        getProgress,
        updateData,
        savePageProgress
      }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node,
  content: PropTypes.array,
  initialData: PropTypes.shape({}),
  progress: PropTypes.shape({
    all: PropTypes.arrayOf(PropTypes.string),
    female: PropTypes.arrayOf(PropTypes.string),
    male: PropTypes.arrayOf(PropTypes.string),
    intersex: PropTypes.arrayOf(PropTypes.string)
  }),
  setProgress: PropTypes.func
}

Provider.defaultProps = {
  children: null,
  content: [],
  initialData: {},
  progress: {},
  setProgress: () => {}
}
