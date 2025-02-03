import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import theme from './src/theme';
import Constants from 'expo-constants';

export default function App() {
  useEffect(() => {
    // Debug logging for environment variables
    console.log('Environment Variables Check:', {
      firebaseApiKey: Constants.expoConfig?.extra?.firebaseApiKey ? '**exists**' : '**missing**',
      firebaseAuthDomain: Constants.expoConfig?.extra?.firebaseAuthDomain ? '**exists**' : '**missing**',
      firebaseProjectId: Constants.expoConfig?.extra?.firebaseProjectId ? '**exists**' : '**missing**',
      googleClientId: Constants.expoConfig?.extra?.googleClientId ? '**exists**' : '**missing**',
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background.primary}
      />
      <Navigation />
    </SafeAreaProvider>
  );
}
