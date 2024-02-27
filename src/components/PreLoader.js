import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const PreLoader = ({isLoading}) => {
  if (isLoading)
    return (
      <View style={styles.background}>
        <Image style={styles.image} source={require('../assets/5446793.gif')} />
      </View>
    );
  else return null;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  image: {
    backgroundColor: 'transparent',
    opacity: 1.0,
    width: 120,
    height: 60,
  },
});

export default PreLoader;
