# navigation

This is the root directory for navigation.

This is using `react-native-nativigation` 5.x

*Folder Structure*

`./Navigation.js`
  - Exports the navigation stack for the application
  - This also handles any application loading since we have to dynamically change routes based on authentication

`./useLinking.js`
  - Exports a util function to setup deep linking routes
  