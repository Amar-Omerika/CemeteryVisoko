import React from 'react';
import {View, StatusBar, StyleSheet, Platform} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;

/**
 * @descriptionDisplays
 * backgroundColor (required): The color you want to set for the status bar background.
 * barStyle (optional, default: 'light-content'): The style of the status bar content. Possible values are 'light-content', 'dark-content', or 'default'.
 * translucent (optional, default: true): Decide whether the status bar should be translucent or not. Set to true for a translucent status bar, or false for an opaque status bar.
 * @author Amar Omerika
 */

const CustomStatusBarColor = ({
  backgroundColor,
  barStyle = 'light-content',
  translucent = true,
}) => {
  return (
    <View style={[styles.statusBarStyle, {backgroundColor}]}>
      <StatusBar
        translucent={translucent}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarStyle: {
    height: STATUSBAR_HEIGHT,
  },
});

export default CustomStatusBarColor;
