import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { storeCustomData, storeFavoriteData } from '../../lib/storage';
import { icons } from '../../constants/iconMapping';
import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';
import { suggestAnnouncement } from '../../lib/suggest';
import type { AnnounceProps } from '../../types';

export default function Page() {
  const router = useRouter();
  const [inputs, setInputs] = useState<AnnounceProps>({
    id: randomUUID(),
    category: 'general',
    title: '',
    french: '',
    dutch: '',
    german: '',
    english: '',
    icon: '',
    isFavorite: false,
    suggested: true,
    suggestedBy: '',
    addName: false,
    email: '',
    phone: '',
  });
  const toggleCheckbox = () => {
    setInputs({ ...inputs, isFavorite: !inputs.isFavorite });
  };

  const handleIconSelect = (iconName: string) => {
    setInputs({ ...inputs, icon: iconName });
  };

  // console.log(inputs);

  const handlePhoneChange = (value: string) => {
    // Allow only numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setInputs({ ...inputs, phone: numericValue });
  };

  const handlePress = async () => {
    try {
      // Save data locally
      if (inputs.isFavorite) {
        storeFavoriteData(inputs);
      }

      // Send data to the backend
      const databaseData = await suggestAnnouncement(inputs);

      if (databaseData.data) {
        // Update the state with the new _id from the database
        setInputs((prevInputs) => ({
          ...prevInputs,
          _id: databaseData.data._id, // Assuming _id is returned from the database
        }));

        // Save data to storage with the updated _id
        storeCustomData({
          ...databaseData.data,
          _id: databaseData.data._id, // Ensure _id is included
        });
      }

      // Navigate to another page
      router.push('(tabs)');
    } catch (error) {
      console.error('Failed to suggest announcement:', error);
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Proposer une annonce</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Sélectionnez une catégorie:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={inputs.category}
                  onValueChange={(itemValue, itemIndex) => setInputs({ ...inputs, category: itemValue })}
                  // mode='dropdown'
                  accessibilityLabel='Category picker'
                >
                  <Picker.Item label='General' value='general' />
                  <Picker.Item label='Real Time' value='realTime' />
                  <Picker.Item label='Urgent' value='urgent' />
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Titre:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setInputs({ ...inputs, title: value })}
                value={inputs.title}
                accessibilityLabel='Title input'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Français:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, french: value })}
                value={inputs.french}
                multiline={true}
                accessibilityLabel='French input'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Nederlands:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, dutch: value })}
                value={inputs.dutch}
                multiline={true}
                accessibilityLabel='Dutch input'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Deutsch:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, german: value })}
                value={inputs.german}
                multiline={true}
                accessibilityLabel='German input'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>English:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, english: value })}
                value={inputs.english}
                multiline={true}
                accessibilityLabel='English'
              />
            </View>
            <View style={styles.checkboxInput}>
              <Checkbox
                // style={}
                color='#005BB8'
                value={inputs.isFavorite}
                onValueChange={toggleCheckbox}
                accessibilityLabel='Add to favorite'
              />
              <Text style={styles.inputTitle}>Ajouter aux favoris</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Select an Icon:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.iconContainer}>
                  {(Object.keys(icons) as Array<keyof typeof icons>).map((iconName, index) => (
                    <TouchableOpacity key={index} onPress={() => handleIconSelect(iconName)}>
                      <Image
                        source={icons[iconName]}
                        style={[styles.icon, iconName === inputs.icon ? styles.selectedIcon : null]}
                        resizeMode='contain'
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Nom:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setInputs({ ...inputs, suggestedBy: value })}
                value={inputs.suggestedBy}
                accessibilityLabel='Name input'
              />
              <View style={styles.checkboxInput}>
                <Checkbox
                  // style={}
                  color='#005BB8'
                  value={inputs.addName}
                  onValueChange={toggleCheckbox}
                  accessibilityLabel='Show your name'
                />
                <Text style={styles.inputTitle}>Affiché mon nom</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Email:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setInputs({ ...inputs, email: value })}
                value={inputs.email}
                accessibilityLabel='Name input'
              />
              <Text style={styles.tips}>Votre e-mail ne sera pas affiché</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Numéro de téléphone:</Text>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                onChangeText={handlePhoneChange}
                value={inputs.phone}
                accessibilityLabel='Phone input'
              />
              <Text style={styles.tips}>Votre numéro de téléphone ne sera pas affiché</Text>
            </View>
          </View>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>Suggérer</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
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
    // backgroundColor: 'cyan',
  },
  inputsContainer: {
    padding: 20,
    gap: 30,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 2,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  inputTitle: {
    fontWeight: '400',
    fontSize: 16,
  },
  multiLineInput: {
    textAlignVertical: 'top',
    height: 150,
    // alignItems: 'center',
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#005BB8',
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  checkboxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    width: 60,
    height: 60,
  },
  selectedIcon: {
    borderWidth: 1,
    borderColor: '#005BB8',
  },
  tips: {
    color: '#333',
  },
});
