import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAllStoredData, storeAllData, clearAll, getAdmin } from '../../lib/storage';
import { FetchingModal } from '../../components/FetchingModal';

const { width, height } = Dimensions.get('window');

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; size: number }) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function Page() {
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [size, setSize] = useState({
    icon: 70,
    font: 35,
    AddBTNFont: 25,
  });

  useEffect(() => {
    if (height <= 580) {
      setSize({
        icon: isAdmin ? 26 : 30,
        font: isAdmin ? 18 : 18,
        AddBTNFont: 14,
      });
    } else if (height <= 590) {
      setSize({
        icon: isAdmin ? 28 : 28,
        font: isAdmin ? 20 : 20,
        AddBTNFont: 16,
      });
    } else if (height <= 650) {
      setSize({
        icon: isAdmin ? 34 : 34,
        font: isAdmin ? 22 : 22,
        AddBTNFont: 22,
      });
    } else if (height <= 720) {
      setSize({
        icon: isAdmin ? 42 : 42,
        font: isAdmin ? 24 : 22,
        AddBTNFont: 24,
      });
    } else if (height <= 750) {
      setSize({
        icon: isAdmin ? 46 : 46,
        font: isAdmin ? 24 : 26,
        AddBTNFont: isAdmin ? 22 : 24,
      });
    } else if (height <= 780) {
      setSize({
        icon: isAdmin ? 50 : 50,
        font: isAdmin ? 28 : 30,
        AddBTNFont: isAdmin ? 22 : 24,
      });
    } else if (height <= 860) {
      setSize({
        icon: isAdmin ? 52 : 56,
        font: isAdmin ? 28 : 30,
        AddBTNFont: isAdmin ? 22 : 26,
      });
    } else {
      setSize({
        icon: isAdmin ? 50 : 55,
        font: isAdmin ? 38 : 40,
        AddBTNFont: isAdmin ? 38 : 38,
      });
    }
  }, [height, isAdmin]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Attempt to retrieve data from AsyncStorage
        const storedData = await getAllStoredData();
        const storedIsAdmin = await getAdmin();

        if (storedIsAdmin.isAdmin) {
          setIsAdmin(true);
        }
        // Check if data exists for any category
        if (Object.values(storedData.categories).some((data) => data.length > 0)) {
          // Data exists, do not fetch from API
          return;
        }

        // If data doesn't exist or is empty, fetch it from the API
        const response = await fetch('https://myannouncement-be.onrender.com/announce/all');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const newData = await response.json();

        if (!newData) {
          setIsFetchingData(true);
        }
        setIsFetchingData(false);
        // Pass fetched data to storeAllData function
        await storeAllData({ data: newData });
      } catch (error) {
        console.error('Error fetching data from server:', error);
        setTimeout(fetchData, 10000);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FetchingModal visible={isFetchingData} />
      <Link href='/general' asChild style={styles.link}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='book' color='black' size={size.icon} />
          <Text style={[{ fontSize: size.font }]}>General</Text>
        </Pressable>
      </Link>
      <Link href='/realTime' asChild style={styles.link}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='clock-o' color='black' size={size.icon} />
          <Text style={[{ fontSize: size.font }]}>Temps Réel</Text>
        </Pressable>
      </Link>
      <Link href='/urgent' asChild style={styles.urgentLink}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='exclamation-circle' color='red' size={size.icon} />
          <Text style={[styles.urgentText, { fontSize: size.font }]}>Urgent</Text>
        </Pressable>
      </Link>
      <Link href='/favori' asChild style={styles.favoriteLink}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='star' color='yellow' size={size.icon} />
          <Text style={[styles.favoriteText, { fontSize: size.font }]}>Favori</Text>
        </Pressable>
      </Link>
      <Link href='/custom' asChild style={styles.customLink}>
        <Pressable style={styles.buttonItemContainer}>
          <TabBarIcon name='pencil-square-o' color='gray' size={size.icon} />
          <Text style={[styles.customText, { fontSize: size.font }]}>Custom</Text>
        </Pressable>
      </Link>
      {isAdmin && (
        <Link href='/suggestion' asChild style={styles.suggestLink}>
          <Pressable style={styles.buttonItemContainer}>
            <TabBarIcon name='lightbulb-o' color='orange' size={size.icon} />
            <Text style={[styles.suggestText, { fontSize: size.font }]}>Suggestions</Text>
          </Pressable>
        </Link>
      )}
      <View style={styles.lastLinkContainer}>
        <Link href='/customPage' asChild style={styles.lastLink}>
          <Pressable style={styles.buttonItemContainer}>
            <TabBarIcon name='plus-circle' color='gray' size={size.icon} />
            <Text style={[{ fontSize: size.AddBTNFont, color: 'gray' }]}>Ajouté une annonce</Text>
          </Pressable>
        </Link>
        {!isAdmin && (
          <Link href='/suggestPage' asChild style={styles.lastLink}>
            <Pressable style={styles.buttonItemContainer}>
              <TabBarIcon name='plus-circle' color='gray' size={size.icon} />
              <Text style={[{ fontSize: size.AddBTNFont, color: 'gray' }]}>Proposer une annonce</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '5%',
    gap: 10,
  },
  link: {
    marginVertical: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonItemContainer: {
    gap: 20,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  lastLinkContainer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 20,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  lastLink: {
    width: '100%',
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  favoriteLink: {
    borderColor: 'yellow',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
  },
  favoriteText: {
    color: 'yellow',
  },
  urgentLink: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
  },
  urgentText: {
    color: 'red',
  },
  customLink: {
    borderColor: 'gray',
    marginVertical: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
  },
  customText: {
    color: 'gray',
  },
  suggestLink: {
    borderColor: 'orange',
    marginVertical: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
  },
  suggestText: {
    color: 'orange',
  },
});
