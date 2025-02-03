import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';

type TabBarIconProps = {
  focused: boolean;
  name: 'home' | 'cards' | 'analytics' | 'budget' | 'settings';
};

const TabBarIcon = ({ focused, name }: TabBarIconProps) => {
  const getIconContent = () => {
    // Simple shapes for now, we can replace these with proper icons later
    switch (name) {
      case 'home':
        return (
          <View style={[styles.square, focused && styles.focused]} />
        );
      case 'cards':
        return (
          <View style={[styles.circle, focused && styles.focused]} />
        );
      case 'analytics':
        return (
          <View style={[styles.triangle, focused && styles.focused]} />
        );
      case 'budget':
        return (
          <View style={[styles.diamond, focused && styles.focused]} />
        );
      case 'settings':
        return (
          <View style={[styles.gear, focused && styles.focused]} />
        );
    }
  };

  return (
    <View style={styles.container}>
      {getIconContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 16,
    height: 16,
    backgroundColor: theme.colors.text.secondary,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.text.secondary,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.colors.text.secondary,
  },
  diamond: {
    width: 16,
    height: 16,
    backgroundColor: theme.colors.text.secondary,
    transform: [{ rotate: '45deg' }],
  },
  gear: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.text.secondary,
    borderWidth: 4,
    borderColor: theme.colors.background.secondary,
  },
  focused: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});

export default TabBarIcon; 