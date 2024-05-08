// _layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

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
        options={{ title: 'Index', headerShown: false, tabBarIcon: ({ color }) => <TabBarIcon name='home' color='#2f95dc' /> }}
      />
      <Tabs.Screen
        name='general'
        options={{
          title: 'General',
          tabBarIcon: ({ color }) => <TabBarIcon name='book' color='#2f95dc' />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='black' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='realTime'
        options={{
          title: 'Temps Réel',
          tabBarIcon: ({ color }) => <TabBarIcon name='clock-o' color='#2f95dc' />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable>
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
          tabBarIcon: ({ color }) => <TabBarIcon name='exclamation-circle' color='#2f95dc' />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable>
                {({ pressed }) => <FontAwesome name='arrow-left' size={25} color='black' style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/* <Tabs.Screen
        name='favori'
        options={{
          title: 'Favori',
          tabBarIcon: ({ color }) => <TabBarIcon name='star' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='arrow-left'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      /> */}
    </Tabs>
  );
}
