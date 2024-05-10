import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Page() {
  const [inputs, setInputs] = useState({
    category: '',
    title: '',
    french: '',
    dutch: '',
    german: '',
    english: '',
  });
  const [selectedCategory, setSelectedCategory] = useState();
  const [text, onChangeText] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Ajouté une annonce</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Sélectionnez une catégorie:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                  mode='dropdown'
                  // dropdownIconColor='red'
                  // dropdownIconRippleColor='purple'
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
    // backgroundColor: 'cyan',
  },
  inputsContainer: {
    padding: 20,
    gap: 30,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  inputTitle: {
    fontWeight: '400',
    fontSize: 16,
  },
  multiLineInput: {
    textAlignVertical: 'top',
    height: 200,
    // alignItems: 'center',
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
