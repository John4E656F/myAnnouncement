import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { ListItem } from '../../components/List';
import DefaultData from '../../constants/DefaultData.json';
import { getStoredData } from '../../lib/storage';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '../../components/Loading';

export default function Page({ navigation }: any) {
  const [generalData, setGeneralData] = useState<any[]>([]); // Explicitly specify the type as an array
  const [isFetchingData, setIsFetchingData] = useState(false);

  const fetchData = async () => {
    try {
      setIsFetchingData(true);
      // Attempt to retrieve data from AsyncStorage
      const storedData = await getStoredData('suggestions');
      // console.log(storedData);
      if (storedData.length === 0) {
        // If no data found, use default data
        // setGeneralData(DefaultData.categories.general);
      } else {
        setIsFetchingData(false);
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
        {isFetchingData ? (
          <View style={styles.noDataContainer}>
            <View>
              <Text style={styles.text}>La recherche de données peut prendre un certain temps.</Text>
              <Text style={styles.text}>Faites un don pour que je puisse payer un serveur digne de ce nom.</Text>
            </View>
            <Loading />
          </View>
        ) : (
          generalData.map((item, index) => (
            <ListItem
              key={`suggestions-${index}`}
              title={item.title}
              link={`announce/${index}`}
              category='suggestions'
              icon={item.icon}
              _id={item._id}
            />
          ))
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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
