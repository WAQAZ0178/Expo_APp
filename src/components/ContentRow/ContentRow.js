import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import { Dimensions, View, Platform } from 'react-native'
import analytics from '@react-native-firebase/analytics'

/* styled components */
import { StyledActionContentAreaButton, StyledCarouselCard, StyledTextRightIntro } from './styled'

/* common */
import { CONTENT_ROW_PROP_TYPES } from '../../common/propTypes'
import { StyledBottomActions, StyledFlex, StyledHr } from '../../common/styled'

/* components */
import Accordion from '../Accordion'
import { ContentAreaButton, RadioButton, RoundedButton } from '../Button'
import { CardInfo, CardUsers } from '../Card'
import Carousel from '../Carousel'
import Dropdown from '../Dropdown'
import Icon from '../Icon'
import Input from '../Input'
import Markdown from '../Markdown'
import ProgressBar from '../ProgressBar'
import QuizRadioGroup from '../QuizRadioGroup'
import QuizQuestionPage from '../QuizQuestionPage'
import QuizCheckboxList from '../QuizCheckboxList'
import { RubikText, RubikTextFootnote, RubikTextHeader, RubikTextSubHeader } from '../Text'

/* utils */
import findAndUpdateInRow from '../../utils/findAndUpdateInRow'
import groupSameOrderRows from '../../utils/groupSameOrderRows'

function ContentRow(props) {
  const { pageCount, progress, row, updateData } = props
  const {
    className,
    contentArea,
    contentProps = {},
    contentType,
    dataID,
    disabled,
    onButtonPress,
    nested,
    value
  } = row

  const navigation = useNavigation()
  const { push } = navigation

  const carouselRef = useRef(null)
  const [inputValue, setInputValue] = useState(value)

  if (Array.isArray(row)) {
    const renderedContent = row.map(item => (
      <ContentRow
        key={item.id}
        navigation={navigation}
        progress={progress}
        row={item}
        updateData={updateData}
      />
    ))

    const includesButtons = row.find(
      item =>
        item.contentType.toLowerCase() === 'button' &&
        (item.contentProps?.text?.toLowerCase() === 'back' ||
          item.contentProps?.text?.toLowerCase() === 'next')
    )

    return includesButtons ? (
      <StyledBottomActions>{renderedContent}</StyledBottomActions>
    ) : (
      <StyledFlex>{renderedContent}</StyledFlex>
    )
  }

  const contentTypeLowerCase = contentType.toLowerCase()

  if (contentTypeLowerCase === 'accordion') {
    const { content, header } = contentProps
    return (
      <Accordion header={header}>
        {({ textStyle }) => <Markdown style={{ text: textStyle }}>{content}</Markdown>}
      </Accordion>
    )
  }

  if (contentTypeLowerCase === 'button') {
    const { text } = contentProps

    if (contentArea.toLowerCase() === 'app onboarding') {
      return <RoundedButton disabled={disabled} onPress={onButtonPress} text={text} />
    }

    if (nested && nested.length) {
      const onButtonPressWithNested = () =>
        push('ContentArea', { contentArea, page: 0, parentID: nested[0].parentID })

      return <RoundedButton disabled={disabled} onPress={onButtonPressWithNested} text={text} />
    }

    return <RoundedButton disabled={disabled} onPress={onButtonPress} text={text} />
  }

  if (contentTypeLowerCase === 'cardinfo') {
    const {
      content,
      detailButtonText,
      infoOneLabel,
      infoOneContent,
      infoTwoLabel,
      infoTwoContent,
      infoThreeLabel,
      infoThreeContent,
      title
    } = contentProps
    const infoColumns = [
      { content: infoOneContent, label: infoOneLabel },
      { content: infoTwoContent, label: infoTwoLabel },
      { content: infoThreeContent, label: infoThreeLabel }
    ]
    const onPressDetailButton =
      nested && nested.length
        ? () => push('ContentArea', { contentArea, page: 0, parentID: nested[0].parentID })
        : () => {}
    // TODO: InfoCard - review all infocards & confirm working appropriately

    return (
      <CardInfo
        content={content}
        detailButtonText={detailButtonText}
        infoColumns={infoColumns}
        onPressDetailButton={onPressDetailButton}
        title={title}
      />
    )
  }

  if (contentTypeLowerCase === 'cardusers') {
    const { content, highlighted, title, total } = contentProps

    return (
      <CardUsers
        content={content}
        highlighted={parseInt(highlighted, 10)}
        title={title}
        total={parseInt(total, 10)}
      />
    )
  }

  if (contentTypeLowerCase === 'carousel') {
    const { firstItem = 0, onNextButtonPress, onSnapToItem, progressPosition = 'bottom' } =
      contentProps || {}

    // group by pages will result in nested arrays in array ex: [[],[]....]
    const data = nested
      ? nested.reduce((acc, curr) => {
          const { page } = curr

          if (page) {
            acc[page - 1] = acc[page - 1] ? acc[page - 1].concat(curr) : [curr]
          }

          return acc
        }, [])
      : []

    // 30 === padding of screen (theme.gutters.xlarge)
    const WIDTH = Math.round(Dimensions.get('window').width) - 30 * 2

    const renderItem = ({ item }) => {
      const renderContent = () =>
        item.reduce(groupSameOrderRows, []).map(r => {
          let updatedRow = null

          updatedRow = findAndUpdateInRow({
            row: r,
            content: 'next',
            contentType: 'button',
            updates: {
              onButtonPress: () => {
                if (typeof onNextButtonPress === 'function') {
                  onNextButtonPress({ currentIndex: carouselRef.current.currentIndex, data })
                }
                carouselRef.current.snapToNext()
              }
            }
          })

          return (
            <ContentRow
              key={r.id}
              progress={progress}
              row={updatedRow || r}
              updateData={updateData}
            />
          )
        })

      return renderContent()
    }

    const commonCarouselProps = {
      autoplay: false,
      data,
      firstItem,
      itemWidth: WIDTH,
      loop: false,
      enableSnap: true,
      ref: carouselRef,
      onSnapToItem,
      progressPosition,
      renderItem,
      sliderWidth: WIDTH
    }

    if (className === 'carousel-card') {
      return <StyledCarouselCard {...commonCarouselProps} />
    }

    return <Carousel {...commonCarouselProps} />
  }

  if (contentTypeLowerCase === 'contentareabutton') {
    const { iconName, navigateTo, navigateToPage, text } = contentProps

    const targetText = text || navigateTo || ''

    const isDashboard = contentArea.toLowerCase() === 'dashboard'

    const commonProps = {
      disabled,
      iconName,
      navigateTo,
      navigateToPage,
      onPress: onButtonPress,
      text: targetText
    }

    if (className === 'button-action') {
      return <StyledActionContentAreaButton {...commonProps} isDashboard={isDashboard} />
    }

    return <ContentAreaButton {...commonProps} isDashboard={isDashboard} />
  }

  if (contentTypeLowerCase === 'dropdown') {
    const { label: placeholder, options } = contentProps

    const dropdownOptions = options.split(', ').map(label => ({
      label,
      value: label
    }))

    // Firebase defined user properties
    const userProperties = {
      Age: 'ageRange',
      'Cancer Experience': 'cancerExperience',
      Province: 'province',
      'Assigned Sex': 'sex'
    }

    // random high number to make the row first have a higher index then,
    // the ones after if any
    const zIndex = parseInt(-row.id, 10) + 10000

    return (
      <View
        style={{
          ...(Platform.OS !== 'android' && {
            zIndex
          })
        }}
      >
        <Dropdown
          defaultValue={inputValue}
          items={dropdownOptions}
          placeholder={placeholder}
          onChangeItem={item => {
            setInputValue(item.value)
            updateData({ [dataID]: item.value })
            try {
              analytics().setUserProperty(userProperties[placeholder], value)
            } catch (e) {
              // TODO: crashlytics capture?
              console.log(e)
            }
          }}
          zIndex={zIndex}
        />
      </View>
    )
  }

  if (contentTypeLowerCase === 'image') {
    const { name } = contentProps

    return <Icon name={name} iconStyle={{ width: '100%' }} />
  }

  if (contentTypeLowerCase === 'icon') {
    const { name } = contentProps

    return <Icon name={name} />
  }

  if (contentTypeLowerCase === 'footnote') {
    const { text } = contentProps
    return <RubikTextFootnote>{text}</RubikTextFootnote>
  }

  if (contentTypeLowerCase === 'heading') {
    const { text } = contentProps
    return <RubikTextHeader>{text}</RubikTextHeader>
  }

  if (contentTypeLowerCase === 'hr') {
    return <StyledHr style={{ marginVertical: 15 }} />
  }

  if (contentTypeLowerCase === 'paragraph') {
    const { themeColor, text } = contentProps

    // eslint-disable-next-line react/prop-types
    let Text = ({ children, style: markdownStyle }) => (
      <RubikText style={markdownStyle} themeColor={themeColor}>
        {children}
      </RubikText>
    )

    if (className === 'intro-sub-text') {
      // eslint-disable-next-line react/prop-types
      Text = ({ children, style: markdownStyle }) => (
        <RubikText useGutters={false} style={markdownStyle} themeColor={themeColor}>
          {children}
        </RubikText>
      )
    }

    if (className === 'intro-right-text') {
      // eslint-disable-next-line react/prop-types
      Text = ({ children, style: markdownStyle }) => (
        <StyledTextRightIntro style={markdownStyle} useGutters={false} themeColor={themeColor}>
          {children}
        </StyledTextRightIntro>
      )
    }

    // override Text component used by markdown with custom text component
    return <Markdown Text={Text}>{text}</Markdown>
  }

  if (contentTypeLowerCase === 'markdown') {
    const { text } = contentProps
    return <Markdown>{text}</Markdown>
  }

  if (contentTypeLowerCase === 'progressbar') {
    const { page } = row
    const progressNumber = pageCount >= page ? page / (pageCount + 1) : 0
    return <ProgressBar progress={progressNumber} />
  }

  if (contentTypeLowerCase === 'radio') {
    const { label } = contentProps
    const active = !!value
    const onPress = () => {
      updateData({ [dataID]: !active })
    }

    return (
      <RadioButton
        active={active}
        label={label}
        labelStyle={{}}
        onPress={onPress}
        orientation="row"
      />
    )
  }

  if (contentTypeLowerCase === 'quiz-question-page') {
    const { numberOfIncludedRowsInHeader = '3' } = contentProps

    return (
      <QuizQuestionPage
        allPages={nested}
        numberOfIncludedRowsInHeader={parseInt(numberOfIncludedRowsInHeader, 10)}
        renderDefaultContentType={({ row: r }) => (
          <ContentRow key={r.id} progress={progress} row={r} updateData={updateData} />
        )}
      />
    )
  }

  if (contentTypeLowerCase === 'quiz-radio-group') {
    const { radioOptions = '' } = contentProps

    return (
      <QuizRadioGroup
        customQuestionsDataID={dataID}
        radioOptions={radioOptions.split(', ')}
        renderDefaultContentType={({ row: r }) => (
          <ContentRow key={r.id} progress={progress} row={r} updateData={updateData} />
        )}
        rows={nested}
      />
    )
  }

  if (contentTypeLowerCase === 'quiz-checkbox-list') {
    return (
      <QuizCheckboxList
        customQuestionsDataID={dataID}
        renderDefaultContentType={({ row: r }) => (
          <ContentRow key={r.id} progress={progress} row={r} updateData={updateData} />
        )}
        rows={nested}
      />
    )
  }

  if (contentTypeLowerCase === 'subheading') {
    const { text } = contentProps
    return <RubikTextSubHeader className={className}>{text}</RubikTextSubHeader>
  }

  if (contentTypeLowerCase === 'textinput') {
    const { label: placeholder } = contentProps

    return (
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        clearText={() => {
          setInputValue('')
          updateData({ [dataID]: '' })
        }}
        onChangeText={text => setInputValue(text)}
        onBlur={() => updateData({ [dataID]: inputValue })}
        placeholder={placeholder}
        placeholderTextColor="white"
        value={inputValue}
      />
    )
  }

  return null
}

ContentRow.propTypes = {
  pageCount: PropTypes.number,
  row: { ...CONTENT_ROW_PROP_TYPES, disabled: PropTypes.bool, onButtonPress: PropTypes.func }
    .isRequired,
  progress: PropTypes.arrayOf(PropTypes.string),
  updateData: PropTypes.func
}

ContentRow.defaultProps = {
  pageCount: 0,
  progress: [],
  updateData: () => {}
}

export default ContentRow
