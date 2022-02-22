import { createRef } from 'react'

export const navigationRef = createRef()

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export const publicRoutes = {
  Introduction: 'introduction',
  Onboarding: 'onboarding',
  Profile: 'profile',
  Home: 'home',
  Content: 'content',
  ContentArea: 'content-area',
  ContentAreaSuccess: 'content-area-success',
  Activity: 'activity',
  Glossary: 'glossary',
  Resources: 'resources',
  AboutUs: 'about-us',
  Recognition: 'recognition',
  Disclaimer: 'disclaimer'
}

export const allRoutes = publicRoutes
