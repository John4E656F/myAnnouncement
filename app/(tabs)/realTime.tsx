import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';
import { getStoredData } from '../../lib/storage';

export default function Page() {
  // const realTimeData = DefaultData.categories.realTime;
  const [realTimeData, setRealTimeData] = useState<any[]>([]); // Explicitly specify the type as an array

  useEffect(() => {
    async function fetchData() {
      try {
        // Attempt to retrieve data from AsyncStorage
        const storedData = await getStoredData('realTime');
        // console.log(storedData);
        if (storedData.length === 0) {
          // If no data found, use default data
          // setGeneralData(DefaultData.categories.general);
        } else {
          // Set the retrieved data to state
          setRealTimeData(storedData);
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
        {realTimeData.map((item, index) => (
          <ListItem key={`realTime-${index}`} title={item.title} link={`announce/${index}`} category='realTime' icon={item.icon} _id={item._id} />
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
