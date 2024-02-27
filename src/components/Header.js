import React from 'react';
import {StyleSheet, View, Pressable, SafeAreaView} from 'react-native';
import {MaterialIcon} from './Icon';
import {useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ThemeColors} from '../constants/ThemeColors';

/**
 * @descriptionDisplays
 * hasBackButton (optional, default: false): Show a back button on the left side of the header. When clicked, it triggers the onLeftIconPress function.
 * onLeftIconPress (optional): Callback function to handle the press event when the left icon (back button) is pressed.
 * leftIcon (optional): A custom React element to be displayed on the left side of the header. When clicked, it triggers the onLeftIconPress function.
 * onRightButtonPress (optional): Callback function to handle the press event when the right icon is pressed. If not provided, a default behavior navigates to the "AboutUs" screen.
 * rightIcon (optional): A custom React element to be displayed on the right side of the header. When clicked, it triggers the onRightButtonPress function.
 * noRightIcon (optional, default: false): If true, hides the right icon from the header.
 * logoComponent (optional): A custom React element to be displayed in the center of the header, replacing the default logo.
 * backButtonIconColor (optional, default: 'white'): Customize the color of the back button icon.
 * infoIconColor (optional, default: 'white'): Customize the color of the info icon.
 * headerContainerStyle (optional): Apply custom styles to the header container.
 * leftCntainerStyle (optional): Apply custom styles to the left container.
 * centerContainerStyle (optional): Apply custom styles to the center container.
 * rightContainerStyle (optional): Apply custom styles to the right container.
 * @author Amar Omerika
 */

const Header = ({
  hasBackButton = false,
  onLeftIconPress,
  leftIcon,
  onRightButtonPress,
  noRightIcon = false,
  rightIcon,
  logoComponent,
  leftContainerStyle,
  centerContainerStyle,
  rightContainerStyle,
  headerContainerStyle,
  backButtonIconColor = 'white',
  infoIconColor = 'white',
}) => {
  const navigation = useNavigation();

  const renderLeftContent = () => {
    if (hasBackButton) {
      return (
        <Pressable onPress={onLeftIconPress}>
          <IonIcon
            name="ios-chevron-back-outline"
            size={38}
            color={backButtonIconColor}
          />
        </Pressable>
      );
    } else if (leftIcon) {
      return <Pressable onPress={onLeftIconPress}>{leftIcon}</Pressable>;
    } else {
      return null;
    }
  };

  const renderRightContent = () => {
    if (noRightIcon) {
      return null;
    } else if (rightIcon) {
      return <Pressable onPress={onRightButtonPress}>{rightIcon}</Pressable>;
    } else {
      return (
        <Pressable
          onPress={
            onRightButtonPress || (() => navigation.navigate('AboutUs'))
          }>
          <MaterialIcon name="info" size={35} color={infoIconColor} />
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.headerContainer, headerContainerStyle]}>
      <View style={[styles.container, {leftContainerStyle}]}>
        <View style={[styles.leftContainer, leftContainerStyle]}>
          {renderLeftContent()}
        </View>
        {/* <View style={[styles.centerContainer, centerContainerStyle]}>
          {logoComponent || <LogoMezar width={70 * 1.768} height={70} />}
        </View> */}
        <View style={[styles.rightContainer, rightContainerStyle]}>
          {renderRightContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 75,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: '3%',
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: ThemeColors.backgroundHeaderColor,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: '25%',
    alignItems: 'flex-start',
  },
  centerContainer: {
    width: '50%',
    alignItems: 'center',
  },
  rightContainer: {
    width: '25%',
    alignItems: 'flex-end',
  },
});

export default Header;
