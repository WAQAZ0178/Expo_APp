# reactnative-stmikes-before

Application was developed off of boilerplate tabbed navigation for React Native 5.0. It follows the community design patterns
and recommendations. If you're new to this project, package.json will be the the most important file to start.

## Setup Instructions:

1. Clone repository
1. Go to repo home folder in terminal
1. Run commend `npm install`
1. Follow steps in Android - Getting Started and iOS - Getting Started
1. Run command to set enviroment "npm run env:local" (local|dev|uat|prod)
   - **Note: if setting local, follow README for `./local-server`**
   - this will create a `./env.js` file with the associated environment you chose in the root directory. You can find these configs in `./envs` and the script being used to generate `./env.js` in `./tools/set-environment.js`.
1. Run command `npm run start`
1. Metro bundler will block i/o in the terminal
1. Run android/ios/web in another terminal:
   - `npm run android`
   - `npm run ios`
   - `npm run web`

---

## Android - Getting Started

You will need to install Android Studio and set up an Android Virtual Device [AVD](https://developer.android.com/studio/run/managing-avds)

With project cloned, from root change into android directory

```
$ cd android
```

Install bundle dependencies if you have not yet

```
$ bundle install
```

If using Android Studio to build project, open project targetting android folder instead of project root.

## iOS - Getting Started (Mac Only)

You will need to download or update Xcode 12.2 or later to set up an iOS Virtual Device. [Xcode](https://developer.apple.com/xcode/)

Make sure you have cocoapods installed

```
$ sudo gem install cocoapods
```

Once installed, from project root go into the ios folder and install the pods

```
$ cd ios
```

```
$ pod install
```

If using Xcode to build project, open project from ios folder instead of project root.

---

## Firebase Analytics

This project uses firebase analytics for view tracking as well as tracking generic user data based on their selection of Age, Cancer Experience, Province, Assigned Sex

If you do not have the google-services.json or GoogleService-Info.plist you will need to download them and add them to the project.

For Android

- Place `google-sheets.json` file into the `./android/app` directory.

For iOS

- The file will need to be added to the root of the project from Xcode. You can drag and drop the file within Xcode and choose to copy the file to the project.

---

## Deploying with Fastlane:

For more information, visit this [notion doc](https://www.notion.so/qochealth/Setup-Firebase-Fastlane-deployments-e62b00d3b9944edd9355cc12418c443a)

Ensure you have the `google-services.json` file within the flavor you are targetting, for example, if you are targetting the `dev` flavour, add the `google-sheets.json` file into the `./android/app/src/dev` directory.

**Note If targetting local flavor, follow below section first `(ANDROID - LOCAL) Deploy Extra Instructions` Extra before continuing**

To download the `google-sheets.json` file, follow these steps:

1. Visit the [firebase console](https://console.firebase.google.com/)
1. Select your project
1. On the left menu, click on settings > project settings
1. Add an app or download the google-services.json file under the Your Apps section.

Create the release notes specific to the versionName and flavor you are deploying within `./android/fastlane/release-notes`.

- Example: Create `2-2-0.txt` in `./android/fastlane/release-notes/dev` to add release notes for `2.2.0` version and `dev` flavor

Run the following command and replace `{flavor}` with your target flavor and `{versionName}` with your target version name.

```v
$ bundle exec fastlane deploy_firebase flavor:{flavor} versionName:{versionName}
```

For example:

```
$ bundle exec fastlane deploy_firebase flavor:Dev versionName:2.2.0
```

## Local Server

### Prereq

1. Download ngrok if you do not have it [here](https://ngrok.com/download)
1. Move the executable in a directory you will remember
1. Ensure your gmail account is a team member on ngrok (ask someone to add you)
1. Ensure you run this command to authenticate your ngrok agent at least once `./ngrok authtoken {token}`. Replace `{token}` token with your token

### Instructions

In order for the app on the android/iOS device to connect to the server running on your local machine, we will need to use ngrok to expose the port which the server is running on `4000` (default).

1. Open terminal and navigate to directory where the executable is
1. Run `./ngrok http -subdomain=stmikes-before 4000`
1. You should see output like the following to show it is forwarding the port.
1. Run your local server and test it out

```
Session Status                online
Account                       QoC Health Inc. (Plan: Business)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://stmikes-before.ngrok.io -> http://localhost:4000
Forwarding                    https://stmikes-before.ngrok.io -> http://localhost:4000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

## (ANDROID - PROD) Deploying Instructions:

1. Build the prod flavor using fastlane
   ```
   $ cd android
   $ bundle exec fastlane build flavor:Prod buildType:Release
   ```
1. Follow google play store instructions to upload the apk which you can find `./android/app/build/outputs/apk/prod/app-prod-release.apk`

## Troubleshooting

### If when launching the app you receive an error starting with "Unable to Load script ..."

- Try running the command `adb reverse tcp:8081 tcp:8081` in terminal

### Unable to resolve module `../../env.js`

This is due to not running the `/tools/set-environment` file. You can run this file manually `node tool/set-environment.js {env}` replacing `{env}` with the environment of you choosing. I've added convience npm scripts `env:{env}` that you can run and run on other scripts. (ex: `ios` npm script runs `npm run env:dev` before `react-native run-ios`)
