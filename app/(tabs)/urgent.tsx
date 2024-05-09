import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';
import { getStoredData } from '../../lib/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Page({ navigation }: any) {
  // const urgentData = DefaultData.categories.urgent;
  const [urgentData, setUrgentData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      // Attempt to retrieve data from AsyncStorage
      const storedData = await getStoredData('urgent');
      // console.log(storedData);
      if (storedData.length === 0) {
        // If no data found, use default data
        // setGeneralData(DefaultData.categories.general);
      } else {
        // Set the retrieved data to state
        setUrgentData(storedData);
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
        {urgentData.map((item, index) => (
          <ListItem key={`urgent-${index}`} title={item.title} link={`announce/${index}`} category='urgent' icon={item.icon} _id={item._id} />
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
