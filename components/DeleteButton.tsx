import React from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { removeCustomData, removeValue, clearAll } from '../lib/storage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface DeleteButtonProps {
  id: string;
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const handlePress = () => {
    removeCustomData(id);
    router.push('(tabs)');
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <AntDesign name='delete' color='gray' size={40} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});
