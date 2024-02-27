import React from 'react';
import {View} from 'react-native';

/**
 * @descriptionDisplays
 * size (optional, default: 15): Specifies the height (for vertical dividers) or width (for horizontal dividers) of the divider.
 * direction (optional, default: 'vertical'): Determines the direction of the divider. Use 'v' for vertical dividers and 'h' for horizontal dividers.
 * color (optional, default: 'black'): Sets the background color of the divider.
 * thickness (optional, default: 0): Specifies the thickness of the divider.
 * customStyle (optional): Allows you to pass additional custom styles to the Divider component.
 * width (optional): Specifies a custom width for the divider, overriding the size prop for vertical dividers.
 * height (optional): Specifies a custom height for the divider, overriding the size prop for horizontal dividers.
 * @author Amar Omerika
 */

const Divider = ({
  size = 15,
  direction = 'v',
  color = 'black',
  thickness = 0,
  customStyle = {},
  width = null,
  height = null,
}) => {
  const dividerStyle = {
    backgroundColor: color,
    width: width !== null ? width : direction === 'v' ? thickness : size,
    height: height !== null ? height : direction === 'v' ? size : thickness,
    ...customStyle,
  };

  return <View style={dividerStyle} />;
};

export default Divider;
