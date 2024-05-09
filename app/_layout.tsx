import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

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
              <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
              <Text style={styles.navbarTitle}>My Announcements</Text>
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
              <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
              <Text style={styles.navbarTitle}>My Announcements</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='custom'
        options={{
          headerStyle: { backgroundColor: '#005BB8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => (
            <View style={styles.navbarContainer}>
              <Image style={{ width: 46, height: 30 }} source={require('../assets/image.png')} />
              <Text style={styles.navbarTitle}>My Announcements</Text>
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
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
