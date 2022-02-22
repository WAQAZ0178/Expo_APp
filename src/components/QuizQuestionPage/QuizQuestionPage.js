import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import {
  StyledHeader,
  StyledQuizNavigation,
  StyledQuizButtonLink,
  StyledQuizCheckButton,
  StyledQuizFeedback,
  StyledQuizFeedbackColourWord,
  StyledQuizOptionButton,
  StyledQuizQuestion,
  StyledQuizQuestionHeading,
  StyledWrapper
} from './styled'

/* common */
import { CONTENT_ROW_ITEM_PROP_TYPES } from '../../common/propTypes'

/* components */
import { RoundedButton } from '../Button'
import QuizSuccess from '../QuizSuccess'

/* context */
import { Context as ContentContext } from '../../context/ContentContext'

/* utils */
import groupSameOrderRows from '../../utils/groupSameOrderRows'
import renderGroupedRow from '../../utils/renderGroupedRow'

function QuizQuestionPage(props) {
  const { allPages, numberOfIncludedRowsInHeader, renderDefaultContentType } = props

  const { data, updateData } = useContext(ContentContext)

  const pagesCount = allPages.reduce((acc, curr) => {
    if (curr.page > acc) {
      return curr.page
    }

    return acc
  }, 1)

  const highestSelectedPage = allPages.reduce((acc, curr) => {
    const { dataID, page, value } = curr

    // check if there is a dataID on the row, if there is a value selected,
    // and if the page is greater then acc to get the highest
    // page that has a selected option
    if (dataID && value && page > acc && page % 2 !== 0) {
      return page
    }
    return acc
  }, 1)

  const [page, setPage] = useState(highestSelectedPage)
  const [showSuccess, setShowSuccess] = useState(false)

  // find selected page content from all pages
  const targetPageContent = allPages.filter(item => item.page === page)

  // used to map over targetted rows in a page
  const mapContent = ({ row }) => {
    const groupedContent = renderGroupedRow({ row, renderer: mapContent })
    if (groupedContent) {
      return groupedContent
    }

    const { dataID, id, contentProps = {}, contentType } = row

    const contentTypeLowerCase = contentType.toLowerCase()
    const { text } = contentProps

    const questionDataID =
      contentTypeLowerCase === 'quiz-question'
        ? dataID
        : targetPageContent.reduce(
            (acc, curr) => (curr.contentType.toLowerCase() === 'quiz-question' ? curr.dataID : acc),
            ''
          )

    const selectedOption = data[questionDataID]

    if (contentTypeLowerCase === 'quiz-question-heading') {
      return <StyledQuizQuestionHeading key={id}>{text}</StyledQuizQuestionHeading>
    }

    if (contentTypeLowerCase === 'quiz-question') {
      return <StyledQuizQuestion key={id}>{text}</StyledQuizQuestion>
    }

    if (contentTypeLowerCase === 'quiz-feedback') {
      const feedbackMessage = allPages
        .filter(
          item => item.page === page - 1 && item.contentType.toLowerCase() === 'quiz-option-button'
        )
        .reduce((acc, curr) => {
          if (curr.contentProps?.text === selectedOption) {
            return curr.contentProps?.feedbackMessage || ''
          }

          return acc
        }, '')

      const isWrong = feedbackMessage.includes('Sorry')
      const isCorrect = feedbackMessage.includes('Correct!')

      if (isWrong || isCorrect) {
        const colouredWord = isWrong ? 'Sorry' : 'Correct!'
        const status = isWrong ? 'wrong' : 'correct'
        const replacedFeedbackMessage = feedbackMessage.replace(colouredWord, '')
        return (
          <StyledQuizFeedback key={id}>
            <StyledQuizFeedbackColourWord status={status}>
              {colouredWord}
            </StyledQuizFeedbackColourWord>
            {replacedFeedbackMessage}
          </StyledQuizFeedback>
        )
      }

      return <StyledQuizFeedback key={id}>{feedbackMessage}</StyledQuizFeedback>
    }

    if (contentTypeLowerCase === 'quiz-navigation') {
      // group all pages content by page, result ex: [[{ page: 1 },..], [{ page: 2 },..] ..]
      const groupedPages = allPages.reduce((acc, curr) => {
        const { page: currPage } = curr

        if (currPage) {
          acc[currPage - 1] = acc[currPage - 1] ? acc[currPage - 1].concat(curr) : [curr]
        }

        return acc
      }, [])
      // calculate dots length by dividing by two since we want to show
      // one dots for every two pages since one of the pages is the results screen
      const dotsLength = Math.floor(groupedPages.length / 2)

      // create a mapper to map index to pages, ex result { 0: 1, 1: 3, 2: 5 } etc..
      const indexToPageMapper = Array.from({ length: dotsLength }).reduce((acc, _, index) => {
        return {
          ...acc,
          [index]: index + (index + 1)
        }
      }, {})

      // calculate active dot index by finding the key for the value equal to the page
      const activeDotIndex =
        parseInt(
          Object.keys(indexToPageMapper).find(
            index => indexToPageMapper[index] === page || indexToPageMapper[index] === page - 1
          ),
          10
        ) || 0

      return (
        <StyledQuizNavigation
          key={id}
          activeDotIndex={activeDotIndex}
          dotsLength={dotsLength}
          onTapDot={({ index }) => {
            // find the next page by finding the value for the key equal to the index
            const nextPage = indexToPageMapper[index]

            // make sure there is no mis calculation
            if (nextPage < groupedPages.length) {
              setPage(nextPage)
            }
          }}
          tappableDots
        />
      )
    }

    if (contentTypeLowerCase === 'quiz-option-button') {
      const active = selectedOption && selectedOption.toLowerCase() === text.toLowerCase()
      const onPress = () => {
        updateData({
          [questionDataID]: data[questionDataID]?.toLowerCase() === text.toLowerCase() ? '' : text
        })
      }
      return <StyledQuizOptionButton active={active} key={id} onPress={onPress} text={text} />
    }

    if (contentTypeLowerCase === 'quiz-check-button') {
      if (selectedOption) {
        const onPress = () => setPage(page + 1)
        return <StyledQuizCheckButton key={id} onPress={onPress} text={text} />
      }
      return null
    }

    if (contentTypeLowerCase === 'quiz-button-link') {
      const onPress = () => {
        if (text.toLowerCase() === 'skip') {
          const nextPage = page % 2 === 0 ? page + 1 : page + 2
          if (nextPage > pagesCount) {
            setShowSuccess(true)
          } else {
            setPage(nextPage)
          }
        }
      }
      return (
        <StyledQuizButtonLink key={id} onPress={onPress}>
          {text}
        </StyledQuizButtonLink>
      )
    }

    if (contentTypeLowerCase === 'quiz-navigation-button') {
      const onPress = () => {
        if (text.toLowerCase() === 'next') {
          const nextPage = page + 1
          if (nextPage > pagesCount) {
            setShowSuccess(true)
          } else {
            setPage(nextPage)
          }
        } else if (text.toLowerCase() === 'back') {
          setPage(page - 1)
        }
      }
      return <RoundedButton key={id} onPress={onPress} text={text} />
    }

    return renderDefaultContentType({ row })
  }

  const groupedContent = targetPageContent.reduce(groupSameOrderRows, [])

  const onSuccessBackButtonPress = () => setShowSuccess(false)
  const onSuccessStartOverButtonPress = () => {
    const dataIDs = allPages.filter(({ dataID }) => dataID).map(({ dataID }) => dataID)
    const dataReset = dataIDs.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: ''
      }),
      {}
    )
    updateData(dataReset)
    setPage(1)
    setShowSuccess(false)
  }

  return (
    <StyledWrapper>
      {showSuccess ? (
        <QuizSuccess
          onBackButtonPress={onSuccessBackButtonPress}
          onStartOverButtonPress={onSuccessStartOverButtonPress}
        />
      ) : (
        <>
          <StyledHeader>
            {groupedContent
              .filter((_, index) => index < numberOfIncludedRowsInHeader)
              .map(row => mapContent({ row }))}
          </StyledHeader>
          {groupedContent
            .filter((_, index) => index >= numberOfIncludedRowsInHeader)
            .map(row => mapContent({ row }))}
        </>
      )}
    </StyledWrapper>
  )
}

QuizQuestionPage.propTypes = {
  allPages: PropTypes.arrayOf(PropTypes.shape(CONTENT_ROW_ITEM_PROP_TYPES)),
  numberOfIncludedRowsInHeader: PropTypes.number,
  renderDefaultContentType: PropTypes.func
}
QuizQuestionPage.defaultProps = {
  allPages: [],
  numberOfIncludedRowsInHeader: 3,
  renderDefaultContentType: () => null
}

export default QuizQuestionPage
