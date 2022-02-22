fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios register_amina
```
fastlane ios register_amina
```

### ios register_yves
```
fastlane ios register_yves
```

### ios create_app
```
fastlane ios create_app
```
Create app in Apple Store Connect & Developer console
### ios sign_app
```
fastlane ios sign_app
```
Code sign
### ios build
```
fastlane ios build
```
Build app based on env
### ios deploy_firebase
```
fastlane ios deploy_firebase
```
Deploy using firebase app distribution

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
