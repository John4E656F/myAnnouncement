import { useLocalSearchParams, usePathname, useRouter, useSegments } from 'expo-router';
import { SafeAreaView, ScrollView, Button, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import DefaultData from '../../../constants/DefaultData.json';
import type { AnnounceProps } from '../../../types';

export default function Announcement() {
  const { cat, id } = useLocalSearchParams<{ cat: string; id: string }>();

  const category = cat as keyof typeof DefaultData.categories;

  const announcementData = DefaultData.categories[category!][id! as unknown as number] as AnnounceProps;

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{announcementData.title}</Text>
        <Text style={styles.language}>Francais</Text>
        <Text style={styles.text}>{announcementData.french}</Text>
        <Text style={styles.language}>Nederlands</Text>
        <Text style={styles.text}>{announcementData.dutch}</Text>
        <Text style={styles.language}>Deutsch</Text>
        <Text style={styles.text}>{announcementData.german}</Text>
        <Text style={styles.language}>English</Text>
        <Text style={styles.text}>{announcementData.english}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  language: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 13,
    marginBottom: 20,
  },
});
