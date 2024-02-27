import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Text from '../components/Text';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeColors} from '../constants/ThemeColors';

const DATA = [
  {
    key: 'en',
    title: 'English',
  },
  {
    key: 'bos',
    title: 'Bosanski',
  },
];

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text fontSize="h6">{item.title}</Text>
  </TouchableOpacity>
);

const SwitchLanguage = ({setTitle}) => {
  const {i18n} = useTranslation();

  const renderItem = ({item, id}) => {
    return (
      <Item
        key={id}
        item={item}
        onPress={async () => {
          await AsyncStorage.setItem('language', item.key);
          await AsyncStorage.setItem('languageTitle', item.title);
          i18n.changeLanguage(item.key);
          setTitle(item.title);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(0,0,0,0.9)',
    backgroundColor: ThemeColors.backgroundHeaderColor,
    width: 100,
    minHeight: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 5,
  },
  item: {
    paddingVertical: 8,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});

export default SwitchLanguage;
