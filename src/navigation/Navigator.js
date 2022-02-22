/* eslint-disable react/prop-types */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/* components */
import Header from '../components/Header'
import TabBarLabel from '../components/TabBar/TabBarLabel'
import TabBarIcon from '../components/TabBar/TabBarIcon'
import TabBar from '../components/TabBar'

/* screens */
import AboutUsScreen from '../screens/AboutUsScreen'
import ContentAreaScreen from '../screens/ContentAreaScreen'
import ContentAreaSuccessScreen from '../screens/ContentAreaSuccessScreen'
import ContentScreen from '../screens/ContentScreen'
import DisclaimerScreen from '../screens/DisclaimerScreen'
import ExercisesScreen from '../screens/ExercisesScreen'
import GlossaryScreen from '../screens/GlossaryScreen'
import HomeScreen from '../screens/HomeScreen'
import IntroductionScreen from '../screens/IntroductionScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RecognitionScreen from '../screens/RecognitionScreen'
import ResourcesScreen from '../screens/ResourcesScreen'
import ResourcesNationalScreen from '../screens/ResourcesNationalScreen'
import ResourcesProvincialScreen from '../screens/ResourcesProvincialScreen'

/* utils */
import devicesWithNotch from '../utils/hasNotch'

// Navigators
const IntroductionStack = createStackNavigator()
const OnboardingStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const HomeStack = createStackNavigator()
const ContentStack = createStackNavigator()
const ExercisesStack = createStackNavigator()
const GlossaryStack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Navigator(props) {
  const { introductionComplete, onboardComplete, profileComplete } = props
  const [notchAdjustment, setNotchAdjustment] = useState(0)
  const insets = useSafeAreaInsets()
  const padTop = insets.top + notchAdjustment

  useEffect(() => {
    let obj = devicesWithNotch.find(o => o.model === Device.modelName)
    if (Platform.OS === 'android' && obj !== undefined) {
      setNotchAdjustment(10)
    }
  }, [])

  if (!introductionComplete) {
    return (
      <IntroductionStack.Navigator initialRouteName="Introduction">
        <IntroductionStack.Screen
          name="Introduction"
          component={IntroductionScreen}
          options={{ header: () => null }}
        />
      </IntroductionStack.Navigator>
    )
  }
  if (!onboardComplete) {
    return (
      <OnboardingStack.Navigator initialRouteName="Onboarding">
        <OnboardingStack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ header: () => null }}
        />
      </OnboardingStack.Navigator>
    )
  }
  if (!profileComplete) {
    return (
      <ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ header: () => null }}
          initialParams={{ showNext: true }}
        />
      </ProfileStack.Navigator>
    )
  }

  const HomeStackScreens = () => (
    <HomeStack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: screenProps => <Header {...screenProps} padTop={padTop} />
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          headerTitle: 'The Team'
        }}
      />
      <HomeStack.Screen name="Disclaimer" component={DisclaimerScreen} />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerRight: () => null }}
      />
      <HomeStack.Screen
        name="Recognition"
        component={RecognitionScreen}
        options={{ headerTitle: 'Recognition & Sources' }}
      />
      <HomeStack.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{
          headerTitle: 'Resources'
        }}
      />
      <HomeStack.Screen
        name="ResourcesProvincial"
        component={ResourcesProvincialScreen}
        options={{ headerTitle: 'Provincial Resource' }}
      />
      <HomeStack.Screen
        name="ResourcesNational"
        component={ResourcesNationalScreen}
        options={{
          headerTitle: 'National Resources'
        }}
      />
      <ContentStack.Screen
        name="ContentArea"
        component={ContentAreaScreen}
        options={{
          headerTitle: ''
        }}
      />
    </HomeStack.Navigator>
  )

  const ContentStackScreens = () => (
    <ContentStack.Navigator
      initialRouteName="Content"
      screenOptions={{
        header: () => null
      }}
    >
      <ContentStack.Screen name="Content" component={ContentScreen} />
      <ContentStack.Screen
        name="ContentAreaSuccess"
        component={ContentAreaSuccessScreen}
        options={{ header: () => null }}
      />
      <ContentStack.Screen
        name="ContentArea"
        component={ContentAreaScreen}
        options={{
          header: screenProps => <Header {...screenProps} showUserIcon={false} padTop={padTop} />
        }}
      />
    </ContentStack.Navigator>
  )

  const ExercisesStackScreens = () => (
    <ExercisesStack.Navigator
      initialRouteName="Exercises"
      screenOptions={{
        header: screenProps => <Header {...screenProps} showUserIcon={false} padTop={padTop} />
      }}
    >
      <ExercisesStack.Screen name="Exercises" component={ExercisesScreen} />
      <ContentStack.Screen name="ContentArea" component={ContentAreaScreen} />
    </ExercisesStack.Navigator>
  )

  const GlossaryStackScreens = () => (
    <GlossaryStack.Navigator
      initialRouteName="Glossary"
      screenOptions={{
        header: () => null
      }}
    >
      <GlossaryStack.Screen name="Glossary" component={GlossaryScreen} />
    </GlossaryStack.Navigator>
  )

  return (
    <Tab.Navigator tabBar={tabProps => <TabBar padBot={insets.bottom} {...tabProps} />}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreens}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>HOME</TabBarLabel>
        }}
      />
      <Tab.Screen
        name="Content"
        component={ContentStackScreens}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="content" />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>CONTENT</TabBarLabel>
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ExercisesStackScreens}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="activity" />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>ACTIVITY</TabBarLabel>
        }}
      />
      <Tab.Screen
        name="Glossary"
        component={GlossaryStackScreens}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="glossary" />,
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused}>GLOSSARY</TabBarLabel>
        }}
      />
    </Tab.Navigator>
  )
}

Navigator.propTypes = {
  introductionComplete: PropTypes.bool,
  onboardComplete: PropTypes.bool,
  profileComplete: PropTypes.bool
}
Navigator.defaultProps = {
  introductionComplete: false,
  onboardComplete: false,
  profileComplete: false
}

export default Navigator
