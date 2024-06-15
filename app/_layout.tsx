import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Easing, TouchableOpacity, Animated } from 'react-native';
import { storeAllData, clearAll } from '../lib/storage';

export const unstable_settings = {
  initialRouteName: '/home',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [syncAnimation] = useState(new Animated.Value(1));
  const [syncAnimationInfo] = useState(new Animated.Value(1));
  const [syncAnimationDelete] = useState(new Animated.Value(1));
  const router = useRouter();
  async function handlePress() {
    try {
      // Trigger the sync animation
      Animated.sequence([
        Animated.timing(syncAnimation, {
          toValue: 0.8,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(syncAnimation, {
          toValue: 1,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
      // Fetch data from the server
      const response = await fetch('https://myannouncement-be.onrender.com/announce/all');

      if (!response) {
        throw new Error('Failed to fetch data');
      }

      const newData = await response.json();
      // console.log(newData);

      // Pass fetched data to storeAllData function
      await storeAllData({ data: newData });
      router.push('(tabs)');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // async function clear() {
  //   clearAll();
  //   router.push('(tabs)');
  // }

  async function handleInfo() {
    router.push('modal');
  }

  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <View style={styles.logo}>
                <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
                <Text style={styles.navbarTitle}>Announcements</Text>
              </View>
              <View style={styles.utility}>
                <TouchableOpacity style={styles.sync} onPress={() => handlePress()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimation }] }]}>
                    <FontAwesome name='cloud-download' size={30} color='#38B6FF' />
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sync} onPress={() => handleInfo()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimationInfo }] }]}>
                    <FontAwesome name='info-circle' size={30} color='gray' />
                  </Animated.View>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.sync} onPress={() => clear()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimationDelete }] }]}>
                    <FontAwesome name='trash' size={24} color='black' />
                  </Animated.View>
                </TouchableOpacity> */}
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='announce'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <View style={styles.logo}>
                <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
                <Text style={styles.navbarTitle}>Announcements</Text>
              </View>
              <View style={styles.utility}>
                <TouchableOpacity style={styles.sync} onPress={() => handlePress()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimation }] }]}>
                    <FontAwesome name='cloud-download' size={30} color='#38B6FF' />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='customPage'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <View style={styles.logo}>
                <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
                <Text style={styles.navbarTitle}>Announcements</Text>
              </View>
              <View style={styles.utility}>
                <TouchableOpacity style={styles.sync} onPress={() => handlePress()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimation }] }]}>
                    <FontAwesome name='cloud-download' size={30} color='#38B6FF' />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='suggestPage'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <View style={styles.logo}>
                <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
                <Text style={styles.navbarTitle}>Announcements</Text>
              </View>
              <View style={styles.utility}>
                <TouchableOpacity style={styles.sync} onPress={() => handlePress()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimation }] }]}>
                    <FontAwesome name='cloud-download' size={30} color='#38B6FF' />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='adminPage'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <View style={styles.logo}>
                <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
                <Text style={styles.navbarTitle}>Announcements</Text>
              </View>
              <View style={styles.utility}>
                <TouchableOpacity style={styles.sync} onPress={() => handlePress()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimation }] }]}>
                    <FontAwesome name='cloud-download' size={30} color='#38B6FF' />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='modal'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          presentation: 'modal',
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <View style={styles.logo}>
                <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
                <Text style={styles.navbarTitle}>Announcements</Text>
              </View>
              {/* <View style={styles.utility}>
                <TouchableOpacity style={styles.sync} onPress={() => handlePress()} activeOpacity={0.8}>
                  <Animated.View style={[styles.sync, { transform: [{ scale: syncAnimation }] }]}>
                    <FontAwesome name='cloud-download' size={30} color='#38B6FF' />
                  </Animated.View>
                </TouchableOpacity>
              </View> */}
            </View>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sync: {
    // backgroundColor: 'red',
    marginLeft: 'auto',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  utility: {
    flexDirection: 'row',
    // gap: 1,
    justifyContent: 'center',
  },
});
