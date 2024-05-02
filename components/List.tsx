import React from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { ListProps } from '../types';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; size: number }) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export function ListItem({ link, icon, title }: ListProps) {
  console.log(`/${link}`);

  return (
    <Link href={`/${link}`} asChild style={styles.link}>
      <Pressable style={styles.buttonItemContainer}>
        <TabBarIcon name={icon} color='black' size={50} />
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    // paddingHorizontal: 25,
    paddingVertical: 20,
    // marginVertical: 20,
  },
  buttonItemContainer: {
    gap: 20,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    maxWidth: '80%',
    // fontWeight: 'bold',
  },
});
