import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Cards: undefined;
  Analytics: undefined;
  Budget: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 