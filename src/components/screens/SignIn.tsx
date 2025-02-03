import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useGoogleSignIn, useAppleSignIn } from '../../services/firebase/auth';
import theme from '../../theme';

type SignInScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn: googleSignIn, isReady: isGoogleReady } = useGoogleSignIn();
  const { signIn: appleSignIn } = useAppleSignIn();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
    } catch (error) {
      console.error('Google sign in error:', error);
      Alert.alert(
        'Authentication Error',
        'Failed to sign in with Google. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      await appleSignIn();
    } catch (error) {
      console.error('Apple sign in error:', error);
      Alert.alert(
        'Authentication Error',
        'Failed to sign in with Apple. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isGoogleReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Choose your preferred method to continue
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.appleButton]}
          onPress={handleAppleSignIn}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, styles.appleButtonText]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.xl,
  },
  header: {
    marginTop: theme.spacing.xxl * 2,
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  button: {
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appleButton: {
    backgroundColor: theme.colors.text.primary,
  },
  googleButton: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  buttonText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
  },
  appleButtonText: {
    color: theme.colors.background.primary,
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    left: theme.spacing.xl,
    right: theme.spacing.xl,
  },
  footerText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  link: {
    color: theme.colors.primary,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen; 