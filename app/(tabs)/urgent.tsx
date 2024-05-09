import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';
import { getStoredData } from '../../lib/storage';

export default function Page() {
  // const urgentData = DefaultData.categories.urgent;
  const [urgentData, setUrgentData] = useState<any[]>([]); // Explicitly specify the type as an array

  useEffect(() => {
    async function fetchData() {
      try {
        // Attempt to retrieve data from AsyncStorage
        const storedData = await getStoredData('general');
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
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {urgentData.map((item, index) => (
          <ListItem key={`urgent-${index}`} title={item.title} link={`announce/${index}`} category='urgent' icon={item.icon} />
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
