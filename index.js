import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import reduxStore from './src/redux/store';
import React from 'react';
import './i18n';

const Main = () => (
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => Main);
