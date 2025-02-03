import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import theme from '../../theme';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

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
            style={[styles.button, styles.appleButton]}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={[styles.buttonText, styles.appleButtonText]}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Sign up!</Text>
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
    backgroundColor: theme.colors.background.secondary,
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
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  appleButtonText: {
    color: theme.colors.background.primary,
  },
  signUpText: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
  },
  signUpLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default WelcomeScreen; 