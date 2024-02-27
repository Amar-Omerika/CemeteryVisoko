import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Layout, Text, Divider} from '../../components';
import {useTranslation} from 'react-i18next';
import styles from '../../styles';
import {ThemeColors} from '../../constants/ThemeColors';

const PLACEHOLDER_LIST = [
  {id: 1, name: 'Radna jedinica Pogrebne usluge'},
  {id: 2, name: 'Radna jedinica Gradsko zelenilo'},
  {id: 3, name: 'Radna jedinica Klesarija'},
  {id: 4, name: 'Radna jedinica Javna parkirališta'},
  {id: 5, name: 'Radna jedinica Stručna služba'},
];
const AboutUsScreen = ({navigation}) => {
  const {t} = useTranslation();

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <Layout
      noRightIcon
      hasBackButton
      onLeftIconPress={() => navigation.goBack()}>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding: 15}}>
        <Divider />
        <Text fontSize="body3" fontWeight="400" style={localStyles.justifyText}>
          {t('aboutUsScreen.aboutCompany')}
        </Text>
        <Divider />
        {PLACEHOLDER_LIST.map((item, index) => {
          return (
            <Text
              fontSize="body3"
              fontWeight="400"
              key={item.id}
              style={localStyles.justifyText}>
              {index + 1}. {item.name}
            </Text>
          );
        })}
        <Divider />
        <Text fontSize="body3" fontWeight="400" style={localStyles.justifyText}>
          {t('aboutUsScreen.aboutCompanySection2')}
        </Text>
        <Divider />
        <Text
          fontSize="h7"
          fontWeight="700"
          style={[localStyles.justifyText, {alignSelf: 'center'}]}>
          {t('aboutUsScreen.transactionMaintext')}
        </Text>
        <View style={localStyles.centerContentView}>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.transactionAccount1')}
          </Text>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.transactionAccount2')}
          </Text>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.transactionAccount3')}
          </Text>
        </View>
        <Divider />
        <Text
          fontSize="h7"
          fontWeight="700"
          center
          style={[localStyles.justifyText, {alignSelf: 'center'}]}>
          {t('aboutUsScreen.emailMaintext')}
        </Text>
        <View style={localStyles.centerContentView}>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.email1')}
          </Text>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.email2')}
          </Text>
        </View>
        <Divider />
        <Text
          fontSize="h7"
          fontWeight="700"
          center
          style={[localStyles.justifyText, {alignSelf: 'center'}]}>
          {t('aboutUsScreen.adressMaintext')}
        </Text>
        <View style={localStyles.centerContentView}>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.adress')}
          </Text>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.country')}
          </Text>
        </View>
        <Divider />
        <Text
          fontSize="h7"
          fontWeight="700"
          center
          style={[localStyles.justifyText, {alignSelf: 'center'}]}>
          {t('aboutUsScreen.telephoneMainText')}
        </Text>
        <View style={localStyles.centerContentView}>
          <Text
            fontSize="body2"
            fontWeight="300"
            center
            style={localStyles.justifyText}>
            {t('aboutUsScreen.telephoneNumber')}
          </Text>
        </View>
        <Divider />
        <View style={localStyles.centerContentView}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.gradskagroblja.ba/')}>
            <Text
              fontSize="body2"
              fontWeight="300"
              center
              style={localStyles.justifyText}>
              {t('aboutUsScreen.webLink')}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider size={30} />
        <Text
          fontSize="body2"
          fontWeight="300"
          center
          style={localStyles.justifyText}>
          {t('aboutUsScreen.contactCementery')}
        </Text>
        <Text
          fontSize="h7"
          fontWeight="700"
          center
          style={[
            localStyles.justifyText,
            {alignSelf: 'center', color: ThemeColors.buttonBackgroundColor},
          ]}>
          +387 (063) 041 - 474
        </Text>
        <Divider size={30} />
        {/* <Text style={localStyles.justifyText}>{t('aboutUsScreen.goals')}</Text>
        <Divider />
        <Text style={localStyles.justifyText}>
          {t('aboutUsScreen.partnerships')}
        </Text>
        <Divider />
        <Text style={localStyles.justifyText}>{t('aboutUsScreen.art')}</Text>
        <Divider />
        <Text style={localStyles.justifyText}>{t('aboutUsScreen.peace')}</Text>
        <Divider size={30} /> */}
      </ScrollView>
    </Layout>
  );
};

const localStyles = StyleSheet.create({
  justifyText: {
    textAlign: 'justify',
  },
  centerContentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AboutUsScreen;
