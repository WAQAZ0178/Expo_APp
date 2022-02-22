# Button

This is the root directory for the `Text`, `TextHeader`, `RubikText`, `RubikTextHeader`, and `RubikTextHeader` component.
This component uses `styled-components` to style the component.

**Use this component instead of the native Text component to ensure custom fonts are used.**

_Folder Structure_

`./Text.js`

- The root js file that defines and exports the main or related components

`./Text.spec.js` *(TODO)*

- The root js file that defines tests for this component

`./index.js`

- The root js file that exports any components defined within this folder

`./styled.js`

- The root js file that defines Styled Components for this component

_Import/Install_

Implement the following properties in your `theme.colors`:

- text
- textSubHeader
- textHeader

Implement the following properties in your `theme.fontSizes`:

- text
- textSubHeader
- textHeader

Implement your custom font in your theme `theme.fonts`. Example:

```js
theme: {
  fonts: {
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
}
```

Load the custom fonts on app load

_Example Usage_

```js
import Text, { TextHeader, RubikText, RubikTextHeader, RubikTextSubHeader } from '.'

// Use the default font
<Text>Text</Text>

// Use the default font with styles
<Text style={{ fontWeight: 'bold' }}>Text Bolded</Text>
<Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Regular Bold Italics</Text>

// Choose to not include styles for gutters
<Text useGutters={false}>Text</Text>

// Use `TextHeader`
<TextHeader>Header</TextHeader>

// Superset of Text - Use the Rubik font
<RubikText>Rubik Font</RubikText>

// Use the Rubik font with styles
// (should dynamically populate font weight options based on font)
<RubikText fontWeight="light|regular|medium|bold|black" italics>Styled Rubik Text</RubikText>
<RubikText fontWeight="light">Light Rubik</RubikText>
<RubikText fontWeight="light" italics>
  Light Italics Rubik
</RubikText>
<RubikText fontWeight="regular">Regular Rubik</RubikText>
<RubikText fontWeight="regular" italics>
  Regular Italics Rubik
</RubikText>
<RubikText>Regular Default Rubik</RubikText>
<RubikText italics>Regular Default Italics Rubik</RubikText>
<RubikText fontWeight="medium">Medium Rubik</RubikText>
<RubikText fontWeight="medium" italics>
  Medium Italics Rubik
</RubikText>
<RubikText fontWeight="bold">Bold Rubik</RubikText>
<RubikText fontWeight="bold" italics>
  Bold Italics Rubik
</RubikText>
<RubikText fontWeight="black">Black Rubik</RubikText>
<RubikText fontWeight="black" italics>
  Black Italics Rubik
</RubikText>
<RubikText fontWeight="asdasdasdasdad">Error should default regular</RubikText>

// Superset of RubikText - Use `RubikTextHeader`
<RubikTextHeader>RubikTextHeader</RubikTextHeader>

// Superset of RubikText - Use `RubikTextSubHeader`
<RubikTextSubHeader>RubikTextSubHeader</RubikTextSubHeader>
```
