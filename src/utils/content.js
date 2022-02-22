/* global fetch */
import { AsyncStorage } from 'react-native'

/* constants */
import { API_URI } from '../constants/config'

/* file constants */
const ASYNC_STORAGE_CONTENT_KEY = `@content`
const ASYNC_STORAGE_DATA_KEY = `@data`
const ASYNC_STORAGE_PROGRESS_KEY = `@progress`

/**
 * Returns content array from async storage
 *
 * @example
 * const asyncStorageContent = await getLocalContentItem()
 * // returns [Object, Object,...] || []
 *
 * @returns {Array} content or empty array
 */
export async function getLocalContentItem() {
  try {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_CONTENT_KEY)
    if (value !== null) {
      return JSON.parse(value)
    }
    return []
  } catch (err) {
    return []
  }
}

/**
 * Returns data object from async storage
 *
 * @example
 * const asyncStorageData = await getLocalDataItem()
 * // returns {...row} || {}
 *
 * @returns {Object} content or empty object
 */
export async function getLocalDataItem() {
  try {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_DATA_KEY)
    if (value !== null) {
      return JSON.parse(value)
    }
    return {}
  } catch (err) {
    return {}
  }
}

/**
 * Returns progress array from async storage
 *
 * @example
 * const asyncStorageData = await getLocalProgressItem()
 * // returns ['screen1', 'screen2' ...] || []
 *
 * @returns {Object} content or empty object
 */
export async function getLocalProgressItem() {
  const defaultValue = {
    all: [],
    female: [],
    male: [],
    intersex: []
  }
  try {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_PROGRESS_KEY)
    if (value !== null) {
      return JSON.parse(value)
    }
    return defaultValue
  } catch (err) {
    return defaultValue
  }
}

/**
 * Returns boolean to indicate if updates were merged to async storage data item succesfully
 *
 * @example
 * const success = await updateLocalDataItem()
 * // returns true || false
 *
 * @param {Object} updates
 *
 * @returns {Boolean}
 */
export async function updateLocalDataItem(updates) {
  try {
    await AsyncStorage.mergeItem(ASYNC_STORAGE_DATA_KEY, JSON.stringify(updates), () => {})
    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns boolean to indicate if updates were merged to async storage progress item succesfully
 *
 * @example
 * const success = await updateLocalProgressItem()
 * // returns true || false
 *
 * @param {Object} updates
 *
 * @returns {Boolean}
 */
export async function updateLocalProgressItem(updates) {
  try {
    await AsyncStorage.mergeItem(ASYNC_STORAGE_PROGRESS_KEY, JSON.stringify(updates), () => {})
    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns boolean to indicate if local data item was cleared from async storage
 *
 * @example
 * const success = await clearLocalData()
 * // returns true || false
 *
 * @returns {Boolean}
 */
export async function clearLocalData() {
  try {
    await AsyncStorage.removeItem(ASYNC_STORAGE_DATA_KEY)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns boolean to indicate if local progress item was cleared from async storage
 *
 * @example
 * const success = await clearLocalProgress()
 * // returns true || false
 *
 * @returns {Boolean}
 */
export async function clearLocalProgress() {
  try {
    await AsyncStorage.removeItem(ASYNC_STORAGE_PROGRESS_KEY)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns boolean to indicate if server content was
 * successfully merged into content item in async storage.
 * Implemented to be invoked local content is out of date with
 * the server content.
 *
 * @example
 * const serverContent = [Object, Object,...]
 * const success = await syncAsyncStorage({ serverContent })
 * // returns true || false
 *
 * @param {Object} props
 * @param {Array<Object>} serverContent
 *
 * @returns {Boolean}
 */
async function syncAsyncStorage({ serverContent }) {
  try {
    // get local data
    const data = await getLocalDataItem()

    // wipe async storage
    await AsyncStorage.multiRemove([ASYNC_STORAGE_CONTENT_KEY, ASYNC_STORAGE_DATA_KEY])

    let updatedData = data

    // if data not empty
    if (Object.keys(data).length) {
      // map new data id keys with old data values
      updatedData = serverContent.reduce((acc, curr) => {
        const { dataID } = curr
        if (dataID) {
          return {
            ...acc,
            [dataID]: data[dataID] || ''
          }
        }

        return acc
      }, {})
    }

    // set local values with updated server content & data
    await AsyncStorage.multiSet([
      [ASYNC_STORAGE_CONTENT_KEY, JSON.stringify(serverContent)],
      [ASYNC_STORAGE_DATA_KEY, JSON.stringify(updatedData)]
    ])

    return true
  } catch (err) {
    return false
  }
}

/**
 * Returns content by using local content or fetching from server then syncing.
 *
 * @example
 * const content = await loadContent()
 * // returns [Object, Object,...]
 *
 * @returns {Array<Object>}
 */
export async function loadContent() {
  try {
    // request latest version
    const { version } = await fetch(`${API_URI}/content/version`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json())

    // get local content
    const localContent = await getLocalContentItem()
    const localContentVersion = localContent[0]?.content || 0

    // is local behind?
    if (parseInt(localContentVersion, 10) < parseInt(version, 10)) {
      // request server content
      const serverContent = await fetch(`${API_URI}/content`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(r => r.json())

      // sync server content to async storage
      const ok = await syncAsyncStorage({ serverContent })

      // return server content if successfully synced, otherwise
      // return local content
      return ok ? serverContent : localContent
    }

    return localContent
  } catch (err) {
    // get and return local content
    return getLocalContentItem()
  }
}
