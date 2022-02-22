# ProgressBar

This is the root directory for the `ProgressBar` component.
This component uses `styled-components` to style the component.
This component is using `https://github.com/oblador/react-native-progress` library for functionality

_Folder Structure_

`./ProgressBar.js`

- The root js file that defines and exports the main or related components

`./ProgressBar.spec.js` *(TODO)*

- The root js file that defines tests for this component

`./index.js`

- The root js file that exports any components defined within this folder

`./styled.js`

- The root js file that defines Styled Components for this component

_Import/Install_

To use within project, implement the following properties in your `theme.colors`:

- progressBarBorder
- progressBar
- progressBarBackground

Be sure to follow any Import/Install instructions from the Text component for using custom fonts.

_Example Usage_

```js
import ProgressBar from '.'

// Hardcode progress
<ProgressBar progress={0.3} />

// Dynamic progress
const progress = 1/4
<ProgressBar progress={progress} />

// Override custom styled added in styled
const progress = 1/4
<ProgressBar progress={progress} progressbarStyle={{ margin: 30 }} />
```
