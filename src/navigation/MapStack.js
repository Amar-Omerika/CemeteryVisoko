import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import {GalleryModal} from '../components';

const Stack = createStackNavigator();
const modalOptions = {
  cardOverlayEnabled: true,
  cardStyle: {backgroundColor: 'transparent'},
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.3, 0.5, 0.7, 0.9, 1],
        outputRange: [0, 0.1, 0.25, 0.5, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp',
      }),
    },
  }),
};

const MapStack = () => (
  <Stack.Navigator
  screenOptions={{
    headerShown: false,
    presentation:'modal'
  }}>
    <Stack.Screen name="Map" component={MapScreen} />
    <Stack.Screen
      name="GalleryModal"
      component={GalleryModal}
      options={modalOptions}
    />
  </Stack.Navigator>
);

export default MapStack;
