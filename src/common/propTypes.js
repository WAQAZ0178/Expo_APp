import PropTypes from 'prop-types'

export const CONTENT_ROW_ITEM_PROP_TYPES = {
  content: PropTypes.string,
  contentArea: PropTypes.string,
  contentKey: PropTypes.string,
  contentOrderOnPage: PropTypes.number,
  contentProps: PropTypes.shape({}),
  contentType: PropTypes.string,
  dataID: PropTypes.string,
  id: PropTypes.string,
  nested: PropTypes.arrayOf(PropTypes.shape({})),
  page: PropTypes.number,
  parentID: PropTypes.string,
  required: PropTypes.bool,
  showFor: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        dataID: PropTypes.string,
        quesiton: PropTypes.string
      })
    )
  ])
}

export const CONTENT_ROW_PROP_TYPES = PropTypes.oneOfType([
  PropTypes.shape(CONTENT_ROW_ITEM_PROP_TYPES),
  PropTypes.arrayOf(PropTypes.shape(CONTENT_ROW_ITEM_PROP_TYPES))
])

export const CONTENT_CONTEXT_DEFAULT_PROPS = {
  clearData: () => {},
  content: [],
  getContent: () => {},
  updateData: () => {}
}

export const CONTENT_CONTEXT_PROP_TYPES = {
  clearData: PropTypes.func,
  content: PropTypes.arrayOf(CONTENT_ROW_PROP_TYPES),
  getContent: PropTypes.func,
  updateData: PropTypes.func
}

export const SCREEN_PROP_TYPES = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({})
  }).isRequired
}
