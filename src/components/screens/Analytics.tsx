import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const AnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analytics Screen</Text>
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
  },
});

export default AnalyticsScreen; 