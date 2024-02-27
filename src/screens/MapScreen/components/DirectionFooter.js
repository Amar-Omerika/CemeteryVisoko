import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {Text} from '../../../components';
import {useTranslation} from 'react-i18next';

const DirectionFooter = () => {
  const {parcela, red, grobnoMjesto} = useSelector(state => state.podaci);
  const {t} = useTranslation();
  if (parcela === '' || red === '' || grobnoMjesto === '') return null;
  return (
    <View
      style={[
        localStyles.container,
        Platform.OS === 'ios' && {paddingBottom: 30},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={localStyles.center}>
          <Text color="black">{t('mapScreen.plot')}</Text>
          <Text color="black" fontSize="h4" typography="bold">
            {parcela}
          </Text>
        </View>
        <View style={localStyles.center}>
          <Text color="black">{t('mapScreen.row')}</Text>
          <Text color="black" fontSize="h4" typography="bold">
            {red}
          </Text>
        </View>
        <View style={localStyles.center}>
          <Text color="black">{t('mapScreen.graveSite')}</Text>
          <Text color="black" fontSize="h4" typography="bold">
            {grobnoMjesto}
          </Text>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    width: '33%',
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#fff',
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
export default DirectionFooter;
