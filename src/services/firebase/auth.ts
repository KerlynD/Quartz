import { 
  signOut, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

/**
 * Saves or updates user information in Firestore
 * @param user - Firebase User object
 */
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

/**
 * Creates a new user account with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Firebase User object
 */
export const emailPasswordSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToFirestore(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Email/Password sign up error:', error);
    throw error;
  }
};

/**
 * Signs in an existing user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Firebase User object
 */
export const emailPasswordSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await saveUserToFirestore(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Email/Password sign in error:', error);
    throw error;
  }
};

/**
 * Signs out the current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}; 