import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json'; // Import the JSON data

export default function Page() {
  const generalData = DefaultData.categories.general;
  const urgentData = DefaultData.categories.urgent;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {generalData.map((item, index) => (
          <ListItem key={`general-${index}`} title={item.title} link={`Test`} icon='train' />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
