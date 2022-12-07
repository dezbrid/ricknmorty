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
import Home from '@screens/home';
import Reactotron from '@config/reactotronConfig';

const App = () => {
  return <Home />;
};

const MyAppWithOverlay = __DEV__ ? Reactotron.overlay(App) : App;
export default MyAppWithOverlay;
