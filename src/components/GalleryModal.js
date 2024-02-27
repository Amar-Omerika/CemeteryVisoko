import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import {MaterialIcon, IonIcon} from './Icon';
import Text from '../components/Text';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {ThemeColors} from '../constants/ThemeColors';

const GalleryModal = ({route}) => {
  const currentRoute = useRoute();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const victimPhotos = route?.params?.victimPhotos;

  const [photoId, setphotoId] = useState(0);
  return (
    <View style={localStyles.container}>
      <View style={localStyles.imageContainer}>
        <View style={localStyles.titleContainer}>
          <Text color="white">{t('mapScreen.gallery')}</Text>
          <Pressable
            onPress={() => navigation.goBack()}
            style={localStyles.iconContainer}>
            <IonIcon name="close" color="white" size={30} />
          </Pressable>
        </View>
        {victimPhotos.length !== 0 ? (
          <>
            <View style={localStyles.victimPhotoView}>
              <FastImage
                resizeMode="stretch"
                style={{width: '100%', height: '100%'}}
                //  key={photoId}
                source={{
                  uri: victimPhotos[photoId]?.url,
                  priority: FastImage.priority.high,
                }}
              />
            </View>
            <View style={localStyles.arrowsContainer}>
              <Pressable
                onPress={() => {
                  photoId > 0 ? setphotoId(prev => prev - 1) : null;
                }}
                style={localStyles.iconContainer}>
                <MaterialIcon
                  name="keyboard-arrow-left"
                  color="white"
                  size={30}
                />
              </Pressable>

              <Text color="white">
                {photoId + 1}/{victimPhotos.length}
              </Text>
              <Pressable
                onPress={() => {
                  setphotoId(
                    photoId + 1 < victimPhotos.length ? photoId + 1 : photoId,
                  );
                }}
                style={localStyles.iconContainer}>
                <MaterialIcon
                  name="keyboard-arrow-right"
                  color="white"
                  size={30}
                />
              </Pressable>
            </View>
          </>
        ) : (
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 80,
            }}>
            <Text color="black"> {t('mapScreen.emptyGallery')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: '60%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  titleContainer: {
    backgroundColor: ThemeColors.headerGalleryModalBackgroundColor,
    // paddingVertical: 15,
    //paddingHorizontal: 20,
    height: 55,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowsContainer: {
    backgroundColor: ThemeColors.footerGalleryModalBackgroundColor,
    // paddingVertical: 15,
    //  paddingHorizontal: 20,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  victimPhotoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default GalleryModal;
