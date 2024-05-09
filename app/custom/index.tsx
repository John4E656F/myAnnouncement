import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Ajouté une annonce</Text>
          <View>
            <Text>Sélectionnez une catégorieClick to apply</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
              mode='dropdown'
              dropdownIconColor='red'
              dropdownIconRippleColor='purple'
            >
              <Picker.Item label='General' value='general' />
              <Picker.Item label='Real Time' value='realTime' />
              <Picker.Item label='Urgent' value='urgent' />
            </Picker>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 5,
    maxWidth: '90%',
    textAlignVertical: 'center',
  },
  picker: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'cyan',
  },
});
