import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';

export default function Page() {
  const generalData = DefaultData.categories.general;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {generalData.map((item, index) => (
          <ListItem key={`general-${index}`} title={item.title} link={`announce/${index}`} category='general' icon={item.icon} />
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
