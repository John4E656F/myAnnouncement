import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { adminLogin } from '../../lib/storage';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    code: '',
  });
  const [error, setError] = useState({
    isError: false,
    errorMessage: '',
  });

  const handlePress = () => {
    const username = process.env.EXPO_PUBLIC_USERNAME;
    const password = process.env.EXPO_PUBLIC_PASSWORD;
    const secretCode = process.env.EXPO_PUBLIC_CODE;

    if (username === inputs.username && password === inputs.password && secretCode === inputs.code) {
      const response = adminLogin(inputs.code);
      // console.log(response);
      setError({ isError: false, errorMessage: '' });
      router.push('(tabs)');
    } else if (username !== inputs.username && password === inputs.password) {
      setError({ isError: true, errorMessage: 'Wrong username' });
    } else if (username === inputs.username && password !== inputs.password) {
      setError({ isError: true, errorMessage: 'Wrong password' });
    } else if (secretCode !== inputs.code) {
      setError({ isError: true, errorMessage: 'Wrong secret code' });
    } else {
      setError({ isError: true, errorMessage: 'Wrong username and password' });
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Admin Login</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Username</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setInputs({ ...inputs, username: value })}
                value={inputs.username}
                accessibilityLabel='Username input'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Password:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setInputs({ ...inputs, password: value })}
                value={inputs.password}
                accessibilityLabel='Password input'
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Secret Code:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setInputs({ ...inputs, code: value })}
                value={inputs.code}
                accessibilityLabel='Secret code input'
                keyboardType='numeric'
              />
            </View>
            {error.isError && <Text style={[styles.text, styles.error]}>{error.errorMessage}</Text>}
          </View>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>Login</Text>
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
  inputsContainer: {
    padding: 20,
    gap: 10,
    marginBottom: 15,
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
  error: {
    color: 'red',
  },
});
