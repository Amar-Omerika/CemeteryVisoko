import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {CustomStatusBarColor} from './src/components';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import OrientationLocker from 'react-native-orientation-locker';
import {useSelector} from 'react-redux';
import PreLoader from './src/components/PreLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';
import {Text} from './src/components';
import {useNetInfo} from '@react-native-community/netinfo';

const App = () => {
  const {i18n} = useTranslation();
  const {t} = useTranslation();
  const [isOffline, setIsOffline] = useState(false);
  const {loading} = useSelector(state => state.loader);
  const getSavedLanguage = async () => {
    let lang = await AsyncStorage.getItem('language');
    if (lang) i18n.changeLanguage(lang);
  };
  useEffect(() => {
    NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsOffline(offline);
    });

    getSavedLanguage();
    SplashScreen.hide();
    OrientationLocker.lockToPortrait();
  }, []);

  return (
    <NavigationContainer>
      <CustomStatusBarColor backgroundColor="black" barStyle="light-content" />
      {isOffline ? (
        <View style={localStyles.offlineContainer}>
          <Text style={localStyles.offlineText}>
            {t('noInternetConnection')}
          </Text>
        </View>
      ) : null}
      <AppNavigator />
      <PreLoader isLoading={loading} />
    </NavigationContainer>
  );
};
const localStyles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  offlineText: {
    color: '#fff',
  },
});

export default App;
