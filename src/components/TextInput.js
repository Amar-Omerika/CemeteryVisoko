import React from 'react';
import {View, TextInput, Pressable,useWindowDimensions} from 'react-native';
import styles from '../styles';
import {IonIcon} from './Icon';
import {Text} from '.';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  search,
}) => {
  const { fontScale } = useWindowDimensions();
  return (
    <View style={[styles.inputTxtContainer]}>
      <TextInput
        style={{
          width: '85%',
          height: '100%',
          fontFamily: 'Cantarell-Regular',
          color: 'black',
          fontSize:16 / fontScale 
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="black"
        autoCorrect={false}
        onSubmitEditing={search}
        returnKeyType="search"
      />
      {value != '' ? (
        <Pressable
          style={{
            // backgroundColor: 'red',
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          onPress={onPress}>
          <IonIcon name="close-outline" color="grey" size={19} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default CustomTextInput;
