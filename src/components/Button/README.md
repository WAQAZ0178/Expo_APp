# Button

This is the root directory for the `Button`, `ButtonLink`, and `RoundedButton` component.
This component uses `styled-components` to style the component.

**Use this component instead of the native Button component along with the `text` prop to use react native default font or provide the custom Text you wish to use (ex: `RubikText`) component within the `components` folder as the child to ensure custom fonts are used.**

_Folder Structure_

`./Button.js`

- The root js file that defines and exports the main or related components

`./Button.spec.js` *(TODO)*

- The root js file that defines tests for this component

`./index.js`

- The root js file that exports any components defined within this folder

`./styled.js`

- The root js file that defines Styled Components for this component

_Import/Install_

To use within project, implement the following properties in your `theme.colors`:

- buttonBackground
- buttonBorder
- buttonDisabledBackground
- buttonDisabledBorder
- buttonDisabledText
- buttonDisabledTextLink
- buttonText
- buttonTextLink

Implement the following properties in your `theme.fontSizes`:

- buttonText
- buttonLinkText

Be sure to follow any Import/Install instructions from the Text component for using custom fonts.

_Example Usage_

```js
import Button, { ButtonLink, RoundedButton } from '.'
import Text, { RubikText } from '../Text'

// Use ButtonLink children for text
<ButtonLink><Text>Hi</Text></ButtonLink>

// Use ButtonLink children for custom Rubik Text (or any you create)
<ButtonLink><RubikText>Hi</RubikText></ButtonLink>

// Use ButtonLink default text - You can use the same props for text since it uses the same default text component
<ButtonLink text="hi" />

// Convienent underlineText prop to avoid overriding style
<ButtonLink text="hi" underlineText={false} />

// Use RoundedButton - you can use any `Button` config since it's a superset of button
<RoundedButton text="hi" />

// Provide children for text
<Button><Text>Hi</Text></Button>

// Provide children for custom Rubik Text (or any you create)
<Button><RubikText>Hi</RubikText></Button>

// Use default text
<Button text="hi" />

// Use any props you would on a regular Button from react-native like onPress
<Button onPress={() => console.log('pressed')} text="hi" />
```
