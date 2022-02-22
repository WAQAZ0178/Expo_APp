import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from 'react-native'
import styled from 'styled-components/native'

import {
  StyledContent,
  StyledDetailButton,
  StyledFooter,
  StyledHeader,
  StyledInfoColumns,
  StyledInfoColumn,
  StyledInfoColumnContent,
  StyledInfoColumnLabel,
  StyledQuestion,
  StyledQuestionOptionsContainer,
  StyledQuestionRadioButton,
  StyledQuestionTrashButtonLink,
  StyledQuestionTrashIcon,
  StyledTitle,
  StyledUsersContainer,
  StyledUserIcon,
  StyledWrapper
} from './styled'

function Card(props) {
  const {
    content,
    detailButtonText,
    footer,
    onPressDetailButton,
    renderContent,
    renderFooter,
    renderHeader,
    title,
    wrapperStyle,
    ...restProps
  } = props

  const renderedDetailButton = detailButtonText ? (
    <StyledDetailButton onPress={onPressDetailButton} text={detailButtonText} />
  ) : null

  const renderedHeader = renderHeader ? (
    renderHeader({ StyledDetailButton, StyledHeader, StyledTitle })
  ) : (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
      {renderedDetailButton}
    </StyledHeader>
  )

  const renderedContent = renderContent ? (
    renderContent({ StyledContent })
  ) : (
    <StyledContent>{content}</StyledContent>
  )
  const renderedFooter = renderFooter ? (
    renderFooter({ StyledFooter })
  ) : (
    <StyledFooter>{footer}</StyledFooter>
  )

  return (
    <StyledWrapper wrapperStyle={wrapperStyle} {...restProps}>
      {renderedHeader}
      {renderedContent}
      {renderedFooter}
    </StyledWrapper>
  )
}

Card.propTypes = {
  content: PropTypes.string,
  detailButtonText: PropTypes.string,
  footer: PropTypes.string,
  onPressDetailButton: PropTypes.func,
  renderContent: PropTypes.func,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  title: PropTypes.string,
  wrapperStyle: PropTypes.oneOfType([
    ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
    PropTypes.string
  ])
}
Card.defaultProps = {
  content: '',
  detailButtonText: '',
  footer: '',
  onPressDetailButton: () => {},
  renderContent: null,
  renderFooter: null,
  renderHeader: null,
  title: '',
  wrapperStyle: {}
}

function CardInfo(props) {
  const { infoColumns, ...restProps } = props
  const renderFooter = () => {
    return (
      <StyledInfoColumns>
        {infoColumns.map(({ content: infoContent, label }) => (
          <StyledInfoColumn key={label}>
            <StyledInfoColumnLabel>{label}</StyledInfoColumnLabel>
            <StyledInfoColumnContent>{infoContent}</StyledInfoColumnContent>
          </StyledInfoColumn>
        ))}
      </StyledInfoColumns>
    )
  }

  return <Card renderFooter={renderFooter} {...restProps} />
}

CardInfo.propTypes = {
  infoColumns: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      label: PropTypes.string
    })
  )
}
CardInfo.defaultProps = {
  infoColumns: []
}

function CardUsers(props) {
  const { highlighted, total, ...restProps } = props

  const renderFooter = () => {
    return (
      <StyledUsersContainer>
        {Array.from({ length: total }).map((_, i) => {
          const active = i + 1 <= highlighted
          const key = `user_icon_${i}`
          return <StyledUserIcon active={active} key={key} name="person" size={30} />
        })}
      </StyledUsersContainer>
    )
  }

  return <Card renderFooter={renderFooter} {...restProps} />
}

CardUsers.propTypes = {
  highlighted: PropTypes.number,
  total: PropTypes.number
}
CardUsers.defaultProps = {
  highlighted: 0,
  total: 10
}

export const StyledQuestionsCard = styled(({ isCustomQuestion, ...restProps }) => (
  <Card {...restProps} />
))`
  background-color: ${({ theme }) => theme.colors.questionCardBackground};
  padding: ${({ isCustomQuestion }) => (isCustomQuestion ? '15px 30px' : '15px')};
`

function QuestionCard(props) {
  const {
    isCustomQuestion,
    onRemoveQuestion,
    onSelectOption,
    question,
    radioOptions,
    selectedOption
  } = props

  const renderHeader = () => {
    if (!isCustomQuestion) {
      return null
    }

    return (
      <StyledQuestionTrashButtonLink testID="trashButton" onPress={onRemoveQuestion}>
        <StyledQuestionTrashIcon name="md-trash" />
      </StyledQuestionTrashButtonLink>
    )
  }

  const renderContent = () => {
    return <StyledQuestion>{question}</StyledQuestion>
  }

  const renderFooter = () => {
    return (
      <StyledQuestionOptionsContainer>
        {radioOptions.map(radioOption => {
          const active = selectedOption === radioOption

          return (
            <StyledQuestionRadioButton
              active={active}
              key={radioOption}
              label={radioOption}
              onPress={() => onSelectOption(radioOption)}
              orientation="column"
            />
          )
        })}
      </StyledQuestionOptionsContainer>
    )
  }

  return (
    <StyledQuestionsCard
      isCustomQuestion={isCustomQuestion}
      renderHeader={renderHeader}
      renderContent={renderContent}
      renderFooter={renderFooter}
      {...props}
    />
  )
}

QuestionCard.propTypes = {
  isCustomQuestion: PropTypes.bool,
  onRemoveQuestion: PropTypes.func,
  onSelectOption: PropTypes.func,
  question: PropTypes.string,
  radioOptions: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string
}
QuestionCard.defaultProps = {
  isCustomQuestion: false,
  onRemoveQuestion: () => {},
  onSelectOption: () => {},
  question: '',
  radioOptions: [],
  selectedOption: ''
}

export { CardInfo, CardUsers, QuestionCard }
export default Card
