import { GoogleAuthProvider, signInWithCredential, signOut, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import Constants from 'expo-constants';
import { auth, db } from './config';

// Save user to Firestore
const saveUserToFirestore = async (user: User) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw error;
  }
};

// Google Sign In
export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
    iosClientId: Constants.expoConfig?.extra?.googleClientId,
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      
      if (result?.type === 'success') {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        await saveUserToFirestore(userCredential.user);
        return userCredential.user;
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  return {
    signIn: handleGoogleSignIn,
    isReady: !!request,
  };
};

// Apple Sign In
export const useAppleSignIn = () => {
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Create Firebase credential
      const { identityToken } = credential;
      if (identityToken) {
        const provider = new GoogleAuthProvider();
        const firebaseCredential = provider.credential(identityToken);
        const userCredential = await signInWithCredential(auth, firebaseCredential);
        await saveUserToFirestore(userCredential.user);
        return userCredential.user;
      }
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    }
  };

  return {
    signIn: handleAppleSignIn,
  };
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}; 