import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';
import { getStoredCustomData } from '../../lib/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Page({ navigation }: any) {
  const [customData, setCustomData] = useState<any[]>([]); // Explicitly specify the type as an array

  const fetchData = async () => {
    try {
      // Attempt to retrieve data from AsyncStorage
      const storedData = await getStoredCustomData();
      //   console.log(storedData);
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
            <ListItem key={`custom-${index}`} title={item.title} link={`announce/${index}`} category='custom' icon={item.icon} customId={item.id} />
          ))
        ) : (
          <View>
            <Text>No Data</Text>
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
});
