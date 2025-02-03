import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase/config';
import theme from '../theme';

// Import screens
import WelcomeScreen from '../components/screens/Welcome';
import SignInScreen from '../components/screens/SignIn';
import HomeScreen from '../components/screens/Home';
import CardsScreen from '../components/screens/Cards';
import AnalyticsScreen from '../components/screens/Analytics';
import BudgetScreen from '../components/screens/Budget';
import SettingsScreen from '../components/screens/Settings';
import LoadingScreen from '../components/common/LoadingScreen';
import TabBarIcon from '../components/common/TabBarIcon';

import { RootStackParamList, MainTabParamList, AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: theme.colors.background.primary },
    }}
  >
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.colors.background.primary,
        borderTopWidth: 0,
        elevation: 0,
        height: 80,
        paddingTop: 8,
        paddingBottom: 20,
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.text.secondary,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={route.name.toLowerCase() as any} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cards" component={CardsScreen} />
    <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    <Tab.Screen name="Budget" component={BudgetScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export const Navigation = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 