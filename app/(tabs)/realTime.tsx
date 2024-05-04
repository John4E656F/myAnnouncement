import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';

export default function Page() {
  const realTimeData = DefaultData.categories.realTime;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {realTimeData.map((item, index) => (
          <ListItem key={`realTime-${index}`} title={item.title} link={`announce/${index}`} category='realTime' icon={item.icon} />
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
