import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color='#005BB8' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
