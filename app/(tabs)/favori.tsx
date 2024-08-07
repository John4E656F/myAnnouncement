import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import { getStoredFavoriteData } from '../../lib/storage';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '../../components/Loading';

export default function Page({ navigation }: any) {
  const [favoriteData, setFavoriteData] = useState<any[]>([]); // Explicitly specify the type as an array

  const fetchData = async () => {
    try {
      // Attempt to retrieve data from AsyncStorage
      const storedData = await getStoredFavoriteData();
      // console.log(storedData);
      if (storedData.length === 0) {
        // If no data found, use default data
        // setGeneralData(DefaultData.categories.general);
      } else {
        // Set the retrieved data to state
        setFavoriteData(storedData);
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
        {favoriteData.length > 0 ? (
          favoriteData.map((item, index) => (
            <ListItem
              key={`favorites-${index}`}
              title={item.title}
              link={`announce/${index}`}
              category='favorite'
              icon={item.icon}
              _id={item._id}
              customId={item.id}
            />
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.text}>Vous n'avez pas encore de favoris </Text>
            {/* <Loading /> */}
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
    paddingTop: '50%',
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
