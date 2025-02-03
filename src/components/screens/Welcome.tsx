import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import theme from '../../theme';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

/**
 * Welcome screen component that serves as the entry point for authentication
 */
const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Q</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Optimize Your{'\n'}Money Management{'\n'}Effortlessly</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('SignIn', { isSignUp: true })}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Get Started</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn', { isSignUp: false })}>
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 72,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  button: {
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  primaryButtonText: {
    color: theme.colors.background.primary,
  },
  signInText: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
  signInLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default WelcomeScreen; 