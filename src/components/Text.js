import React from 'react';
import {Text, PixelRatio, useWindowDimensions} from 'react-native';

/**
 * @descriptionDisplays
 * fontSize (optional, default: 'body1'): The size of the font. Choose from predefined sizes like 'h1', 'h2', 'body1', etc.
 * color (optional, default: 'white'): The color of the text. Choose from predefined colors like 'black', 'grey', 'blackMedium', etc.
 * typography (optional, default: 'default'): The font family of the text. Choose from predefined typography options like 'bold', 'italic', etc.
 * style (optional): Additional custom styles to apply to the text element.
 * center (optional, default: false): Determine whether the text should be aligned in the center or left.
 * fontWeights (optional, default: 'normal'): The fontWeights of the text. Choose from predefined fontWeights options like 'normal', '300', etc.
 * @author Amar Omerika
 */

// Constants for font size scaling based on device resolution
const fontSizes = {
  h1: 36,
  h2: 26,
  h3: 24,
  h4: 22,
  h5: 20,
  h6: 17,
  h7: 16,
  body1: 15,
  body2: 14,
  body3: 12,
  body4: 11,
  body5: 30,
  body6: 18,
  body7: 32,
  smallCaps: 8,
};
//font weights
const fontWeights = [
  'normal',
  'bold',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];
// Default colors
const colors = {
  white: '#FFF',
  black: '#000',
  blackLight: '#474646',
  blackMedium: '#231F20',
  grey: '#C4C4C4',
  greyDark: '#949292',
};

// Default typographies
const typographies = {
  default: 'Cantarell-Regular',
  bold: 'Cantarell-Bold',
  italic: 'Cantarell-Italic',
};

const CustomText = ({
  children,
  fontSize = 'body1',
  color = 'white',
  typography = 'default',
  fontWeight = 'normal',
  style = null,
  center = false,
  ...otherProps
}) => {
  // Calculate font scale based on phone settings
  const {fontScale} = useWindowDimensions();

  // Calculate font size with scaling
  const scaledFontSize = fontSizes[fontSize] / fontScale;

  return (
    <Text
      {...otherProps}
      style={[
        {
          fontSize: scaledFontSize,
          color: colors[color],
          fontFamily: typographies[typography],
          textAlign: center ? 'center' : 'left',
          fontWeight: fontWeights.includes(fontWeight) ? fontWeight : 'normal',
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;
