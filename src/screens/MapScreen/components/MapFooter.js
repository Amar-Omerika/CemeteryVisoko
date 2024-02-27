import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {Text, Divider, Button} from '../../../components';
import {IonIcon, FontAwesome} from '../../../components/Icon';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {ThemeColors} from '../../../constants/ThemeColors';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const MapFooter = ({panY, mapHeight, handleOnGalleryClick, hide, setHide}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {height} = useWindowDimensions();
  const [arrowUp, setArrowUp] = useState(false);

  const {
    imePrezime,
    datumRodjenja,
    datumStradanja,
    mjestoRodjenja,
    datumUkopa,
  } = useSelector(state => state.podaci);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (evt, context) => {
      context.startY = panY.value;
    },
    onActive: (evt, context) => {
      panY.value = context.startY + evt.translationY;
    },
    onEnd: () => {
      if (panY.value > -10) {
        panY.value = withTiming(200);
      } else {
        panY.value = withTiming(-200);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          panY.value,
          [0, 110],
          [0, 110],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));
  if (imePrezime === '' || datumRodjenja === '' || datumStradanja === '') {
    return null;
  }

  return (
    <PanGestureHandler
      onBegan={() => {
        setHide(false);
      }}
      onEnded={() => {
        panY.value > 0 ? setArrowUp(true) : setArrowUp(false);
      }}
      onActive={() => {
        setHide(false);
      }}
      onGestureEvent={gestureHandler}>
      <Animated.View //60 is header and -130 is how much you want it up from the bottom
        style={[
          localStyles.container,
          {
            top: mapHeight
              ? mapHeight +
                34 -
                (!hide
                  ? Platform.OS === 'ios'
                    ? 230
                    : 250
                  : Platform.OS === 'ios'
                  ? 130
                  : 140)
              : height,
            backgroundColor: 'white',
          },
          animatedStyle,
        ]}>
        <View style={localStyles.innerContainer}>
          <Pressable
            onPress={() => (panY.value = withTiming(-100))}
            style={{width: '100%'}}>
            <View
              style={{
                width: '100%',
                paddingVertical: 5,
                alignItems: 'center',
              }}>
              <FontAwesome
                name={arrowUp || hide ? 'caret-up' : 'caret-down'}
                color="black"
                size={35}
              />
            </View>
            <Text
              center
              fontSize="h4"
              style={{color: ThemeColors.blackMedium}}
              typography="bold">
              {imePrezime}
            </Text>
            <Text style={{marginBottom: 15}} center color="blackMedium">
              {t('mapScreen.yearOfBirth')} {datumRodjenja}
            </Text>
          </Pressable>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Text typography="bold" color="blackMedium" typography="bold">
                {t('mapScreen.placeOfBirth')}
              </Text>
            </View>
            <View>
              <Text color="blackMedium">{mjestoRodjenja}</Text>
            </View>
          </View>

          <Divider size={6} />
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-evenly',
              // backgroundColor: 'blue',
            }}>
            {/* <Divider size={25} /> */}
            <Divider size={15} />
            <Button
              onPress={handleOnGalleryClick}
              backgroundColor="b1"
              backgroundColorPressed="bp1"
              borderRadius="r2"
              buttonStyle={{
                height: 22,
                alignSelf: 'center',
              }}
              width="w1">
              <Text
                fontSize="h7"
                style={{
                  color: ThemeColors.white,
                }}>
                {t('mapScreen.seeGallery')}
              </Text>
            </Button>
            {/* <Pressable
              onPress={handleOnGalleryClick}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                {t('mapScreen.seeGallery')}
              </Text> */}
            {/**dummyPhotos?.slice(0, 3).map(photo => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('GalleryModal', {
                      initialPhotoId: photo.id,
                    })
                  }
                  style={[
                    {
                      marginRight: photo.id === dummyPhotos.length - 1 ? 5 : 20,
                    },
                    localStyles.singleImageContainer,
                  ]}>
                  <Image
                    resizeMode="stretch"
                    style={{width: 55, height: 55}}
                    source={photo.url}
                  />
                </Pressable>
                ))**/}
            {/**<Pressable
                style={{
                  height: 55,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('GalleryModal')}>
                <IonIcon
                  name="ios-arrow-forward-outline"
                  size={30}
                  color="gray"
                />
              </Pressable>*/}
            {/* </Pressable> */}
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const localStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  singleImageContainer: {
    backgroundColor: 'yellow',
    width: 55,
    height: 55,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
export default MapFooter;
