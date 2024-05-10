import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

export default function Page() {
  const [inputs, setInputs] = useState({
    category: null,
    title: '',
    french: '',
    dutch: '',
    german: '',
    english: '',
    isFavorite: false,
  });
  const toggleCheckbox = () => {
    setInputs({ ...inputs, isFavorite: !inputs.isFavorite });
  };

  console.log(inputs);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Ajouté une annonce</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Sélectionnez une catégorie:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={inputs.category}
                  onValueChange={(itemValue, itemIndex) => setInputs({ ...inputs, category: itemValue })}
                  mode='dropdown'
                >
                  <Picker.Item label='General' value='general' />
                  <Picker.Item label='Real Time' value='realTime' />
                  <Picker.Item label='Urgent' value='urgent' />
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Titre:</Text>
              <TextInput style={styles.input} onChangeText={(value) => setInputs({ ...inputs, title: value })} value={inputs.title} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Français:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, french: value })}
                value={inputs.french}
                multiline={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Nederlands:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, dutch: value })}
                value={inputs.dutch}
                multiline={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Deutsch:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, german: value })}
                value={inputs.german}
                multiline={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>English:</Text>
              <TextInput
                style={styles.multiLineInput}
                onChangeText={(value) => setInputs({ ...inputs, english: value })}
                value={inputs.english}
                multiline={true}
              />
            </View>
            <View style={styles.checkboxInput}>
              <Checkbox
                // style={}
                color='#005BB8'
                value={inputs.isFavorite}
                onValueChange={toggleCheckbox}
              />
              <Text style={styles.inputTitle}>Ajouter aux favoris</Text>
            </View>
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.text}>Sauvegarder</Text>
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
    height: 40,
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
});
