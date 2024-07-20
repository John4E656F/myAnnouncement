import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Pressable } from 'react-native';
import { ListItem } from '../../components/List';
import { getStoredCustomData } from '../../lib/storage';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; size: number }) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function Page({ navigation }: any) {
  const [customData, setCustomData] = useState<any[]>([]); // Explicitly specify the type as an array

  const fetchData = async () => {
    try {
      // Attempt to retrieve data from AsyncStorage
      const storedData = await getStoredCustomData();
      console.log(storedData);
      if (storedData.length === 0) {
        // If no data found, use default data
        // setGeneralData(DefaultData.categories.general);
      } else {
        // Set the retrieved data to state
        setCustomData(storedData);
      }
    } catch (error) {
      console.error('Error fetching or storing data:', error);
    }
  };

  // Use useFocusEffect to run the fetchData function whenever the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {customData.length > 0 ? (
          customData.map((item, index) => (
            <ListItem
              key={`custom-${index}`}
              title={item.title}
              link={`announce/${index}`}
              category='custom'
              icon={item.icon}
              _id={item._id}
              customId={item.id}
            />
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Link href='/customPage' asChild style={styles.link}>
              <Pressable style={styles.buttonItemContainer}>
                <TabBarIcon name='plus-circle' color='gray' size={80} />
                <Text style={styles.CTAText}>Ajouté une annonce</Text>
              </Pressable>
            </Link>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  CTAText: {
    fontSize: 25,
    color: 'gray',
  },
  link: {
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  buttonItemContainer: {
    gap: 20,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
