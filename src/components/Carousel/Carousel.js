import PropTypes from 'prop-types'
import React, { forwardRef, useRef, useState } from 'react'
import { View, ViewPropTypes } from 'react-native'
import RNSnapCarousel from 'react-native-snap-carousel'

import { StyledPagination, StyledWrapper } from './styled'

const Carousel = forwardRef((props, ref) => {
  const {
    customPagination,
    data,
    defaultPaginationProps,
    firstItem,
    onSnapToItem,
    progressPosition,
    stopAutoplayOnUserScroll,
    wrapperStyle,
    ...restProps
  } = props

  const [activeSlide, setActiveSlide] = useState(firstItem)
  const internalRef = useRef(null)
  const carouselRef = ref || internalRef

  const renderPagination = () => {
    if (typeof customPagination === 'function') {
      return customPagination({ activeSlide, data, carouselRef })
    }

    return (
      <StyledPagination
        activeDotIndex={activeSlide}
        carouselRef={carouselRef}
        dotsLength={data.length}
        tappableDots={!!carouselRef}
        defaultPaginationProps={defaultPaginationProps}
      />
    )
  }

  return (
    <StyledWrapper style={wrapperStyle}>
      {progressPosition === 'top' ? renderPagination() : null}
      <RNSnapCarousel
        data={data}
        firstItem={firstItem}
        onSnapToItem={index => {
          if (typeof onSnapToItem === 'function') {
            onSnapToItem(index)
          }
          setActiveSlide(index)
        }}
        ref={carouselRef}
        onScrollBeginDrag={() => {
          carouselRef.current.stopAutoplay()
        }}
        {...restProps}
      />
      {progressPosition === 'bottom' ? renderPagination() : null}
    </StyledWrapper>
  )
})

// 10 seconds
const AUTOPLAY_INTERVAL = 10000

Carousel.propTypes = {
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  customPagination: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  defaultPaginationProps: PropTypes.shape({}),
  firstItem: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  lockScrollWhileSnapping: PropTypes.bool,
  loop: PropTypes.bool,
  onSnapToItem: PropTypes.func,
  progressPosition: PropTypes.oneOf(['top', 'bottom']),
  renderItem: PropTypes.func,
  sliderWidth: PropTypes.number.isRequired,
  stopAutoplayOnUserScroll: PropTypes.bool,
  wrapperStyle: PropTypes.oneOfType([
    ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
    PropTypes.string
  ])
}
Carousel.defaultProps = {
  autoplay: true,
  autoplayInterval: AUTOPLAY_INTERVAL,
  customPagination: null,
  data: [],
  defaultPaginationProps: {},
  firstItem: 0,
  lockScrollWhileSnapping: true,
  loop: true,
  onSnapToItem: null,
  progressPosition: 'bottom',
  renderItem: () => {},
  stopAutoplayOnUserScroll: true,
  wrapperStyle: {}
}

export default Carousel
