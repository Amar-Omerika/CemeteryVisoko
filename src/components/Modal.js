import React from 'react';
import {
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, Divider} from '.';
import {useTranslation} from 'react-i18next';
const Modal = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  closeModal = () => {
    navigation.navigate('SearchResults');
  };

  return (
    <Pressable onPress={() => closeModal()} style={localStyles.container}>
      <Pressable
        style={[
          localStyles.modal,
          Platform.OS === 'android' && {paddingHorizontal: 10},
        ]}
        onPress={() => closeModal()}>
        <Text center fontSize="h5">
          {t('searchResultsScreen.unknownLocation')}
        </Text>
        <Divider size={30} />
        <Text fontSize="h5">{t('searchResultsScreen.close')}</Text>
      </Pressable>
    </Pressable>
  );
};

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '70%',
    height: '25%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
});

export default Modal;
