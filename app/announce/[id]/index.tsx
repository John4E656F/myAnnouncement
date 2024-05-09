import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getStoredDataById } from '../../../lib/storage';
import { AnnounceProps } from '../../../types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FavoriteButton } from '../../../components/FavoriteButton';

export default function Announcement() {
  const { cat, _id } = useLocalSearchParams<{ cat: string; _id: string }>();
  const [announcementData, setAnnouncementData] = useState<AnnounceProps | null>(null);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const storedData = await getStoredDataById(cat!, _id!);
        // console.log(storedData);

        if (storedData !== null) {
          setAnnouncementData(storedData);
        }
      } catch (error) {
        console.error('Error fetching announcement data:', error);
      }
    }
    fetchAnnouncement();
    // console.log(announcementData);
  }, [cat, _id]); // Include cat and id in the dependency array of useEffect

  if (!announcementData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{announcementData.title}</Text>
          <FavoriteButton data={announcementData} />
        </View>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    // overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 5,
    maxWidth: '90%',
    textAlignVertical: 'center',
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
