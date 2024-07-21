import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getStoredDataById, getAdmin, storeSuggestionData } from '../../../lib/storage';
import { AnnounceProps } from '../../../types';
import { DeleteButton } from '../../../components/DeleteButton';
import { FavoriteButton } from '../../../components/FavoriteButton';

export default function Announcement() {
  const router = useRouter();
  const { cat, _id, customId } = useLocalSearchParams<{ cat: string; _id?: string; customId?: string }>();
  const [announcementData, setAnnouncementData] = useState<AnnounceProps | null>(null);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const [code, setCode] = useState<Number>();
  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        // console.log(cat);
        // console.log(_id);
        // console.log(customId);

        const storedData = await getStoredDataById(cat!, _id!, customId!);
        // console.log(storedData);

        if (storedData !== null) {
          setAnnouncementData(storedData);
        }
        const admin = await getAdmin();
        // console.log(admin);

        if (admin.isAdmin) {
          setIsAdmin(true);
          setCode(admin.secretCode);
        }
      } catch (error) {
        console.error('Error fetching announcement data:', error);
      }
    }
    // console.log(cat);
    // console.log(_id);
    // console.log(customId);

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
  // console.log(announcementData);

  const handlePress = async () => {
    if (_id) {
      const response = await fetch(`https://myannouncement-be.onrender.com/announce/suggest/accept/${_id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // Handle successful response
        const fetchedSuggestionData = await fetch('https://myannouncement-be.onrender.com/announce/suggest/all');
        const suggestionData = await fetchedSuggestionData.json();
        await storeSuggestionData(suggestionData.data);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Failed to accept announcement:', errorData.message);
      }
    } else {
      console.log('No _id provided');
      router.push('(tabs)');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{announcementData.title}</Text>
          <View style={styles.buttonContainer}>
            <FavoriteButton data={announcementData} />
            {customId || (isAdmin && <DeleteButton id={announcementData.id!} _id={announcementData._id} isAdmin={isAdmin} code={code} />)}
          </View>
        </View>
        <Text style={styles.language}>Francais</Text>
        <Text style={styles.text}>{announcementData.french}</Text>
        <Text style={styles.language}>Nederlands</Text>
        <Text style={styles.text}>{announcementData.dutch}</Text>
        <Text style={styles.language}>Deutsch</Text>
        <Text style={styles.text}>{announcementData.german}</Text>
        <Text style={styles.language}>English</Text>
        <Text style={styles.text}>{announcementData.english}</Text>
        {announcementData.id && (
          <View style={styles.CTAbuttonContainer}>
            <Link
              href={{
                pathname: `/editPage/${announcementData.id}`,
                params: { customId, cat },
              }}
              asChild
              style={styles.link}
            >
              <Pressable style={styles.CTAbutton}>
                <Text style={styles.buttonText}>Edit</Text>
              </Pressable>
            </Link>
            {isAdmin && (
              <Pressable onPress={handlePress} style={styles.CTAbutton}>
                <Text style={styles.buttonText}>Accept</Text>
              </Pressable>
            )}
            {!announcementData.suggested && (
              <Link
                href={{
                  pathname: '/suggestPage',
                  params: { _id: announcementData._id, customId, cat: cat },
                }}
                asChild
                style={styles.link}
              >
                <Pressable style={styles.CTAbutton}>
                  <Text style={styles.buttonText}>Suggest</Text>
                </Pressable>
              </Link>
            )}
          </View>
        )}
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
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 10,
  },
  button: {
    backgroundColor: '#005BB8',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  CTAbuttonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 10,
  },
  CTAbutton: {
    backgroundColor: '#005BB8',
    padding: 10,
    borderRadius: 5,
  },
  link: {
    flex: 1,
  },
});
