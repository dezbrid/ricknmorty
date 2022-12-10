/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@redux/store';
import Home from '@screens/home';
import Reactotron from '@config/reactotronConfig';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

const MyAppWithOverlay = __DEV__ ? Reactotron.overlay(App) : App;
export default MyAppWithOverlay;
