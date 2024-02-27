import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ThemeColors} from '../constants/ThemeColors';
import {Text} from '.';

const btnWidth = {
  w1: '50%',
  w2: '100%',
};
const btnRadius = {
  r1: 10,
  r2: 20,
};
const btnBackground = {
  // b1: '#3A3A3A',
  // b2: 'transparent',
  // b3: '#E5E5E5',
  // b4: '#121111',
  b1: ThemeColors.buttonBackgroundColor,
};
const btnBackgroundPressed = {
  // bp1: '#332d2e',
  bp1: ThemeColors.buttonBackgroundPressedColor,
};

const btnBorderWidth = {
  bw1: null,
  bw2: 1.5,
};

const btnBorderColor = {
  bc1: null,
  bc2: '#fff',
};

const Button = ({
  backgroundColor = 'red',
  backgroundColorPressed = '#75bb8a',
  children,
  onPress = () => {},
  buttonStyle = null,
  width = '100%',
  borderRadius = null,
  borderColor = null,
  borderWidth = null,
  icon = null,
  flex = null,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      {
        backgroundColor: pressed
          ? btnBackgroundPressed[backgroundColorPressed]
          : btnBackground[backgroundColor],
      },
      {flex: flex},
      localStyles.btnStyle,
      {...buttonStyle},
      {
        width: btnWidth[width],
        borderRadius: btnRadius[borderRadius],
        borderColor: btnBorderColor[borderColor],
        borderWidth: btnBorderWidth[borderWidth],
      },
    ]}>
    {icon && <View style={localStyles.iconStyle}>{icon}</View>}
    {children}
  </Pressable>
);

const localStyles = StyleSheet.create({
  btnStyle: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconStyle: {
    marginRight: 16,
  },
});
export default Button;
