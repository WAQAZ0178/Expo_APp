export const getFontFamily = ({ fontName, fontKey, theme }) => {
  if (theme.fonts[fontName] && fontKey) {
    const font = theme.fonts[fontName]
    const fontFamily = font[fontKey] || font?.regular

    return fontFamily ? `font-family: ${fontFamily};` : ''
  }

  return ''
}
