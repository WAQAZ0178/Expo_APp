# Button

This is the root directory for the `Accordion` component.
This component uses `styled-components` to style the component.

_Folder Structure_

`./Accordion.js`

- The root js file that defines and exports the main or related components

`./Accordion.spec.js` *(TODO)*

- The root js file that defines tests for this component

`./index.js`

- The root js file that exports any components defined within this folder

`./styled.js`

- The root js file that defines Styled Components for this component

_Import/Install_

To use within project, implement the following properties in your `theme.colors`:

- accordionContentBackground
- accordionContent
- accordionHeading
= accordionHeadingBackground
- accordionHeadingExpanded

Implement the following properties in your `theme.fontSizes`:

- accordionHeading
- accordionContent

_Example Usage_

```js
import Accordion from '.'
import Text, { RubikText } from '../Text'

// use header string and render props for content
<Accordion header={header} style={style}>
  {({ open, textStyle }) => (
    <>
      <Text style={textStyle}>Noraml font</Text>
      <RubikText style={textStyle}>Custom font</RubikText>
    </>
  )}
</Accordion>

// Use render props for header and content
<Accordion
  renderHeader={({ open, textStyle }) => (
    <View>
      <RubikText useGutters={false} style={textStyle}>
        Header
      </RubikText>
    </View>
  )}
>
  {({ open, textStyle }) => (
    <>
      <Text style={textStyle}>Noraml font</Text>
      <RubikText style={textStyle}>Custom font</RubikText>
    </>
  )}
</Accordion>
```
