import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcon} from '../components/Icon';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapStack from './MapStack';
import AboutUsScreen from '../screens/AboutUsScreen';
import SearchStack from './SearchStack';
import SearchMapScreen from '../screens/SearchMapScreen';
import i18n from '../../i18n';
import {useWindowDimensions} from 'react-native';
import {ThemeColors} from '../constants/ThemeColors';
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const {fontScale} = useWindowDimensions();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarActiveTintColor: ThemeColors.tabBarIconActiveTintColor,
        tabBarInactiveTintColor: ThemeColors.tabBarIconInActiveTintColor,
        tabBarStyle: {
          backgroundColor: ThemeColors.tabBarBackgroundColor,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingHorizontal: Platform.OS === 'android' ? 40 : 10,
          borderTopColor: '#3A3A3A',
          height: Platform.OS === 'android' ? 60 : 85,
          paddingTop: 5,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 35,
          shadowColor: '#000',
        },
        tabBarLabelStyle: {
          marginBottom: 7,
          fontSize: 14 / fontScale,
          fontFamily: 'Cantarell-Regular',
        },
      }}
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused}) => {
      //     const tab = TabBarConfig.find(
      //       ({tabBarLabel}) => tabBarLabel === route.name,
      //     );
      //     return <tab.activeIcon />;
      //   },
      //   tabBarStyle: {
      //     borderTopWidth: 0,
      //     elevation: 35,
      //     shadowColor: '#000',
      //     borderTopRightRadius: 20,
      //     backgroundColor: 'red',
      //   },
      // })}
      // tabBarOptions={{
      //   activeTintColor: 'red',
      //   inactiveTintColor: 'blue',
      //   showLabel: false,
      //   headerShown: false,
      //   style: {
      //     backgroundColor: 'blue',
      //     marginBottom: Platform.OS === 'ios' ? 10 : 20,
      //     paddingTop: 4,
      //     paddingBottom: Platform.OS === 'ios' ? 30 : 10,
      //   },
      // }}
      initialRouteName="Search">
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              name="search"
              size={24}
              color={
                focused
                  ? ThemeColors.tabBarIconActiveTintColor
                  : ThemeColors.tabBarIconInActiveTintColor
              }
            />
          ),
          tabBarLabel: i18n.t('searchScreen.tabBar.search'),
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={SearchMapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              name="map"
              size={24}
              color={
                focused
                  ? ThemeColors.tabBarIconActiveTintColor
                  : ThemeColors.tabBarIconInActiveTintColor
              }
            />
          ),
          tabBarLabel: i18n.t('searchScreen.tabBar.map'),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Tab" component={TabNavigator} />
    <Stack.Screen name="MapStack" component={MapStack} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
  </Stack.Navigator>
);
export default AppNavigator;
