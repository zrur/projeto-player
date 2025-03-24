import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';

const App: React.FC = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <StatusBar style="light" />
    <HomeScreen />
  </GestureHandlerRootView>
);

export default App;