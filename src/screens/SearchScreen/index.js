import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  BackHandler,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {Text, Button, Divider, Layout, TextInput} from '../../components';
import apiRequest from '../../helpers/apiRequest';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIme,
  setPrezime,
  setImeOca,
} from '../../redux/actions/pretragaActions';
import {setLoading} from '../../redux/actions/loadingActions';
import {API_KEY} from '@env';
import {useTranslation} from 'react-i18next';
import {ThemeColors} from '../../constants/ThemeColors';

const SearchScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {ime, prezime, imeOca} = useSelector(state => state.pretraga);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useDispatch();
  const handleBackPress = () => true;
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      backHandler.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const search = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiRequest({
        method: 'get',
        url: `?ime=${ime}&prezime=${prezime}&imeOca=${imeOca}`,
        headers: {'API-KEY': `${API_KEY}`},
      });
      dispatch(setLoading(false));
      navigation.navigate('SearchResults', {results: response.data || []});
    } catch (err) {
      dispatch(setLoading(false));
      return null;
    }
  };

  return (
    <Layout hasBackButton onLeftIconPress={() => navigation.navigate('Home')}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={localStyles.container}>
        <Divider />

        <Text
          style={[isKeyboardVisible && localStyles.marginBottom]}
          center
          typography="bold"
          fontSize="h4">
          {t('searchScreen.enterSearchParams')}
        </Text>
        {isKeyboardVisible ? null : (
          <View style={localStyles.infoContainer}>
            <Text center fontSize="h7">
              {t('searchScreen.enteringMoreParams')}
            </Text>
            <Divider />
          </View>
        )}

        <TextInput
          search={search}
          placeholder={t('searchScreen.nameOptional')}
          value={ime}
          onChangeText={text => dispatch(setIme(text))}
          onPress={() => dispatch(setIme(''))}
        />
        <Divider />
        <TextInput
          search={search}
          placeholder={t('searchScreen.surnameOptional')}
          value={prezime}
          onChangeText={text => dispatch(setPrezime(text))}
          onPress={() => dispatch(setPrezime(''))}
        />
        <Divider />
        <TextInput
          search={search}
          placeholder={t('searchScreen.fathersNameOptional')}
          value={imeOca}
          onChangeText={text => dispatch(setImeOca(text))}
          onPress={() => dispatch(setImeOca(''))}
        />
        <View style={localStyles.buttonContainer}>
          {ime !== '' || prezime !== '' || imeOca !== '' ? (
            <Button
              onPress={search}
              backgroundColor="b1"
              btnBackground="b1"
              backgroundColorPressed="bp1"
              borderRadius="r2"
              width="w1">
              <Text fontSize="h4" center>
                {t('searchScreen.search')}
              </Text>
            </Button>
          ) : (
            <View style={localStyles.disabledButtonContainer}>
              <Text fontSize="h4" center>
                {t('searchScreen.search')}
              </Text>
            </View>
          )}
        </View>
        <Divider size={40} />
      </ScrollView>
    </Layout>
  );
};

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  marginBottom: {
    marginBottom: 30,
  },
  infoContainer: {
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  disabledButtonContainer: {
    backgroundColor: ThemeColors.buttonBackgroundColor,
    width: '50%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    opacity: 0.7,
  },
});

export default SearchScreen;
