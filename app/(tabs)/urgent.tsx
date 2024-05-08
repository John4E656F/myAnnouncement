import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';

export default function Page() {
  const urgentData = DefaultData.categories.urgent;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {urgentData.map((item, index) => (
          <ListItem key={`urgent-${index}`} title={item.title} link={`announce/${index}`} category='urgent' icon={item.icon} />
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
