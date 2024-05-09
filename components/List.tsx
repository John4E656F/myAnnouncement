import React from 'react';
import { Link } from 'expo-router';
import { Image, Pressable, Text, StyleSheet } from 'react-native';
import type { ListProps } from '../types';
import { icons } from '../constants/iconMapping';

export function ListItem({ _id, link, icon, title, category }: ListProps) {
  return (
    <Link href={{ pathname: `/${link}`, params: { _id: _id, cat: category } }} asChild style={styles.link}>
      <Pressable style={styles.buttonItemContainer}>
        <Image source={icons[icon]} style={styles.icon} />
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
    paddingVertical: 20,
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
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
