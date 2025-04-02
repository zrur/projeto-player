import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { PlayerProvider } from './contexts/PlayerContext';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  // Configurar áudio global
  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };

    setupAudio();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <PlayerProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#000',
                elevation: 0, // para Android
                shadowOpacity: 0, // para iOS
                borderBottomWidth: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                title: 'Music Player',
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Favorites" 
              component={FavoritesScreen} 
              options={{ 
                title: 'Favoritos',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    </GestureHandlerRootView>
  );
};

export default App;