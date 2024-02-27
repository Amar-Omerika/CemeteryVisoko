import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, BackHandler} from 'react-native';
import {Text, PersonDetails, Divider, Layout} from '../../components';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const SearchResultsScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const {ime, imeOca, prezime} = useSelector(state => state.pretraga);
  const handleBackPress = () => {
    navigation.navigate('Search');
    return true;
  };

  const upperCaseFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const lowerCaseAllWordsExceptFirstLetters = string => {
    return string.replace(/\S*/g, function (word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
    });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <Layout hasBackButton onLeftIconPress={() => navigation.navigate('Search')}>
      <View style={localStyles.mainContainer}>
        <FlatList
          data={route.params.results}
          ListHeaderComponent={
            <>
              <Divider />
              {ime === '' && imeOca === '' && prezime === '' ? (
                <View style={localStyles.info}>
                  <Text color="white" fontSize="h3">
                    {t('searchResultsScreen.allResults')}
                  </Text>
                </View>
              ) : (
                <View style={localStyles.info}>
                  <Text color="white" center fontSize="h4">
                    {t('searchResultsScreen.resultsFor')}
                  </Text>
                  <Text color="white" typography="bold" center fontSize="body5">
                    {upperCaseFirstLetter(
                      lowerCaseAllWordsExceptFirstLetters(ime),
                    )}
                    {imeOca !== ''
                      ? ` (${upperCaseFirstLetter(
                          lowerCaseAllWordsExceptFirstLetters(imeOca),
                        )}) `
                      : ' '}
                    {prezime}
                  </Text>
                </View>
              )}
              <Divider />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text color="white" fontSize="h4">
                  {route.params.results.length}{' '}
                </Text>
                {route.params.results.length === 1 ? (
                  <Text color="white" fontSize="h4">
                    {t('searchResultsScreen.possibleMatches1')}
                  </Text>
                ) : route.params.results.length < 5 ? (
                  <Text color="white" fontSize="h4">
                    {t('searchResultsScreen.possibleMatches2')}
                  </Text>
                ) : (
                  <Text color="white" fontSize="h4">
                    {t('searchResultsScreen.possibleMatches')}
                  </Text>
                )}
              </View>
              <Divider size={20} />
            </>
          }
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({item}) => (
            <PersonDetails
              item={item}
              name={item?.ime_prezime}
              lat={item?.gps_lat}
              long={item?.gps_long}
              date={item?.godina_rodjenja}
              parcela={item?.parcela}
              row={item?.red}
              gravePlace={item?.grobno_mjesto}
            />
          )}
        />
      </View>
    </Layout>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 7,
    paddingBottom: 75,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },
});

export default SearchResultsScreen;
