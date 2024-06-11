// _layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2f95dc',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{ title: 'Home', headerShown: false, tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} /> }}
      />
      <Tabs.Screen
        name='general'
        options={{
          title: 'General',
          tabBarIcon: ({ color }) => <TabBarIcon name='book' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable style={styles.backButton}>
                {({ pressed }) => <FontAwesome name='arrow-left' size={30} color='black' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='realTime'
        options={{
          title: 'Temps Réel',
          tabBarIcon: ({ color }) => <TabBarIcon name='clock-o' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable style={styles.backButton}>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='black' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='urgent'
        options={{
          title: 'Urgent',
          tabBarIcon: ({ color }) => <TabBarIcon name='exclamation-circle' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable style={styles.backButton}>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='black' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='favori'
        options={{
          title: 'Favori',
          tabBarIcon: ({ color }) => <TabBarIcon name='star' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable style={styles.backButton}>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='#2f95dc' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='custom'
        options={{
          title: 'Custom',
          tabBarIcon: ({ color }) => <TabBarIcon name='pencil-square-o' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable style={styles.backButton}>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='#2f95dc' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='suggestion'
        options={{
          title: 'Suggestion',
          tabBarIcon: ({ color }) => <TabBarIcon name='pencil-square-o' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable style={styles.backButton}>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='#2f95dc' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    marginRight: 5,
  },
});
