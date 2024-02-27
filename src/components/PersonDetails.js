import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Divider from './Divider';
import Text from './Text';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {setCoords} from '../redux/actions/coordActions';
import {useDispatch} from 'react-redux';
import {setPodaci} from '../redux/actions/podaciActions';
import {setLoading} from '../redux/actions/loadingActions';
import {useTranslation} from 'react-i18next';

const PersonDetails = ({name, date, lat, long, item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const onPress = () => {
    dispatch(setCoords({lat, long}));
    dispatch(
      setPodaci({
        imePrezime: item.ime_prezime,
        datumRodjenja: item.godina_rodjenja,
        // datumStradanja: item.datum_stradanja,
        red: item.red,
        grobnoMjesto: item.grobno_mjesto,
        parcela: item.parcela,
        // datumUkopa: item.datum_ukopa,
        mjestoRodjenja: item.mjesto_rodjenja,
        // mjestoStradanja: item.mjesto_stradanja,
        idGrobnogMjesta: item.id_grobnog_mjesta,
      }),
    );

    if (lat === 1 && long === 1) {
      dispatch(setLoading(false));
      navigation.navigate('Modal');
    } else {
      dispatch(setLoading(true));
      navigation.navigate('MapStack', {
        params: {screen: 'Map', params: {lat, long}},
      });
    }
  };
  return (
    <View style={localStyles.container}>
      <View style={localStyles.detailsContainer}>
        <View style={localStyles.info}>
          <Divider />
          <Text color="black" fontSize="body6">
            {name}
          </Text>
          <Divider />
          <Text color="black" fontSize="body6">
            {t('mapScreen.yearOfBirth')} {date}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={localStyles.additionalInfo}>
        <View style={localStyles.button}>
          <Button
            backgroundColor="b1"
            borderRadius="r2"
            width="w2"
            onPress={onPress}>
            <Text color="white" fontSize="h6">
              {t('searchResultsScreen.open')}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    borderRadius: 15,
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  info: {
    width: '100%',
    alignItems: 'center',
  },
  additionalInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sector: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    width: '100%',
    paddingHorizontal: '10%',
  },
});

export default PersonDetails;
