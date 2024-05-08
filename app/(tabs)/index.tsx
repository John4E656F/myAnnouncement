import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAllData, storeData } from '../../lib/storage';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; size: number }) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function Page() {
  const [generalData, setGeneralData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Attempt to retrieve data from AsyncStorage
        const storedData = await getAllData();

        if (Array.isArray(storedData) && storedData.some(([key, value]) => value !== null)) {
          // If data exists and is not null, use it
          // setGeneralData(storedData.map(([key, value]) => JSON.parse(value)));
        } else {
          // If data doesn't exist or is null, fetch it from the API
          const response = await fetch('http://192.168.178.79:5001/announce/all', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          // console.log(response);

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const newData = await response.json();
          console.log(newData);

          // // Store fetched data in AsyncStorage
          // await storeData({ key: '@general', data: newData });
          // setGeneralData(newData);
        }
      } catch (error) {
        console.error('Error fetching or storing data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Link href='/general' asChild style={styles.link}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='book' color='black' size={80} />
          <Text style={styles.text}>General</Text>
        </Pressable>
      </Link>
      <Link href='/realTime' asChild style={styles.link}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='clock-o' color='black' size={80} />
          <Text style={styles.text}>Temps Réel</Text>
        </Pressable>
      </Link>
      <Link href='/urgent' asChild style={styles.urgentLink}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='exclamation-circle' color='red' size={80} />
          <Text style={[styles.text, styles.urgentText]}>Urgent</Text>
        </Pressable>
      </Link>
      {/* <Link href='/favori' asChild style={styles.favoriteLink}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='star' color='yellow' size={80} />
          <Text style={[styles.text, styles.favoriteText]}>Favori</Text>
        </Pressable>
      </Link> */}
      {/* <View style={styles.lastLinkContainer}>
        <Link href='/custom' asChild style={styles.lastLink}>
          <Pressable style={styles.buttonItemContainer}>
            <TabBarIcon name='plus-circle' color='gray' size={80} />
            <Text style={styles.CTAText}>Ajouté une annonce</Text>
          </Pressable>
        </Link>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    gap: 10,
  },
  link: {
    marginVertical: 5,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonItemContainer: {
    gap: 20,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  },
  CTAText: {
    fontSize: 25,
    color: 'gray',
  },
  lastLinkContainer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastLink: {
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  favoriteLink: {
    borderColor: 'yellow',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
  },
  favoriteText: {
    color: 'yellow',
  },
  urgentLink: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
  },
  urgentText: {
    color: 'red',
  },
});
