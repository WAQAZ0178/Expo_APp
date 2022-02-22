/* eslint-disable camelcase */
import * as SplashScreen from 'expo-splash-screen'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import * as styledComponents from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import {
  useFonts,
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic
} from '@expo-google-fonts/rubik'

/* constants */
import { THEMES } from './constants'

/* context */
import { Provider as ContentProvider } from './context/ContentContext'

/* navigation */
import Navigation, { useLinking } from './navigation'
import { navigationRef } from './navigation/constants'

/* utils */
import { getLocalDataItem, getLocalProgressItem, loadContent } from './utils/content'

const { default: styled, ThemeProvider } = styledComponents

const StyledAppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.screenBackground};
`

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn) // it's good to explicitly catch and inspect any error

function App() {
  const [initialNavigationState, setInitialNavigationState] = useState()
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [content, setContent] = useState(null)
  const [initialData, setInitialData] = useState(null)
  const [progress, setProgress] = useState({})

  /* See Fonts file in Constants */
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
    Rubik_500Medium_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic
  })
  const { getInitialState } = useLinking(navigationRef)

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const results = await Promise.all([
          loadContent(),
          getLocalDataItem(),
          getLocalProgressItem(),
          getInitialState(),
          Asset.loadAsync([
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png')
          ]),
          Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font
          })
        ])

        // deconstruct
        const [a, b, c, d] = results

        // Load our content, data, and progress into state
        setContent(a)
        setInitialData(b)
        setProgress(c)

        // Load our initial navigation state
        if (d !== undefined) {
          setInitialNavigationState(d)
        }

        // hide splash screen
        await SplashScreen.hideAsync()
      } catch (e) {
        console.warn(e)
      } finally {
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [getInitialState])

  if (!isLoadingComplete || !fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider theme={THEMES.default}>
      <ContentProvider
        content={content}
        initialData={initialData}
        progress={progress}
        setProgress={setProgress}
      >
        <StyledAppContainer>
          <Navigation initialNavigationState={initialNavigationState} progress={progress} />
        </StyledAppContainer>
      </ContentProvider>
    </ThemeProvider>
  )
}

App.propTypes = {}

App.defaultProps = {}

export default App
