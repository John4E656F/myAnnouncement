import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';
import { getStoredData } from '../../lib/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Page({ navigation }: any) {
  const [generalData, setGeneralData] = useState<any[]>([]); // Explicitly specify the type as an array

  const fetchData = async () => {
    try {
      // Attempt to retrieve data from AsyncStorage
      const storedData = await getStoredData('general');
      // console.log(storedData);
      if (storedData.length === 0) {
        // If no data found, use default data
        // setGeneralData(DefaultData.categories.general);
      } else {
        // Set the retrieved data to state
        setGeneralData(storedData);
      }
    } catch (error) {
      console.error('Error fetching or storing data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {generalData.map((item, index) => (
          <ListItem key={`general-${index}`} title={item.title} link={`announce/${index}`} category='general' icon={item.icon} _id={item._id} />
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
