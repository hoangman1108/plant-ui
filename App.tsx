import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/reduxStore';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style='light' />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
