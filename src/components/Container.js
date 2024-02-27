import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {background} from '../assets';
import {ThemeColors} from '../constants/ThemeColors';

/**
 * @descriptionDisplays
 * Allow users to disable the SafeAreaView if needed.
 * Allow to pass custom styling if needed
 * @author Amar Omerika
 */

const Container = ({children, style, useSafeArea = true}) => {
  const ContainerComponent = useSafeArea ? SafeAreaView : View;

  return (
    <ContainerComponent style={[styles.container, style]}>
      {children}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.backgroundColorContainer,
  },
});

export default Container;
