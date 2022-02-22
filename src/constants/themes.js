import { Dimensions, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')

/* Colors */
// Main Color Palette
const darkGrey = '#4A4A4A'
const grey = '#C4C5D6'
const greyText = '#707070'
const white = '#ffffff'
const purple = '#83296B'
const violet = '#434470'
const yellow = '#FCD06A'
const green = '#5BAD3D'
const red = '#CC2D2D'

// Splash
const beforeBlue = '#43456F'

// Other
const tintColor = '#2f95dc'
const warningBackground = '#EAEB5E'
const warningText = '#666804'

export const COLORS = {
  darkGrey,
  grey,
  greyText,
  white,
  purple,
  violet,
  yellow,
  green,
  red,

  // Text
  text: greyText,
  textHeader: purple,
  textSubHeader: violet,
  textHeader3: yellow,
  subHeading: darkGrey,
  subText: darkGrey,
  textFootnote: greyText,

  // Bottom Nav Bar
  bottomNavBarBackground: violet,
  bottomNavBarIcon: grey,
  bottomNavBarIconActive: yellow,

  // Accordion
  accordionHeadingBackground: violet,
  accordionHeading: white,
  accordionHeadingExpanded: yellow,
  accordionContentBackground: violet,
  accordionContent: white,

  // Carousel
  carouselBackground: violet,
  carouselProgressDot: yellow,
  carouselProgressDotInactive: violet,

  // Card
  cardBackground: violet,
  cardTitle: yellow,
  cardContent: white,
  cardInfoColumnContent: yellow,
  cardInfoColumnLabel: white,
  // QuestionCard
  questionCardBackground: grey,
  questionCardContent: darkGrey,
  questionCardTrashIcon: darkGrey,
  // QuestionCheckbox
  questionCheckboxTrashIcon: darkGrey,

  // Button
  buttonBackground: purple,
  buttonBorder: purple,
  buttonDisabledBackground: grey,
  buttonDisabledBorder: grey,
  buttonDisabledText: white,
  buttonDisabledTextLink: grey,
  buttonText: white,
  buttonTextLink: violet,
  miniContent: yellow,
  // RadioButton
  radioButtonCircleBackground: violet,
  radioButtonCircleBorder: violet,
  radioButtonCircleActiveBackground: yellow,
  radioButtonCircleActiveBorder: violet,
  radioButtonLabel: greyText,
  // CheckmarkButton
  checkboxButtonCheckContainerBackground: grey,
  checkboxButtonCheckContainerBorder: grey,
  checkboxButtonCheckContainerActiveBackground: grey,
  checkboxButtonCheckContainerActiveBorder: grey,
  checkboxButtonIcon: violet,
  checkboxButtonLabel: greyText,

  // Progress
  progressBar: yellow,
  progressBarBackground: violet,
  progressBarBorder: violet,

  // Tabbar
  tabBar: violet,
  tabBarDefault: grey,
  tabBarFocused: yellow,

  // Input
  inputIcon: white,
  inputBg: violet,
  inputFeedbackContainerBg: violet,
  inputFeedbackErrorContainerBg: red,
  inputText: white,

  // Dropdown
  dropdownArrowIcon: yellow,
  dropdownBg: violet,
  dropdownText: white,

  // QuizMyself
  quizMyselfHeaderBackground: violet,
  quizMyselfErrorFeedback: red,
  quizMyselfSuccessFeedback: green,
  // QuizMyself - Option Button
  quizMyselfOptionButton: {
    activeBackground: grey,
    activeBorder: violet,
    activeText: violet,
    background: grey,
    border: grey,
    disabledBackground: grey,
    disabledBorder: grey,
    text: violet,
    disabledText: white
  },
  // QuizMyself - Check Button
  quizMyselfCheckButton: {
    activeBackground: purple,
    activeBorder: purple,
    activeText: white,
    background: purple,
    border: purple,
    disabledBackground: grey,
    disabledBorder: grey,
    text: white,
    disabledText: white
  },

  // QuizExercise
  quizExerciseContentBackground: violet,

  // Modal
  modalBackground: purple,
  modalCloseIcon: yellow,
  // AddQuestionModal
  addQuestionModalText: white,
  addQuestionModalInputBackground: white,
  addQuestionModalInputText: darkGrey,
  // AddQuestionModal - Add Button
  addQuestionModalAddButton: {
    background: violet,
    border: violet,
    disabledBackground: grey,
    disabledBorder: grey,
    text: yellow,
    disabledText: white
  },
  // RemoveQuestionModal
  removeQuestionModalText: white,
  // RemoveQuestionModal - No Button
  removeQuestionModalNoButton: {
    background: violet,
    border: violet,
    disabledBackground: grey,
    disabledBorder: grey,
    text: white,
    disabledText: white
  },
  // RemoveQuestionModal - Yes Button
  removeQuestionModalYesButton: {
    background: violet,
    border: violet,
    disabledBackground: grey,
    disabledBorder: grey,
    text: yellow,
    disabledText: white
  },

  beforeBlue,

  tintColor,
  errorBackground: red,
  errorText: white,
  warningBackground,
  warningText,
  noticeBackground: tintColor,
  noticeText: white,
  screenBackground: white
}

/* Fonts */
export const FONT_FAMILY_RUBIK = {
  light: 'Rubik_300Light',
  lightItalic: 'Rubik_300Light_Italic',
  regular: 'Rubik_400Regular',
  regularItalic: 'Rubik_400Regular_Italic',
  medium: 'Rubik_500Medium',
  mediumItalic: 'Rubik_500Medium_Italic',
  bold: 'Rubik_700Bold',
  boldItalic: 'Rubik_700Bold_Italic',
  black: 'Rubik_900Black',
  blackItalic: 'Rubik_900Black_Italic'
}

export const FONTS = {
  rubik: FONT_FAMILY_RUBIK
}

const fontSizes = {
  xxxxsmallXXXSmall: '7px',
  xxxsmall: '8px',
  xxxsmallXXSmall: '9px',
  xxsmall: '10px',
  xxsmallXSmall: '11px',
  xsmall: '12px',
  xsmallSmall: '13px',
  small: '14px',
  smallMedium: '15px',
  medium: '16px',
  mediumLarge: '17px',
  large: '18px',
  largeXLarge: '19px',
  xlarge: '20px',
  xlargeXXLarge: '21px',
  xxlarge: '22px',
  xxlargeXXXLarge: '23px',
  xxxlarge: '24px',
  xxxlargeXXXXLarge: '25px'
}

/* Font Sizes */
export const FONT_SIZES = {
  ...fontSizes,

  // Text
  textHeader: fontSizes.xxlargeXXXLarge,
  textSubHeader: fontSizes.xlarge,
  text: fontSizes.mediumLarge,
  textFootnote: fontSizes.xsmall,
  textHeader3: fontSizes.large,

  // Button
  buttonText: fontSizes.xxlarge,
  buttonLinkText: fontSizes.xlarge,
  bottomNavText: fontSizes.xsmallSmall,
  // Button Icon
  buttonIconText: fontSizes.large,
  // RadioButton
  radioButtonLabel: fontSizes.largeXLarge,
  // CheckboxButton
  checkboxButtonLabel: fontSizes.large,

  // Accordion
  accordionHeading: fontSizes.xlarge,
  accordionContent: fontSizes.smallMedium,

  // Card
  cardTitle: fontSizes.mediumLarge,
  cardDetailButtonText: fontSizes.xsmallSmall,
  cardContent: fontSizes.xsmall,
  cardInfoColumnContent: fontSizes.xxsmallXSmall, // was xxsmall but it's too small
  cardInfoColumnLabel: fontSizes.xxxsmall, // was xxxxsmallXXXSmall but it's tooo small
  // Question Card
  questionCardContent: fontSizes.small,

  // Tabbar
  tabBarLabel: fontSizes.xsmallSmall,

  // Quiz Myself
  quizMyselfOptionButton: {
    text: fontSizes.xlarge
  },
  quizMyselfCheckButton: {
    text: fontSizes.xxlarge
  },
  quizMyselfRadioButtonLabel: fontSizes.xxsmall,
  // AddQuestionModal
  addQuestionModalText: fontSizes.large,
  addQuestionModalAddButtonText: fontSizes.medium,
  // RemoveQuestionModal
  removeQuestionModalText: fontSizes.large,
  removeQuestionModalNoButtonText: fontSizes.medium,
  removeQuestionModalYesButtonText: fontSizes.medium
}

/* Sizes */
export const SIZES = {
  // Input
  inputIcon: 25,
  inputBorderRadius: '20px',
  inputHeight: '50px',

  // Dropdown
  dropdownArrowIcon: 25,
  dropdownBorderRadius: 20,
  dropdownHeight: '50px',

  // RadioButton
  radioButtonCircle: '25px',
  radioButtonCircleBorderRadius: '25px',

  // CheckmarkButton
  checkboxButtonCheckContainer: '38px',
  checkboxButtonCheckContainerBorderRadius: '10px',
  checkboxButtonIcon: 45,

  // Modal
  modalCloseIcon: 30,
  // AddQuestionModal
  addQuestionModalInputBorderRadius: '30px',

  // QuizMyself
  quizMyselfRadioButtonCircle: '21px',
  quizMyselfRadioButtonCircleBorderRadius: '21px',

  // QuestionCard
  questionCardTrashIcon: 25,
  // QuestionCheckbox
  questionCheckboxTrashIcon: 25
}

/* Gutters */
export const gutters = {
  xxxsmall: '2px',
  xxsmall: '5px',
  xsmall: '10px',
  small: '15px',
  medium: '20px',
  large: '25px',
  xlarge: '30px',
  xxlarge: '35px',
  xxxlarge: '40px',
  xxxxlarge: '45px'
}

export const GUTTERS = {
  ...gutters,

  // ScreenContainer
  screenContainerPaddingVertical: gutters.small,
  screenContainerPaddingHorizontal: gutters.xlarge,

  // ScreenWrapper
  screenWrapperPaddingTop: StatusBar.currentHeight || 15,

  // Input
  inputPaddingVertical: '10px',
  inputPaddingHorizontal: '15px'
}

/* Layout */
export const LAYOUT = {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375
}

/* Theme */
export const THEMES = {
  default: {
    colors: COLORS,
    fonts: FONTS,
    fontSizes: FONT_SIZES,
    gutters: GUTTERS,
    layout: LAYOUT,
    sizes: SIZES
  }
}

export default {
  COLORS,
  FONTS,
  LAYOUT,
  SIZES,
  THEMES
}
