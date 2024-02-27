import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Pressable,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {
  Text,
  Container,
  Button,
  SwitchLanguage,
  Divider,
  Layout,
} from '../../components';
import styles from '../../styles';
import {useTranslation} from 'react-i18next';
import {MaterialIcon} from '../../components/Icon';
import Svg, {Path} from 'react-native-svg';
import {ThemeColors} from '../../constants/ThemeColors';
import {
  VisiotLogo,
  SearchIcon,
  SmrtovnicaIcon,
  WebIcon,
  EmailIcon,
  PhoneIcon,
} from '../../assets';

export default function HomeScreen({navigation}) {
  const {fontScale} = useWindowDimensions();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);

  const settingLanguageTitle = newTitle => {
    setVisible(false);
    setTitle(newTitle);
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: ThemeColors.backgroundColorContainer}}>
      <Layout onLeftIconPress={() => navigation.navigate('Home')}>
        <Container style={styles.container}>
          <View>
            {visible ? (
              <Pressable
                onPress={() => setVisible(false)}
                style={localStyles.overlay}>
                <SwitchLanguage setTitle={settingLanguageTitle} />
              </Pressable>
            ) : null}
          </View>

          <View style={localStyles.mainTitleContainer}>
            <Text center typography="bold" fontSize="h3">
              {t('homeScreen.welcome')}
            </Text>

            <Text
              center
              fontSize="h7"
              fontWeight="300"
              style={{textAlign: 'center', marginTop: 24}}>
              {t('homeScreen.introduction')}
            </Text>
          </View>

          <View style={localStyles.mainButtonContainer}>
            <View style={localStyles.buttonContainer}>
              <Button
                icon={<SearchIcon />}
                onPress={() => {
                  navigation.navigate('Tab');
                }}
                buttonStyle={{padding: 24, height: null}}
                backgroundColor="b1"
                backgroundColorPressed="bp1"
                borderRadius="r2"
                width="w2">
                <Text fontSize="body7" fontWeight="300" center>
                  {t('searchScreen.search')}
                </Text>
              </Button>
            </View>
            <View style={localStyles.buttonContainer2}>
              <Button
                icon={<WebIcon />}
                onPress={() => {
                  navigation.navigate('Tab');
                }}
                buttonStyle={{padding: 24, height: null}}
                backgroundColor="b1"
                backgroundColorPressed="bp1"
                borderRadius="r2"
                flex={1}
                width="w1">
                <Text fontSize="h7" fontWeight="300" center>
                  {t('homeScreen.web')}
                </Text>
              </Button>
              <Divider direction="h" />
              <Button
                icon={<SmrtovnicaIcon />}
                onPress={() => {
                  navigation.navigate('Tab');
                }}
                buttonStyle={{padding: 24, height: null}}
                backgroundColor="b1"
                backgroundColorPressed="bp1"
                borderRadius="r2"
                flex={1}
                width="w1">
                <Text fontSize="h7" fontWeight="300" center>
                  {t('homeScreen.smrtovnice')}
                </Text>
              </Button>
            </View>
            <View style={localStyles.moreInformationView}>
              <Text fontSize="h7" fontWeight="300" center>
                {t('homeScreen.moreInformation')}
              </Text>
            </View>
          </View>
          <View style={localStyles.contactInfoContainer}>
            <View style={localStyles.mailView}>
              <EmailIcon style={{marginRight: 16}} />
              <Text color="grey" fontSize="h7" fontWeight="300" center>
                jkpgg@bih.net.ba
              </Text>
            </View>
            <View style={localStyles.phoneView}>
              <PhoneIcon style={{marginRight: 16}} />
              <Text color="grey" fontSize="h7" fontWeight="300" center>
                032 735-001
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 7,
            }}>
            <VisiotLogo width={36} height={35} />
            <Divider direction="h" />
            <View>
              <Text fontSize="body3" fontWeight="200" color="grey">
                Developed by
              </Text>
              <Text fontSize="body3" color="grey">
                Visiot d.o.o. Visoko
              </Text>
            </View>
          </View>
        </Container>
      </Layout>
    </SafeAreaView>
  );
}
const localStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  quoteContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  mainTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '80%',
  },
  mainButtonContainer: {
    flex: 1,
    width: '100%',
  },
  moreInformationView: {
    flex: 1,
    marginTop: '10%',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },
  mailView: {flexDirection: 'row', flex: 1},
  phoneView: {flexDirection: 'row'},
});
