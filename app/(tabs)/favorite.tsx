import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real Time</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    gap: 20,
  },
  hintContainer: {
    display: 'flex',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF5F04',
  },
  hintText: {
    flexWrap: 'wrap',
  },
  settings: {
    display: 'flex',
  },
  settingTitle: {
    fontSize: 16,
  },
});
