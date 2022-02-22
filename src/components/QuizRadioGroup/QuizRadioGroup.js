import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  StyledContent,
  StyledHeader,
  StyledQuizAddButton,
  StyledQuizHeading,
  StyledWrapper
} from './styled'

/* common */
import { CONTENT_ROW_ITEM_PROP_TYPES } from '../../common/propTypes'

/* components */
import { QuestionCard } from '../Card'
import Icon from '../Icon'
import AddQuestionModal from '../modals/AddQuestionModal'
import RemoveQuestionModal from '../modals/RemoveQuestionModal'

/* context */
import { Context as ContentContext } from '../../context/ContentContext'

/* utils */
import groupSameOrderRows from '../../utils/groupSameOrderRows'
import renderGroupedRow from '../../utils/renderGroupedRow'

function QuizRadioGroup(props) {
  const { customQuestionsDataID, radioOptions, renderDefaultContentType, rows } = props

  const [addModalVisible, setAddModalVisible] = useState(false)
  const [removeQuestion, setRemoveQuestion] = useState({})

  const { data, updateData } = useContext(ContentContext)

  const customQuestions = data[customQuestionsDataID] || []
  const customQuestionRows = customQuestions.length
    ? customQuestions.map(customQuestion => {
        const { dataID, question } = customQuestion

        return {
          dataID,
          id: dataID,
          contentProps: {
            isCustomQuestion: true,
            question
          },
          contentType: 'Quiz-Question-Card'
        }
      })
    : []

  // used to map over targetted rows in a page
  const mapContent = ({ row }) => {
    const groupedContent = renderGroupedRow({ row, renderer: mapContent })
    if (groupedContent) {
      return groupedContent
    }

    const { dataID, id, contentProps = {}, contentType } = row

    const contentTypeLowerCase = contentType.toLowerCase()

    if (contentTypeLowerCase === 'quiz-heading') {
      const { text } = contentProps
      return <StyledQuizHeading key={id}>{text}</StyledQuizHeading>
    }

    if (contentTypeLowerCase === 'quiz-question-card') {
      const { isCustomQuestion, question } = contentProps

      const selectedOption = data[dataID]
      const onSelectOption = value => {
        updateData({
          [dataID]: data[dataID]?.toLowerCase() === value.toLowerCase() ? '' : value
        })
      }

      const onRemoveQuestion = () => {
        setRemoveQuestion({ dataID, question })
      }

      return (
        <QuestionCard
          isCustomQuestion={isCustomQuestion}
          key={id}
          onSelectOption={onSelectOption}
          onRemoveQuestion={onRemoveQuestion}
          question={question}
          radioOptions={radioOptions}
          selectedOption={selectedOption}
        />
      )
    }

    if (contentTypeLowerCase === 'quiz-add-button') {
      const { icon } = contentProps
      const onPress = () => setAddModalVisible(true)
      return (
        <StyledQuizAddButton key={id} onPress={onPress}>
          <Icon name={icon} />
        </StyledQuizAddButton>
      )
    }

    return renderDefaultContentType({ row })
  }

  const groupedContent = rows.reduce(groupSameOrderRows, []).reduce((acc, curr) => {
    // assums add button is on it's own order
    if (Array.isArray(curr)) {
      return acc.concat(curr)
    }

    // add custom questions before add button
    if (curr.contentType?.toLowerCase() === 'quiz-add-button') {
      return acc.concat(customQuestionRows).concat(curr)
    }

    return acc.concat(curr)
  }, [])

  const onAddQuestion = question => {
    // add to the list of custom questions with an object with the minimal properties to work
    const generatedUUID = uuidv4()
    const dataID = `${customQuestionsDataID}-${generatedUUID}`
    updateData({
      [customQuestionsDataID]: customQuestions.concat({ dataID, question })
    })
    // hide the modal
    setAddModalVisible(false)
  }

  const onRemoveQuestion = () => {
    // remove the value that was stored and from the list of custom questions
    updateData({
      [removeQuestion.dataID]: '',
      [customQuestionsDataID]: customQuestions.filter(
        ({ question }) => question !== removeQuestion.question
      )
    })
    // hide the modal
    setRemoveQuestion({})
  }

  return (
    <StyledWrapper>
      <StyledHeader>
        {rows.reduce((acc, row) => {
          if (row.contentType.toLowerCase() === 'heading') {
            return mapContent({ row })
          }
          return acc
        }, null)}
      </StyledHeader>
      <StyledContent>
        {groupedContent
          .filter(row => row.contentType.toLowerCase() !== 'heading')
          .map(row => mapContent({ row }))}
      </StyledContent>
      {addModalVisible ? (
        <AddQuestionModal
          instructionText="Type a factor that is important to you for this fertility option"
          onPressAdd={onAddQuestion}
          onRequestClose={() => setAddModalVisible(false)}
        />
      ) : null}
      {removeQuestion.dataID ? (
        <RemoveQuestionModal
          question={removeQuestion.question}
          onPressNo={() => setRemoveQuestion({})}
          onPressYes={onRemoveQuestion}
          onRequestClose={() => setRemoveQuestion({})}
        />
      ) : null}
    </StyledWrapper>
  )
}

QuizRadioGroup.propTypes = {
  customQuestionsDataID: PropTypes.string,
  radioOptions: PropTypes.arrayOf(PropTypes.string),
  renderDefaultContentType: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.shape(CONTENT_ROW_ITEM_PROP_TYPES))
}
QuizRadioGroup.defaultProps = {
  customQuestionsDataID: '',
  radioOptions: [],
  renderDefaultContentType: () => null,
  rows: []
}

export default QuizRadioGroup
