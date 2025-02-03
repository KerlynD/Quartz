import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOutUser } from '../../services/firebase/auth';
import theme from '../../theme';

const SettingsScreen = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.lg,
    marginBottom: theme.spacing.xl,
  },
  button: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
});

export default SettingsScreen; 