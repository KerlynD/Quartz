import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Quartz',
  slug: 'quartz',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.kerlyn.quartz',
    googleServicesFile: './GoogleService-Info.plist',
    config: {
      usesNonExemptEncryption: false
    },
    infoPlist: {
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: ['quartz']
        }
      ]
    }
  },
  scheme: 'quartz',
  extra: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    plaidClientId: process.env.PLAID_CLIENT_ID,
    plaidSandboxSecret: process.env.PLAID_SANDBOX_SECRET,
    eas: {
      projectId: 'your-expo-project-id'
    }
  },
  plugins: [
    '@react-native-firebase/app',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static'
        }
      }
    ],
    [
      'expo-apple-authentication'
    ]
  ]
}); 