import styled from 'styled-components/native'

import Pagination from './pagination/Pagination'

export const StyledPagination = styled(Pagination).attrs(({ defaultPaginationProps, theme }) => ({
  dotColor: theme.colors.carouselProgressDot,
  dotStyle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2
  },
  inactiveDotColor: theme.colors.carouselProgressDotInactive,
  inactiveDotOpacity: 1,
  inactiveDotScale: 1,
  ...defaultPaginationProps
}))``

export const StyledWrapper = styled.View`
  ${({ wrapperStyle }) => wrapperStyle}
`
