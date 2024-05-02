// _layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen name='index' options={{ headerShown: false, tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} /> }} />
      <Tabs.Screen
        name='general'
        options={{
          title: 'General',
          tabBarIcon: ({ color }) => <TabBarIcon name='book' color={color} />,
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
      />
      <Tabs.Screen
        name='realTime'
        options={{
          title: 'Temps Réel',
          tabBarIcon: ({ color }) => <TabBarIcon name='clock-o' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
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
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='favorite'
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color }) => <TabBarIcon name='star' color={color} />,
          headerRight: () => (
            <Link href='(tabs)' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
