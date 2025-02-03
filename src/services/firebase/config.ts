import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLogLevel } from 'firebase/app';

// Set Firebase logging to errors only
setLogLevel('error');

// Debug: Log all environment variables (safely)
console.log('Environment Check:', {
  hasApiKey: !!Constants.expoConfig?.extra?.firebaseApiKey,
  hasAuthDomain: !!Constants.expoConfig?.extra?.firebaseAuthDomain,
  hasProjectId: !!Constants.expoConfig?.extra?.firebaseProjectId,
  hasStorageBucket: !!Constants.expoConfig?.extra?.firebaseStorageBucket,
  hasMessagingSenderId: !!Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  hasAppId: !!Constants.expoConfig?.extra?.firebaseAppId,
});

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

// Validate Firebase config
const validateConfig = (config: typeof firebaseConfig) => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.error('Missing required Firebase config fields:', missingFields);
    throw new Error(`Missing required Firebase configuration. Check your .env file for: ${missingFields.join(', ')}`);
  }
};

validateConfig(firebaseConfig);

// Initialize Firebase
let app;
try {
  if (getApps().length === 0) {
    console.log('Initializing new Firebase app...');
    app = initializeApp(firebaseConfig);
  } else {
    console.log('Reusing existing Firebase app...');
    app = getApp();
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize Auth with AsyncStorage persistence
let auth;
try {
  console.log('Initializing Firebase Auth...');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log('Firebase Auth initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Auth:', error);
  throw error;
}

export { auth };
export const db = getFirestore(app);
export default app; 